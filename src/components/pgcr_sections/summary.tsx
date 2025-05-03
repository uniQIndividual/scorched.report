import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";

export const PGCR_Sections_Summary = (renderInfo: combinedPGCR) => {
    const tableHeaders = [
        renderInfo.anonym ? <></> : <>Matchup</>,
        <>Elo</>,
        <>Opponents<br />defeated</>,
        <>Kills</>,
        <>Deaths</>,
        <>Combat<br />Efficiency</>,
        <>Kills per<br />minute</>
    ]
    const callback = (renderInfo: combinedPGCR, entry: userEntry) => {
        return <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
            {renderPlayerIconAndName(entry)}
            <td className="!border-0 text-center px-2">
                {renderInfo.anonym ? "" : <> <span className="opacity-70 mr-1">{entry.matchWins}</span><span className="font-black">/</span><span className="opacity-70 ml-1">{entry.matchup}</span> </>}

            </td>
            <td className="!border-0 text-center px-2 ">
                {entry.elo} {entry.previousElo != undefined ? <span className={" " + (entry.previousElo.includes("+") ? "text-green-600" : (entry.previousElo.includes("-") ? "text-red-600" : ""))}>{entry.previousElo == "0" ? "±" + entry.previousElo : entry.previousElo}</span> : <></>}
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
                {(entry.kills / (Math.max(60, entry.playtime) / 60)).toFixed(2)}
            </td>
        </tr>
    }
    return renderTeamList(renderInfo, tableHeaders, callback)
}