import API from "./api";

type DBConfig = {
    databaseName: string;
    storeName?: string;
    version: number;
    apiEndpoint?: string; // Optional for History database
};

// Some chatgpt stuff cuz I don't want to code all of that

export class DatabaseMiddleware {
    private config: DBConfig;

    constructor(config: DBConfig) {
        this.config = config;
    }

    // Open or create IndexedDB
    private async openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.config.databaseName, this.config.version);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains("Entries")) {
                    db.createObjectStore("Entries", { keyPath: "key" });
                }
                const db_meta = request.result;
                if (!db_meta.objectStoreNames.contains("Meta")) {
                    db.createObjectStore("Meta", { keyPath: "key" });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Check if database exists
    private async databaseExistsAndValid(): Promise<boolean> {
        if (window.indexedDB.databases) {
            const databases = await window.indexedDB.databases();
            return databases.some(
                (db) =>
                    db.name === this.config.databaseName && db.version === this.config.version
            );
        } else {
            return false
        }
    }

    // Clear all entries in the object store
    private async clearDatabase(): Promise<void> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.config.storeName, "readwrite");
            const store = transaction.objectStore(this.config.storeName);
            const clearRequest = store.clear();

            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject(clearRequest.error);
        });
    }
    // Update the latest update timestamp
    private async updateTimestamp(): Promise<void> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Meta", "readwrite");
            const store = transaction.objectStore("Meta");
            const timestamp = Date.now();

            store.put({ key: "lastUpdated", value: timestamp });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // Get value by key
    public async getValue(key: string): Promise<any | null> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Entries", "readonly");
            const store = transaction.objectStore("Entries");
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result?.value || null);
            request.onerror = () => reject(request.error);
        });
    }

    // Get meta info
    public async getMeta(key: string): Promise<any | null> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Meta", "readonly");
            const store = transaction.objectStore("Meta");
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result?.value || null);
            request.onerror = () => reject(request.error);
        });
    }

    public async setMeta(key: string, value: string): Promise<void> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Meta", "readwrite");
            const store = transaction.objectStore("Meta");
            store.put({ key, value });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // Save key-value pairs
    private async saveKeyValuePairs(data: Record<string, any>): Promise<void> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Entries", "readwrite");
            const store = transaction.objectStore("Entries");

            Object.entries(data).forEach(([key, value]) => {
                store.put({ key, value });
            });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // Initialize the Definitions database
    public async initializeDefinitionsDatabase(): Promise<void> {
        const databaseValid = await this.databaseExistsAndValid();

        if (databaseValid) {
            const lastUpdated = await this.getMeta("lastUpdated");
            if ((lastUpdated - Date.now()) < (24 * 60 * 60 * 1000)) { // Wait 24h between updates                
                await this.updateTimestamp();
                return;
            }
        }

        console.log("Fetching data for Definitions database...");
        try {

            await API.requests.Destiny2.Manifest().catch(async e => {
                console.error("Could not load Bungie's activity definitions");
                return "";
            }).then(async response => {
                if (response != "") { // Bungie gave us the manifest
                    response = JSON.parse(response);
                    let newUrl = response.Response.jsonWorldComponentContentPaths.en.DestinyActivityDefinition;
                    let oldUrl = await this.getMeta("url");

                    if (newUrl != oldUrl) { // Need to update the meta definitions
                        return await fetch('https://www.bungie.net' + newUrl).catch(e => {
                            console.log(e);
                            return "";
                        }).then(async response => {
                            if (typeof response != "string") { // Bungie gave us the definitions
                                let DestinyActivityDefinition = await response.json();
                                let newDestinyActivityDefinition = {};
                                Object.keys(DestinyActivityDefinition).map((key) => {
                                    if (DestinyActivityDefinition[key]?.isPvP === true && DestinyActivityDefinition[key]?.isPlaylist === false) {

                                        newDestinyActivityDefinition[key] = {
                                            "description": DestinyActivityDefinition[key]?.displayProperties?.description,
                                            "name": DestinyActivityDefinition[key]?.displayProperties?.name,
                                            "pgcrImage": DestinyActivityDefinition[key]?.pgcrImage
                                        }
                                    }
                                })

                                await this.saveKeyValuePairs({ "DestinyActivityDefinition": newDestinyActivityDefinition })
                                await this.setMeta("url", newUrl);
                            }
                        })

                    } else {
                        console.log("Activity Definitions are still up-to-date");

                    }
                }

                // If we have not returned by now we can assume we did not receive a suitable response from Bungie
                console.log("Using Fallback Activity Definitions");
                return await fetch('/data/fallback/DestinyActivityDefinitionSmaller.json').catch(e => {
                    console.log(e);
                }
                ).then(async response => {
                    if (response != undefined) {

                        await this.saveKeyValuePairs({ "DestinyActivityDefinition": await response.json() });
                        await this.setMeta("url", "fallback");
                    }
                    console.error("Could not load fallback activity definitions")
                })
                // Fallback object

            })

            await this.updateTimestamp();
            console.log("Definitions database rebuilt successfully.");
        } catch (error) {
            console.error("Error rebuilding Definitions database:", error);
        }
    }

    // Initialize the History database
    public async initializeHistoryDatabase(): Promise<void> {
        const databaseValid = await this.databaseExistsAndValid();

        if (!databaseValid) {
            console.log("Clearing old History database...");
            await this.clearDatabase();
            console.log("Creating empty History database...");
            await this.saveKeyValuePairs({}); // Create an empty store
        }

        await this.updateTimestamp();
        console.log("History database initialized successfully.");
    }

    // Set a key-value pair in the History database
    public async setHistoryValue(key: string, value: any): Promise<void> {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("Entries", "readwrite");
            const store = transaction.objectStore("Entries");

            store.put({ key, value });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }
}

/*

        historyDB.getValue("searchQuery").then((value) => {
          console.log("History value for searchQuery:", value);
        });
        // Set and get values in History
        historyDB.setHistoryValue("searchQuery", "TypeScript IndexedDBasdasdadasdadas").then(() => {
          historyDB.getValue("searchQuery").then((value) => {
            console.log("History value for searchQuery:", value);
          });
        });
*/