import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";
import { platformLookup, secondsToDisplayTime } from "../../lib/fun";

export const PGCR_Sections_Profiles = (renderInfo: combinedPGCR) => {
    const tableHeaders = [
        <div>Bungie Name</div>,
        <>Platform Name</>,
        <>Platforms</>,
        <>Character</>,
        <>Light Level</>,
    ]

    const callback = (renderInfo: combinedPGCR, entry: userEntry) => {
        return <tr className={"bg-[rgba(255,255,255,0.1)] text-2xl font-medium w-[100%] " + (entry.quit ? "opacity-30" : "")}>
            {renderPlayerIconAndName(entry)}
            <td className="!border-0 text-center px-2 ">
                {entry.name + "#" + entry.nameCode}
            </td>
            <td className="!border-0 text-center px-2 ">
                {entry.platformName}
            </td>
            <td className="!border-0 text-center px-2 text-sm">
                <div>
                    {entry.platforms.map(platform => platformLookup(platform) ? <img className="w-8 h-8 p-1 inline" src={platformLookup(platform)?.icon} /> : "")}
                </div>
            </td>
            <td className="!border-0 text-center px-2 ">
                {entry.characterClassName}
            </td>
            <td className="!border-0 text-center px-2 ">
                {entry.lightLevel}
            </td>
        </tr>
    }
    return renderTeamList(renderInfo, tableHeaders, callback)
}