import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";
import { secondsToDisplayTime } from "../../lib/fun";

export const PGCR_Sections_Time = (renderInfo: combinedPGCR) => {
    const tableHeaders = [
        <div className="pt-5">Join Time</div>,
        <>Playtime</>,
    ]
    const callback = (renderInfo: combinedPGCR, entry: userEntry) => {
        return <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
            {renderPlayerIconAndName(entry)}
            <td className="!border-0 text-center px-2 ">
                {secondsToDisplayTime(entry.startSeconds)}
            </td>
            <td className="!border-0 text-center px-2 ">
                {secondsToDisplayTime(entry.playtime)}
            </td>
        </tr>
    }
    return renderTeamList(renderInfo, tableHeaders, callback)
}