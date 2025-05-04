import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";
import { secondsToDisplayTime } from "../../lib/fun";

export const PGCR_Sections_Profiles = (renderInfo: combinedPGCR) => {
    const tableHeaders = [
        <div>Bungie Name</div>,
        <>Platform Name</>,
        <>Platforms</>,
        <>Character</>,
        <>Light Level</>,
    ]
    const platformLookup = (platform: number) => {
        switch (platform) {
            case 1:
                return "https://www.bungie.net//img/theme/bungienet/icons/xboxLiveLogo.png"
            case 2:
                return "https://www.bungie.net//img/theme/bungienet/icons/psnLogo.png"
            case 3:
                return "https://www.bungie.net//img/theme/bungienet/icons/steamLogo.png"
            case 4:
                return undefined //"Blizzard" //TODO: get images
            case 5:
                return "https://www.bungie.net//img/theme/destiny/icons/icon_stadia.png"
            case 6:
                return "https://www.bungie.net//img/theme/destiny/icons/icon_egs.png"
            default:
                return undefined
        }
    }
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
                    {entry.platforms.map(platform => platformLookup(platform) ? <img className="w-8 h-8 p-1 inline" src={platformLookup(platform)} /> : "")}
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