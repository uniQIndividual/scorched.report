import type { SCORCHED_CANNON_TYPE } from "./cannons";
import { ToolTipDestiny } from "../components/showcase/ToolTipDestiny";

// Display Seconds as Xm Ys 
export function secondsToDisplayTime(seconds: number) {
    var date = new Date(seconds * 1000);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    const m_string = mm < 10 ? (mm == 0 ? "" : "0" + mm + "m ") : mm + "m ";
    const s_string = ss < 10 && mm != 0 ? ("0" + ss) : ss;
    return m_string + s_string + "s";
}

export function millisecondsToDisplayTime(seconds: number) {
    var date = new Date(seconds);
    var ms = date.getMilliseconds().toString().padStart(3, '0');
    var ss = date.getSeconds();
    return ss + "s " + ms + "ms";
}

export function flattenSpeedrunsWithCategories(a) {
    return Object.entries(a).map(b => b[1].runs
        .map(c => {
            c.category = b[0]; c.category_name = b[1].name; return c
        }))
        .flat()
        .sort((a, b) => a.time - b.time)
}
export const platformLookup = (platform: number) => {
    switch (platform) {
        case 1:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/xboxLiveLogo.png",
                "name": "Xbox/Windows Store"
            }
        case 2:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/psnLogo.png",
                "name": "PlayStation Network"
            }
        case 3:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/steamLogo.png",
                "name": "Steam"
            }
        case 4:
            return {
                "icon": "",
                "name": "Blizzard"
            } //"Blizzard" //TODO: get images
        case 5:
            return {
                "icon": "https://www.bungie.net//img/theme/destiny/icons/icon_stadia.png",
                "name": "Stadia"
            }
        case 6:
            return {
                "icon": "https://www.bungie.net//img/theme/destiny/icons/icon_egs.png",
                "name": "Epic Games Store"
            }
        default:
            return undefined
    }
}

export const cannonSeasonNameToURL = (seasonName: string) => {
    return encodeURI(seasonName.toLowerCase().replaceAll(" ", "-"));
}

export const cannonBungieTooltip = (cannon: [string, SCORCHED_CANNON_TYPE]) =>
    <ToolTipDestiny title={cannon[1].name} details={true} colorScheme={["bg-[rgba(199,168,58,0.8)]", "bg-[rgba(51,47,29,0.8)]"]}>
        <div>
            {cannon[1].alt_name != "" ?
                <div className="font-semibold mb-4">
                    {cannon[1].alt_name}
                </div>
                : ""}
            <div>
                Created by {cannon[1].author}
            </div>
            {cannon[1].description != "" ?
                <div className="italic mt-4">
                    {cannon[1].description}
                </div>
                : ""}
        </div>
        {cannon[1].requirements && cannon[1].requirements.length != 0 ?
            <div>
                {cannon[1].requirements.map((requirement, i) =>
                    <div
                        className="table-row"
                        key={"cannon_requirements_" + cannon[0] + "_" + i}>
                        <div className="table-cell w-full">
                            <img className="inline-block pr-2" src="/images/icons/checkbox_empty.webp" />
                            <div className="inline-block text-gray-50 leading-8">
                                {requirement}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            : ""}
        {cannon[1].cost != 0 && cannon[1].cost != Infinity ?
            <div className="table-row">
                <div className="table-cell w-full">
                    <img className="inline pr-1" src="/images/icons/scoin_26px.png" />
                    Scoins
                </div>
                <div className="table-cell w-full text-right font-bungo font-medium text-nowrap">
                    <div className="text-primary-600 inline">0</div>
                    <div className="px-1 inline">/</div>
                    <div className="inline">
                        {cannon[1].cost}
                    </div>
                </div>
            </div>
            : ""}
    </ToolTipDestiny>