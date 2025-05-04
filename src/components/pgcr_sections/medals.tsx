import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";
import { Tooltip } from "react-tooltip";

export const PGCR_Sections_Medals = (renderInfo: combinedPGCR) => {
    const tableHeaders = [
        <div>Medals</div>
    ]
    const callback = (renderInfo: combinedPGCR, entry: userEntry) => {
        return <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
            {renderPlayerIconAndName(entry)}
            <td className="!border-0 text-left px-2">
                {Object.entries(entry.medals).sort((a, b) => {
                    if (a[1].tier > b[1].tier)
                        return -1;
                    if (a[1].tier < b[1].tier)
                        return 1;
                    return 0;
                }
                ).map((medal) => {
                    return <div key={entry.membershipId + "_medals_" + medal[0]} className="inline pr-4 text-lg">
                        {medal[1].value}x
                        <img
                            data-tooltip-id={entry.membershipId + "_medals_" + medal[0] + "_tooltip"}
                            data-tooltip-html={
                                `<div>
                            <div className="flex justify-center">`+
                                medal[1].name +
                                `</div>
                            <div className="flex justify-center">`+
                                medal[1].description +
                                `</div>
                        </div>`
                            }
                            className="w-8 h-8 inline hover:brightness-150"
                            src={medal[1].icon ? ("https://www.bungie.net" + medal[1].icon) : ""} />
                        <Tooltip id={entry.membershipId + "_medals_" + medal[0] + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(8,9,10,0.9)" }} />
                    </div>
                })}
            </td>
        </tr>
    }
    return renderTeamList(renderInfo, tableHeaders, callback)
}