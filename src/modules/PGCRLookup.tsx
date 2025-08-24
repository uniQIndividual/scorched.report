import React, { useEffect, type ReactElement } from "react";
import ErrorDynamic from "./ErrorDynamic";
import ErrorNotFound from "./ErrorNotFound";
import API, { url_data } from "../lib/api";
import * as fzstd from 'fzstd';
import update from 'immutability-helper';
import { LoadingAnimationWithTitle } from "../components/LoadingAnimation";
import { DatabaseMiddleware } from "../lib/IndexedDB";
import { Tooltip } from "react-tooltip";
import { hasVisibleChar, secondsToDisplayTime } from "../lib/fun";
import { PGCR_Sections_Links } from "../components/pgcr_sections/links";
import { PGCR_Sections_Summary } from "../components/pgcr_sections/summary";
import { PGCR_Sections_Medals } from "../components/pgcr_sections/medals";
import HistoricalStatsDefinitionSmaller from '../data/fallback/HistoricalStatsDefinitionSmaller.json'
import { PGCR_Sections_Time } from "../components/pgcr_sections/time";
import { PGCR_Sections_Profiles } from "../components/pgcr_sections/profiles";

export type userEntry = {
    membershipId: string,
    membershipType: string,
    name: string,
    nameCode: string,
    platformName: string,
    platforms: number[],
    characterClassName: string,
    lightLevel: number,
    icon: string,
    elo: number,
    previousElo: string,
    matchup: number,
    matchWins: number,
    opponentsDefeated: number,
    kills: number,
    deaths: number,
    quit: boolean,
    playtime: number,
    startSeconds: number,
    medals: {
        [key: string]: {
            value: number,
            name: string,
            description: string,
            icon: string,
            tier: string
        }
    }
}

type basicMatchInfo = {
    matchid?: number,
    membershipId?: string,
    forceRender?: boolean,
}

export type combinedPGCR = {
    matchid: number,
    anonym: boolean, // Should we calculate stats for a specific person?
    membershipId: string,
    referenceid: string,
    bg_image: string,
    heading: string,
    date: string,
    duration: number,
    teamPreference: number, // Which team is the user on? by default the first
    team1WinChance: number,
    team1Score: number,
    team2Score: number,
    team3Score: number,
    team1: userEntry[], // There can be more than 2 teams, but we're gonna ignore that here e.g. pgcr 13801004315
    team2: userEntry[], // Team 1 = even numbers, Team 2 = odd
    team_left_1: userEntry[],
    team_left_2: userEntry[],
    team3: userEntry[],
    rawPGCR: any,
}

const MedalDefinitions: {
    [key: string]: {
        category: number,
        statName: string,
        statDescription: string,
        iconImage: string,
        medalTierIdentifier: string,
        contentIconOverrideId: string,
        medalTierHash: number
    }
} = HistoricalStatsDefinitionSmaller;

