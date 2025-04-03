import React from "react";
import ErrorDynamic from "./ErrorDynamic";
import ErrorNotFound from "./ErrorNotFound";
import API, { url_data } from "../lib/api";
import * as fzstd from 'fzstd';
import update from 'immutability-helper';
import { LoadingAnimationWithTitle } from "../components/LoadingAnimation";
import { DatabaseMiddleware } from "../lib/IndexedDB";

type userEntry = {
    membershipId: string,
    membershipType: string,
    name: string,
    icon: string,
    elo: number,
    previousElo: string,
    matchup: number,
    matchWins: number,
    opponentsDefeated: number,
    kills: number,
    deaths: number,
    quit: boolean,
    playtime: number
}

type basicMatchInfo = {
    matchid: number,
    membershipId: string,
    forceRender: boolean,
}

const PGCRLookup = (props: basicMatchInfo) => {

    const urlParams = new URLSearchParams(window.location.search);

    const [renderInfo, setRenderInfo] = React.useState({
        matchid: props?.matchid,
        anonym: true, // Should we calculate stats for a specific person?
        membershipId: "",
        referenceid: "",
        bg_image: "",
        heading: "Team Scorched",
        date: "",
        duration: 0,
        teamPreference: 0, // Which team is the user on? by default the first
        team1WinChance: -1,
        team1Score: -1,
        team2Score: -1,
        team1: [], // There can be more than 2 teams, but we're gonna ignore that here e.g. pgcr 13801004315
        team2: [], // Team 1 = even numbers, Team 2 = odd
        team_left_1: [],
        team_left_2: [],
        team3: [],
    });
    const [crash, triggerCrash] = React.useState({ title: "", text: "" });
    const [render, triggerRender] = React.useState(false);
    const [started, triggerStarted] = React.useState(false);
    const [loadingTitle, setLoadingTitle] = React.useState("...");

    const getRenderInfo = async () => {
        // Verify parameters
        try {
            if (started) {
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
                    if (response.activityDetails.mode != 62) {
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
                        bg_image: { $set: image != undefined && image != "" ? "https://www.bungie.net" + image : "" }
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

                                var index = matchHistory.map(function (e) { return String(e.id); }).indexOf(String(matchid)); // Find match in database

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
                                membershipType: entry.player.destinyUserInfo.membershipType,
                                name: entry.player.destinyUserInfo.bungieGlobalDisplayName != "" ? entry.player.destinyUserInfo.bungieGlobalDisplayName : entry.player.destinyUserInfo.displayName,
                                icon: entry.player.destinyUserInfo.iconPath,
                                elo: elo,
                                previousElo: previousElo,
                                matchup: matchup,
                                matchWins: matchupWins,
                                opponentsDefeated: entry.values.opponentsDefeated.basic.value,
                                kills: entry.values.kills.basic.value,
                                deaths: entry.values.deaths.basic.value,
                                quit: entry.values.startSeconds.basic.value + entry.values.timePlayedSeconds.basic.value < entry.values.activityDurationSeconds.basic.value,
                                playtime: entry.values.timePlayedSeconds.basic.value
                            }

                            if (Number(entry.values.team.basic.value) % 2 == 0) { // Team 1
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
    };

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

    function renderTeamList(teamList) {
        return (renderInfo.team1.length == 0 ?
            <td className="!border-0">
            </td> : teamList.map((entry: userEntry) => {
                return <React.Fragment key={entry.membershipId + "_tr"}>
                    <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
                        <td className="!border-0 p-0 min-w-[38px] flex">
                            <img className="h-[38px] w-[38px]" src={entry.icon == undefined ? "" : "https://www.bungie.net" + entry.icon} />
                            <div className="pr-4 pl-3 w-[calc(100%-38px)]  min-w-[180px] h-[38px] pt-1">
                                <a href={location.origin + "/report?id=" + entry.membershipId + "&platform=" + entry.membershipType} className="hover:text-gray-200"> {entry.name} </a>
                            </div>
                        </td>
                        <td className="!border-0 text-center px-2">
                            {renderInfo.anonym ? "" : <> <span className="opacity-70 mr-1">{entry.matchWins}</span><span className="font-black">/</span><span className="opacity-70 ml-1">{entry.matchup}</span> </>}

                        </td>
                        <td className="!border-0 text-center px-2 ">
                            {entry.elo} <span className={" " + (entry.previousElo.includes("+") ? "text-green-600" : (entry.previousElo.includes("-") ? "text-red-600" : ""))}>{entry.previousElo == 0 ? "±" + entry.previousElo : entry.previousElo}</span>
                        </td>
                        <td className="!border-0 text-center px-2">
                            {entry.opponentsDefeated}
                        </td>
                        <td className="!border-0 text-center px-2 ">
                            {entry.kills}
                        </td>
                        <td className="!border-0 text-center px-2 ">
                            {entry.deaths}
                        </td>
                        <td className="!border-0 text-center px-2 ">
                            {(entry.opponentsDefeated / Math.max(1, entry.deaths)).toFixed(2)}
                        </td>
                        <td className="!border-0 text-center px-2 ">
                            {(entry.opponentsDefeated / (Math.max(60, entry.playtime) / 60)).toFixed(2)}
                        </td>
                    </tr>
                    <tr className="h-2">
                        <td className="!border-0">
                        </td>
                    </tr>
                </React.Fragment>
            }))
    }

    // Calculating Xm Ys 
    var date = new Date(renderInfo.duration * 1000);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    let timeDisplay = mm + "m " + ss + "s";

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

    const startRender = () => { // Render only once and when an invisible button was pressed for it
        if (!render) {
            getRenderInfo()
        }
    };

    if (props.forceRender || props.forceRender === undefined) {
        startRender();
    }

    return crash.title != "" ? (<div className="mt-10"><ErrorNotFound /><ErrorDynamic title={crash.title} text={crash.text} /></div>) :
        (!render ? (
            <div className="flex h-72 justify-center">
                <LoadingAnimationWithTitle title={loadingTitle} /> <button id={matchid} onClick={() => startRender()}></button>
            </div>
        ) : (
            <div className="pb-[65.25%] min-w-[1400px] max-w-[1800px] w-[100%] relative" /* Wrapper to keep the aspect ratio*/>
                <div className="mt-7 dark:text-gray-200 w-[100%] h-[100%] ">
                    <div
                        className="h-[114px] bg-[#471E1C]"//bg-[url('/images/pgcr/crucible_logo.png')]
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
                        <img className="absolute opacity-5 right-[0px] mask-linear mask-from-80 mask-dir-to-t" src="/images/pgcr/crucible_top_banner.png" />
                        <div className="absolute pt-4 text-xl pr-12 right-0 text-white opacity-80">
                            <span className="float-right">
                                {timeDisplay}
                            </span>
                            <br />
                            <span className="float-right">
                                {renderInfo.date}
                            </span>
                            <br />
                            <button onClick={() => { navigator.clipboard.writeText(location.origin + "/pgcr?id=" + renderInfo.matchid + (renderInfo.anonym ? "" : "&membershipid=" + renderInfo.membershipId)) }} className="float-right z-10 opacity-80 font-extralight hover:opacity-100">
                                {location.origin}/pgcr?id={renderInfo.matchid}{renderInfo.anonym ? "" : "&membershipid=" + renderInfo.membershipId}
                            </button>
                        </div>

                    </div>
                    {/* Divider */}
                    <div className="h-[2px] bg-[#7E3B39]">
                    </div>
                    <div className="">
                    </div>
                    <img className="absolute w-[100%] opacity-100 object-cover brightness-[0.2]" src={renderInfo.bg_image} />

                    <table className="text-white absolute mt-4 w-full font-bungo text-4xl font-bold justify-center flex px-5">
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
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    {renderInfo.anonym ? "" : "Matchup"}
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Elo
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Opponents<br />defeated
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Kills
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Deaths
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Combat<br />Efficiency
                                                </td>
                                                <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                    Kills per<br />minute
                                                </td>
                                            </tr>
                                            <tr className="w-[100%]">
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                            </tr>
                                            <tr className="w-[100%] !border-0 h-[20px] p-0 bg-[#0097E6]">
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                </td>
                                            </tr>
                                            {renderTeamList(renderInfo.team1)}
                                            {renderInfo.team1.length + renderInfo.team_left_1.length <= 6 ? renderTeamList(renderInfo.team_left_1) : ""}
                                            <tr className="h-4"> {/* empty space*/}
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
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                                <td className="!border-0 text-2xl font-medium opacity-70 p-2 text-center">
                                                </td>
                                            </tr>
                                            <tr className="w-[100%]">
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                                <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                </td>
                                            </tr>
                                            <tr className="w-[100%]">
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                                <td className="!border-0 h-[20px] p-0 bg-[#BE362A]">
                                                </td>
                                            </tr>
                                            {renderTeamList(renderInfo.team2)}
                                            {renderInfo.team2.length + renderInfo.team_left_2.length <= 6 ? renderTeamList(renderInfo.team_left_2) : ""}
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
                </div>
                {/*renderInfo.team3.length == 0 && renderInfo.team_left_1.length == 0 && renderInfo.team_left_2.length == 0 ? "" :
                    <div className={"text-gray-100" + props.forceRender ? " pt-[55.25%]" : ""}>
                        <table className="text-white absolute mt-4 w-full font-bungo text-4xl font-bold justify-center flex pt-4 pb-5 px-5 bg-[rgba(0,0,0,0.5)]">
                            <tbody className="">
                                <tr>
                                    <td className="!border-0 pr-3">
                                    </td>
                                    <td className="!border-0  w-[1500px]">
                                        {renderInfo.team3.length == 0 ? "" :
                                            <table className="w-full">
                                                <tbody>
                                                    <tr className="">
                                                        <td className="!border-0 leading-7 w-max align-bottom min-w-[220px]">
                                                            Team 1 Quitters
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            {renderInfo.anonym ? "" : "Matchup"}
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Elo
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Opponents<br />defeated
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Kills
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Deaths
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Combat<br />Efficiency
                                                        </td>
                                                        <td className="!border-0 leading-7 text-2xl font-medium opacity-70 p-2 text-center">
                                                            Kills per<br />minute
                                                        </td>
                                                    </tr>
                                                    <tr className="w-[100%]">
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                        <td className="!border-0 h-[4px] p-0 bg-[#fff]">
                                                        </td>
                                                    </tr>
                                                    <tr className="w-[100%] !border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                        <td className="!border-0 h-[20px] p-0 bg-[#0097E6]">
                                                        </td>
                                                    </tr>{renderInfo.team3.map((entry: userEntry) => {
                                                        return <React.Fragment key={entry.membershipId + "_tr"}>
                                                            <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
                                                                <td className="!border-0 p-0 min-w-[38px] flex">
                                                                    <img className="h-[38px] w-[38px]" src={entry.icon == undefined ? "" : "https://www.bungie.net" + entry.icon} />
                                                                    <div className="pr-4 pl-3 w-[calc(100%-38px)]  min-w-[180px] h-[38px] pt-1">
                                                                        <a href={location.origin + "/report?id=" + entry.membershipId + "&platform=" + entry.membershipType} className="hover:text-gray-200"> {entry.name} </a>
                                                                    </div>
                                                                </td>
                                                                <td className="!border-0 text-center px-2">
                                                                    {renderInfo.anonym ? "" : <> <span className="opacity-70 mr-1">{entry.matchWins}</span><span className="font-black">/</span><span className="opacity-70 ml-1">{entry.matchup}</span> </>}

                                                                </td>
                                                                <td className="!border-0 text-center px-2 ">
                                                                    {entry.elo}
                                                                </td>
                                                                <td className="!border-0 text-center px-2">
                                                                    {entry.opponentsDefeated}
                                                                </td>
                                                                <td className="!border-0 text-center px-2 ">
                                                                    {entry.kills}
                                                                </td>
                                                                <td className="!border-0 text-center px-2 ">
                                                                    {entry.deaths}
                                                                </td>
                                                                <td className="!border-0 text-center px-2 ">
                                                                    {(entry.opponentsDefeated / Math.max(1, entry.deaths)).toFixed(2)}
                                                                </td>
                                                                <td className="!border-0 text-center px-2 ">
                                                                    {(entry.opponentsDefeated / (Math.max(60, entry.playtime) / 60)).toFixed(2)}
                                                                </td>
                                                            </tr>
                                                            <tr className="h-2">
                                                                <td className="!border-0">
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    })}
                                                </tbody>
                                            </table>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="!border-0">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>*/}
            </div>
        )
        )
}
export default PGCRLookup