export const renderTeamList = (renderInfo: combinedPGCR, tableHeaders: ReactElement[], callback: (arg1: any, arg2: userEntry) => ReactElement) => {
    try {
        return (
            <table className="text-white mt-4 w-full font-bungo text-4xl font-bold justify-center flex px-5">
                <tbody className="">
                    <tr>
                        <td className="!border-0 pr-3">
                        </td>
                        <td className="!border-0  w-[1500px]">
                            <table className="w-full">
                                <tbody>
                                    <tr className="">
                                        <td className="!border-0 leading-7 w-max align-bottom min-w-[220px]">
                                            {renderInfo.team1Score} Points {renderInfo.team1WinChance < 0 ? "" : <span className="text-lg font-thin">{(renderInfo.team1WinChance * 100).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 5,
                                            }) + "% Win Chance"}</span>}
                                        </td>
                                        {tableHeaders.map((tableHead, index) =>
                                            <td
                                                key={"pgcr_table_head_" + index}
                                                className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                {tableHead}
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="w-[100%]">
                                        <td
                                            className="!border-0 h-[4px] p-0 bg-[#fff]">
                                        </td>
                                        {tableHeaders.map((tableHead, index) =>
                                            <td
                                                key={"pgcr_table_team1_white_dash_" + index}
                                                className="!border-0 h-[4px] p-0 bg-[#fff]">
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="w-[100%] !border-0 h-[20px] p-0 bg-[#0097E6]">
                                        <td
                                            className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                        </td>
                                        {tableHeaders.map((tableHead, index) =>
                                            <td
                                                key={"pgcr_table_team1_blue_dash_" + index}
                                                className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                            </td>
                                        )}
                                    </tr>
                                    {renderInfo.team1.map((entry: userEntry) =>
                                        <React.Fragment key={renderInfo.matchid + "_tr" + entry.membershipId}>
                                            {callback(renderInfo, entry)}
                                            <tr className="h-2">
                                                <td className="!border-0">
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )}
                                    {renderInfo.team_left_1.map((entry: userEntry) =>
                                        <React.Fragment key={renderInfo.matchid + "_tr" + entry.membershipId}>
                                            {callback(renderInfo, entry)}
                                            <tr className="h-2">
                                                <td className="!border-0">
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )}
                                    <tr className="h-4">
                                        <td className="!border-0">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="!border-0 w-max align-bottom min-w-[220px]">
                                            {renderInfo.team2Score} Points {renderInfo.team1WinChance < 0 ? "" : <span className="text-lg font-thin">{((1 - renderInfo.team1WinChance) * 100).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 5,
                                            }) + "% Win Chance"}</span>}
                                        </td>
                                    </tr>
                                    <tr className="w-[100%]">
                                        <td
                                            className="!border-0 h-[4px] p-0 bg-[#fff]">
                                        </td>
                                        {tableHeaders.map((tableHead, index) =>
                                            <td
                                                key={"pgcr_table_team2_white_dash_" + index}
                                                className="!border-0 h-[4px] p-0 bg-[#fff]">
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="w-[100%]">
                                        <td
                                            className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                        </td>
                                        {tableHeaders.map((tableHead, index) =>
                                            <td
                                                key={"pgcr_table_team2_red_dash_" + index}
                                                className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                            </td>
                                        )}
                                    </tr>
                                    {renderInfo.team2.map((entry: userEntry) =>
                                        <React.Fragment key={renderInfo.matchid + "_tr" + entry.membershipId}>
                                            {callback(renderInfo, entry)}
                                            <tr className="h-2">
                                                <td className="!border-0">
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )}
                                    {renderInfo.team_left_2.map((entry: userEntry) =>
                                        <React.Fragment key={renderInfo.matchid + "_tr" + entry.membershipId}>
                                            {callback(renderInfo, entry)}
                                            <tr className="h-2">
                                                <td className="!border-0">
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )}
                                    {renderInfo.team3.length > 0 ? (<>
                                        <tr className="h-4">
                                            <td className="!border-0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="!border-0 w-max align-bottom min-w-[220px]">
                                                {renderInfo.team3Score} Points
                                            </td>
                                        </tr>
                                        <tr className="w-[100%]">
                                            <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                            </td>
                                            {tableHeaders.map((tableHead, index) =>
                                                <td
                                                    key={"pgcr_table_team3_white_dash_" + index}
                                                    className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="w-[100%]">
                                            <td className="!border-0 h-[20px] p-0 bg-gray-500">
                                            </td>
                                            {tableHeaders.map((tableHead, index) =>
                                                <td
                                                    key={"pgcr_table_team3_gray_dash_" + index}
                                                    className="!border-0 h-[4px] p-0 bg-gray-500">
                                                </td>
                                            )}
                                        </tr>
                                        {renderInfo.team3.map((entry: userEntry) =>
                                            <React.Fragment key={renderInfo.matchid + "_tr" + entry.membershipId}>
                                                {callback(renderInfo, entry)}
                                                <tr className="h-2">
                                                    <td className="!border-0">
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )}
                                        <tr className="h-4">
                                            <td className="!border-0">
                                            </td>
                                        </tr>
                                    </>) : <></>}
                                </tbody>
                            </table>
                            <table className="w-full">
                                <tbody>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="!border-0">
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    } catch (error) {
        console.log(error);
        return <div>An error occurred</div>
    }
}

export const renderPlayerIconAndName = (entry: userEntry) => {
    return <td className="!border-0 p-0 min-w-[38px] flex">
        <img className="h-[38px] w-[38px]" src={entry.icon == undefined ? "" : "https://www.bungie.net" + entry.icon} />
        <div className="pr-4 pl-3 w-[calc(100%-38px)]  min-w-[180px] h-[38px] pt-1">
            <a href={location.origin + "/report?id=" + entry.membershipId + "&platform=" + entry.membershipType} className="hover:text-gray-200">
                {entry.name != undefined
                    ? (hasVisibleChar(entry.name)
                        ? entry.name
                        : <i>empty name</i>
                    )
                    : (entry.membershipId == "0"
                        ? <i>banned by Bungie</i>
                        : <i>Bungie didn't include a name 🤷</i>)
                        }
            </a>
        </div>
    </td>
}

const PGCRLookup = (props: basicMatchInfo) => {

    const urlParams = new URLSearchParams(window.location.search);
    const initialState: combinedPGCR = {
        matchid: props?.matchid || 0,
        anonym: true,
        membershipId: "",
        referenceid: "",
        bg_image: "",
        heading: "Team Scorched",
        date: "",
        duration: 0,
        teamPreference: 0,
        team1WinChance: -1,
        team1Score: -1,
        team2Score: -1,
        team3Score: -1,
        team1: [],
        team2: [],
        team_left_1: [],
        team_left_2: [],
        team3: [],
        rawPGCR: {}
    }
    const [renderInfo, setRenderInfo] = React.useState(initialState);
    const [crash, triggerCrash] = React.useState({ title: "", text: "" });
    const [render, triggerRender] = React.useState(false);
    const [started, triggerStarted] = React.useState(true);
    const [devMode, setDevMode] = React.useState(false);
    const [loadingTitle, setLoadingTitle] = React.useState("...");
    const [activeSection, setActiveSection] = React.useState("summary");

    useEffect(() => {
        if (urlParams.get('dev') != null && urlParams.get('dev') == "1") { // you are daring, hm
            setDevMode(true);
        }
        if (props.forceRender || props.forceRender === undefined) {
            startRender();
        }
    }, [])


    useEffect(() => {
        (async () => {
            // Verify parameters
            try {
                if (started) { //Prevent refetching
                    return;
                }
                triggerStarted(true);
                setLoadingTitle("Loading PGCR...")

                let matchid = 0;
                let membershipId = "";
                let matchHistoryMain: any[] = []

                if (props?.matchid == undefined) {
                    if (urlParams.get('id') == null || urlParams.get('id') == "") {
                        throw new Error("Match id is missing");
                    }
                    matchid = Number(urlParams.get('id')) || 0;
                    membershipId = urlParams.get('membershipid') || "";
                } else {
                    matchid = props.matchid;
                    membershipId = props.membershipId || "";
                }

                const definitionsDB = new DatabaseMiddleware({
                    databaseName: "DestinyActivityDefinition",
                    storeName: "Entries",
                    version: 1,
                });

                const historyDB = new DatabaseMiddleware({
                    databaseName: "PGCRHistory",
                    storeName: "Entries",
                    version: 2,
                });
                await definitionsDB.initializeDefinitionsDatabase();
                await historyDB.initializeHistoryDatabase();

                if (membershipId != "") {
                    const vault_id = membershipId.substring(membershipId.length - 4);
                    await fetch(`${url_data}/vault/${vault_id[0]}/${vault_id[1]}/${vault_id[2]}/${vault_id[3]}.json.zst`).then(
                        res => {
                            if (res.status == 200) {
                                return res.arrayBuffer()
                            } else {
                                return new ArrayBuffer(0)
                            }
                        }
                    ).then((compressedBuf) => {
                        try {
                            if (compressedBuf.byteLength != 0) { // No local DB, skip forward
                                const compressed = new Uint8Array(compressedBuf)
                                const out = new TextDecoder().decode(fzstd.decompress(compressed));

                                let json = JSON.parse(out);

                                if (json.hasOwnProperty(membershipId)) { // User is the local database
                                    matchHistoryMain = json[membershipId].matchHistory;
                                }
                            }
                        } catch {

                        }
                    });
                    // update from indexDB if possible
                    let indexedMatchHistory = await historyDB.getValue(membershipId);
                    if (indexedMatchHistory != null) {
                        matchHistoryMain = Object.values(indexedMatchHistory);
                    }
                }


                // Load from local compressed files
                await API.requests.PGCR.GetPostGameCarnageReport(matchid.toString()).catch((err => {
                    try { // try to get Bungie's specific response
                        const bungieResponse = JSON.parse(err.response);
                        triggerCrash({
                            title: bungieResponse?.ErrorStatus,
                            text: bungieResponse?.Message
                        });
                    } catch (error) {
                        triggerCrash({
                            title: err?.title,
                            text: err?.description
                        });
                    }
                    throw new Error("Data acquisition failed")
                }
                )).then(async (response) => {
                    try {
                        response = JSON.parse(response);
                        response = response.Response;
                        if (!(devMode || [62, 73, 88, 71].includes(response.activityDetails.mode))) {
                            triggerCrash({
                                title: 'Not a Team Scorched match',
                                text: "I ain't troubleshooting this for other game modes"
                            });
                            throw new Error("Not a Team Scorched match");

                        }

                        let destinyActivityDefinition = await definitionsDB.getValue("DestinyActivityDefinition");
                        let referenceId = response.activityDetails.referenceId;
                        let image = destinyActivityDefinition.hasOwnProperty(referenceId) ? destinyActivityDefinition[referenceId]?.pgcrImage : "";

                        let newRenderInfo = update(renderInfo, {
                            matchid: { $set: matchid },
                            membershipId: { $set: membershipId },
                            anonym: { $set: membershipId == "" },
                            bg_image: { $set: image != undefined && image != "" ? "https://www.bungie.net" + image : "" },
                            rawPGCR: { $set: response }
                        });

                        setLoadingTitle("Loading match histories...")

                        // Get Players
                        //await response.entries.forEach(async entry => {
                        await Promise.all(response.entries.map((entry: string, i: number) => {
                            let vault_id = entry.player.destinyUserInfo.membershipId.substring(entry.player.destinyUserInfo.membershipId.length - 4);
                            return fetch(`${url_data}/vault/${vault_id[0]}/${vault_id[1]}/${vault_id[2]}/${vault_id[3]}.json.zst`).then(async res => {
                                let entry = response.entries[i];
                                let elo = 1000;
                                let matchup = 0;
                                let matchupWins = 0;
                                let previousElo = "";
                                let compressedBuf = await res.arrayBuffer();

                                setLoadingTitle("Calculating...")

                                try {
                                    let matchHistory = [];

                                    if (compressedBuf.byteLength != 0) { // No local DB, skip forward
                                        const compressed = new Uint8Array(compressedBuf)
                                        const out = new TextDecoder().decode(fzstd.decompress(compressed));

                                        let json = JSON.parse(out);

                                        if (json.hasOwnProperty(entry.player.destinyUserInfo.membershipId)) { // User is the local database
                                            matchHistory = json[entry.player.destinyUserInfo.membershipId].matchHistory;
                                            let sameMatch = matchHistory.find(e => e.id == matchid);
                                            if (sameMatch != undefined) {
                                                elo = sameMatch.elo;
                                            } else {
                                                // We assume we're missing only recent entries
                                                // thus we use the most recent entry
                                                // We also assume acceding order
                                                elo = matchHistory[matchHistory.length - 1].elo;
                                            }

                                        }
                                    }

                                    let indexedMatchHistory = await historyDB.getValue(entry.player.destinyUserInfo.membershipId);
                                    if (indexedMatchHistory != null) {
                                        matchHistory = Object.values(indexedMatchHistory);;
                                    }

                                    matchHistory = matchHistory.sort(function (a, b) {
                                        if (Number(a.id) < Number(b.id))
                                            return -1;
                                        if (Number(a.id) > Number(b.id))
                                            return 1;
                                        return 0;
                                    });

                                    let matchup_result = getMatchup(matchHistoryMain, Object.values(matchHistory));

                                    matchup = matchup_result.matchup;
                                    matchupWins = matchup_result.matchWins;

                                    var index = matchHistory.map(e => String(e.id)).indexOf(String(matchid)); // Find match in database

                                    if (index >= 0 && matchHistory[index].elo != 0) {

                                        if (matchHistory[index].win_chance != 0 && entry.values.team.basic.value % 2 == 0) {
                                            newRenderInfo = update(newRenderInfo, { team1WinChance: { $set: matchHistory[index].win_chance } })
                                        }

                                        if (index > 0) {
                                            previousElo = (elo - matchHistory[index - 1].elo) > 0 ? "+" + (elo - matchHistory[index - 1].elo) : String(elo - matchHistory[index - 1].elo);
                                        } else {
                                            let newElo = elo - 1000
                                            previousElo = previousElo == "" ? (newElo) > 0 ? "+" + (newElo) : String(newElo) : previousElo;
                                        }
                                    } else {

                                    }

                                } catch (error) {
                                    console.log(error);
                                }

                                const newEntry: userEntry = {
                                    membershipId: entry.player.destinyUserInfo.membershipId,
                                    membershipType: entry.player.destinyUserInfo.membershipType != 0 ? entry.player.destinyUserInfo.membershipType : 3, // why 3 you might ask? funny bungie sometimes returns a membershiptype of 0 in pgcrs which can never succeed
                                    // we thus simple hedge our bets an point to a membershiptype 3 for steam
                                    // this is not relevant for scorched report but might cause incorrect api calls to bungie
                                    // ah well, at least we tried
                                    // if you read this you probably want to use User/GetMembershipDataById instead
                                    name: entry.player.destinyUserInfo.bungieGlobalDisplayName != "" ? entry.player.destinyUserInfo.bungieGlobalDisplayName : entry.player.destinyUserInfo.displayName,
                                    nameCode: String(entry.player.destinyUserInfo.bungieGlobalDisplayNameCode || "").padStart(4, '0'),
                                    platformName: entry.player.destinyUserInfo.displayName || "",
                                    platforms: entry.player.destinyUserInfo.applicableMembershipTypes || "",
                                    characterClassName: entry.player.characterClass || "",
                                    lightLevel: entry.player.lightLevel || "",
                                    icon: entry.player.destinyUserInfo.iconPath,
                                    elo: elo,
                                    previousElo: previousElo,
                                    matchup: matchup,
                                    matchWins: matchupWins,
                                    opponentsDefeated: entry.values.opponentsDefeated.basic.value,
                                    kills: entry.values.kills.basic.value,
                                    deaths: entry.values.deaths.basic.value,
                                    quit: entry.values.startSeconds.basic.value + entry.values.timePlayedSeconds.basic.value < entry.values.activityDurationSeconds.basic.value,
                                    playtime: entry.values.timePlayedSeconds.basic.value,
                                    startSeconds: entry.values.startSeconds.basic.value,
                                    medals: {}
                                }
                                // Add medals
                                if (entry.extended && entry.extended.values) {
                                    Object.entries(entry.extended.values).map((medal) => {
                                        if (MedalDefinitions[medal[0]]) {
                                            newEntry.medals[medal[0]] = {
                                                value: medal[1] && medal[1].basic && medal[1].basic.value || 0,
                                                description: MedalDefinitions[medal[0]]?.statDescription || "",
                                                icon: MedalDefinitions[medal[0]]?.iconImage || "",
                                                name: MedalDefinitions[medal[0]]?.statName || "",
                                                tier: MedalDefinitions[medal[0]]?.medalTierIdentifier || ""
                                            }
                                        }
                                    })
                                }

                                if (Number(entry.values.team.basic.value) % 2 == 0 && Number(entry.values.team.basic.value) != 0) { // Team 1
                                    if (newEntry.quit) {
                                        newRenderInfo.team_left_1.push(newEntry);
                                    } else {
                                        newRenderInfo.team1.push(newEntry);
                                        newRenderInfo = update(newRenderInfo, { team1Score: { $set: entry.values.teamScore.basic.value } });
                                    }
                                } else {
                                    if (Number(entry.values.team.basic.value) % 2 == 1) { // Team2
                                        newRenderInfo.team2.push(newEntry);
                                        newRenderInfo = update(newRenderInfo, { team2Score: { $set: entry.values.teamScore.basic.value } });
                                    } else {
                                        // Congrats to team 3 and thanks bungie
                                        newRenderInfo.team3.push(newEntry);
                                        newRenderInfo = update(newRenderInfo, { team3Score: { $set: entry.values.teamScore.basic.value } });
                                    }
                                }

                                // Did they quit?
                                if (entry.values.startSeconds.basic.value + entry.values.timePlayedSeconds.basic.value < entry.values.activityDurationSeconds.basic.value) {
                                    newRenderInfo = update(newRenderInfo, { duration: { $set: entry.values.activityDurationSeconds.basic.value } })
                                }

                                // Update if we want a specific person's stats                        
                                if (!newRenderInfo.anonym && entry.player.destinyUserInfo.membershipId == membershipId) {
                                    newRenderInfo = update(newRenderInfo, { teamPreference: { $set: entry.values.team.basic.value % 2 == 0 ? 0 : 1 } });
                                    newRenderInfo = update(newRenderInfo, { heading: { $set: entry.values.standing.basic.displayValue } })
                                }

                                // it doesn't seem to matter which person we choose?
                                newRenderInfo = update(newRenderInfo, { duration: { $set: entry.values.activityDurationSeconds.basic.value } })
                                setRenderInfo(newRenderInfo)
                            })
                        })
                        );

                        newRenderInfo = update(newRenderInfo, {
                            date: {
                                $set: new Date(response.period).toLocaleDateString(undefined, {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    timeZoneName: "short",
                                })
                            }
                        })

                        newRenderInfo.team1.sort(function (a, b) {
                            if (Number(a.opponentsDefeated) < Number(b.opponentsDefeated))
                                return 1;
                            if (Number(a.opponentsDefeated) > Number(b.opponentsDefeated))
                                return -1;
                            return 0;
                        });

                        newRenderInfo.team2.sort(function (a, b) {
                            if (Number(a.opponentsDefeated) < Number(b.opponentsDefeated))
                                return 1;
                            if (Number(a.opponentsDefeated) > Number(b.opponentsDefeated))
                                return -1;
                            return 0;
                        });

                        setRenderInfo(newRenderInfo)
                        triggerRender(true)



                    } catch (error) {
                        console.log(error);

                        triggerCrash({
                            title: 'Data parsing failed',
                            text: error!.toString()
                        });
                        return;
                    }
                }).catch(err => err ? console.error(err) : "");
            } catch (error) {
                triggerCrash({
                    title: 'Incorrect URL Parameters',
                    text: error!.toString()
                });
                return;
            }
        })()
    }, [started])

    // http://localhost:2121/report?id=4611686018467284386&platform=22

    // Comparing matchhistory in n+m instead of n*m
    function getMatchup(listMain: Array<any>, listEnemy: Array<any>) {
        let countMain = 0;
        let countEnemy = 0;

        let matchup = 0;
        let matchWins = 0;

        listMain = listMain.sort(function (a, b) {
            if (Number(a.id) < Number(b.id))
                return -1;
            if (Number(a.id) > Number(b.id))
                return 1;
            return 0;
        });
        listEnemy = listEnemy.sort(function (a, b) {
            if (Number(a.id) < Number(b.id))
                return -1;
            if (Number(a.id) > Number(b.id))
                return 1;
            return 0;
        });

        //console.log(listMain);
        //console.log(listEnemy);

        while (countMain < listMain.length && countEnemy < listEnemy.length) {
            if (Number(listMain[countMain].id) == Number(listEnemy[countEnemy].id)) {
                // Ignore matches on the same team
                if (listMain[countMain].won != listEnemy[countEnemy].won) {
                    matchup++
                    if (listMain[countMain].won) {
                        matchWins++
                    }
                }

                countEnemy++
                countMain++
            } else {
                if (Number(listMain[countMain].id) > Number(listEnemy[countEnemy].id)) {
                    countEnemy++
                } else {
                    countMain++
                }
            }
        }

        /*console.log({
            matchup: matchup,
            matchWins: matchWins,
        });*/
        return {
            matchup: matchup,
            matchWins: matchWins,
        }
    }


    let pgcr_sections = [
        {
            "title": "Summary",
            "id": "summary",
            "body": <PGCR_Sections_Summary {...renderInfo} />
        },
        {
            "title": "Medals",
            "id": "medals",
            "body": <PGCR_Sections_Medals {...renderInfo} />
        },
        {
            "title": "Time",
            "id": "times",
            "body": <PGCR_Sections_Time {...renderInfo} />
        },
        {
            "title": "Profiles",
            "id": "profiles",
            "body": <PGCR_Sections_Profiles {...renderInfo} />
        },
        {
            "title": "Links",
            "id": "links",
            "body": <PGCR_Sections_Links {...renderInfo} />
        },
    ]

    if (devMode) {
        pgcr_sections.push(
            {
                "title": "PGCR",
                "id": "pgcr",
                "body": <span className="whitespace-pre-line block p-8 text-gray-100"><pre>{JSON.stringify(renderInfo.rawPGCR, null, 4)}</pre></span>
            },
            {
                "title": "Everything",
                "id": "everything",
                "body": <span className="whitespace-pre-line block p-8 text-gray-100"><pre>{JSON.stringify(renderInfo, null, 4)}</pre></span>
            }
        )
    }


    let timeDisplay = secondsToDisplayTime(renderInfo.duration);

    // This is needed so the button is accessible
    let matchid = "";
    let membershipId = "";
    if (props?.matchid == undefined) {
        if (urlParams.get('id') == null || urlParams.get('id') == "") {
            throw new Error("Match id is missing");
        }
        matchid = urlParams.get('id') || "";
        membershipId = urlParams.get('membershipid') || "";
    } else {
        matchid = props.matchid;
        membershipId = props.membershipId || "";
    }

    const startRender = () => { // Render only once and when an invisible button was pressed for it, so 100 pgcr don't try to render when loading them in a table
        if (!render) {
            triggerStarted(false);
        }

    };

    const restartRender = () => { // something failed and we offer the user a free reload
        setRenderInfo(initialState);
        triggerStarted(false);
        triggerCrash({ title: "", text: "" });
    };


    return crash.title != "" ? (<div className="mt-10 text-center">
        Failed to load
        <br />
        <button onClick={() => restartRender()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Reload
        </button>
        <ErrorDynamic title={crash.title} text={crash.text} />
    </div>) :
        (!render ? (
            <div className="flex h-72 justify-center">
                <LoadingAnimationWithTitle title={loadingTitle} /> <button id={matchid} onClick={() => startRender()}></button>
            </div>
        ) : (
            <div className="overflow-x-auto overflow-y-hidden">
                <div className="min-h-[900px] w-[1400px] relative bg-black"/*  /* Wrapper to keep the aspect ratio*/>
                    <div className="dark:text-gray-200 w-[100%] h-[100%] ">
                        <div
                            className="h-[114px] bg-[#471E1C]"
                        >
                            <div className="absolute h-[96px] w-[900px] flex ml-[calc(min(5%,96px))]">
                                <img className="h-[96px] mt-[10px]" src="/images/pgcr/crucible_logo.png" />
                                <div className="ml-[22px] mt-[30px] font-bungo ">
                                    <div className="text-white font-bold text-5xl">
                                        {renderInfo.heading}
                                    </div>
                                    <div className="text-white opacity-70">
                                        The Crucible
                                    </div>
                                </div>
                            </div>
                            <img className="absolute opacity-5 right-[0px] mask-t-from-5% mask-t-to-90%" src="/images/pgcr/crucible_top_banner.png" />
                            <div className="absolute pt-4 text-xl pr-12 right-0 text-white opacity-80">
                                <span className="float-right">
                                    {timeDisplay}
                                </span>
                                <br />
                                <span className="float-right">
                                    {renderInfo.date}
                                </span>

                            </div>

                            <div className="absolute w-full mt-[72px] text-sm xl:text-lg 2xl:text-xl right-0 text-white flex overflow-x-auto">
                                <div className="table w-full float-right mx-8">
                                    <div className="table-row h-[44px]">
                                        <div className="table-cell w-full">
                                        </div>
                                        {Object.values(pgcr_sections).map(section => {
                                            if (section == undefined) {
                                                return <></>
                                            }
                                            return <div className="table-cell h-7 text-nowrap align-middle lg:hover:bg-[rgba(255,255,255,0.1)]" key={"profile_section_title_" + section.id}>
                                                <button className={"w-full py-2 px-2 xl:px-4 hover:opacity-100 transition-all duration-200 " + (activeSection == section.id ? "opacity-80" : "opacity-60")} onClick={() => {
                                                    location.hash = section.id; // don't push since we don't handle those
                                                    setActiveSection(section.id);
                                                }}>
                                                    {section.title}
                                                </button>
                                            </div>
                                        })}
                                    </div>
                                    <div className="table-row h-[4px]">
                                        <div className="table-cell w-full">
                                        </div>
                                        {Object.values(pgcr_sections).map(section => {
                                            return <div className={"table-cell " + (activeSection == section.id ? "bg-white" : "")} key={"profile_section_bar_" + section.id}>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Divider */}
                        <div className="h-[2px] bg-[#7E3B39]">
                        </div>
                        <div className="">
                        </div>
                        <img className="absolute w-[100%] object-cover brightness-[0.3] mask-y-from-90% mask-y-to-100% mask-x-from-90% mask-x-to-100%" src={renderInfo.bg_image} />
                        <div className="relative">
                            {Object.values(pgcr_sections).filter(section => section.id == activeSection).map(section => <div key={"profile_section_body_" + section.id}>{section.body}</div>)}
                        </div>
                    </div>
                </div>
                <Tooltip id={matchid + "_url_copy_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
            </div>
        )
        )
}
export default PGCRLookup
