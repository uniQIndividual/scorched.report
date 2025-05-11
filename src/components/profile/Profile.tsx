import React from "react";
import { renderPlayerIconAndName, renderTeamList, type combinedPGCR, type userEntry } from "../../modules/PGCRLookup";
import { platformLookup, secondsToDisplayTime } from "../../lib/fun";
import type { Scorcher } from "../../lib/entities";
import { D2Box } from "./D2Box";
import { Tooltip } from "react-tooltip";

export const Profile = (stats: Scorcher) => {
    const links = [
        {
            "name": "Scorched Report",
            "url": `http://scorched.report/report?id=${stats.id}&platform=${stats.platform}`,
            "icon": "/images/logo2.png"
        },
        {
            "name": "Scorched Report Backup",
            "url": `https://scorched-report.pages.dev/report?id=${stats.id}&platform=${stats.platform}`,
            "icon": "/images/logo2.png"
        },
        {
            "name": "Bungie",
            "url": `https://www.bungie.net/7/en/User/Profile/${stats.platform}/${stats.id}`,
            "icon": "/images/icons/external/bungie.webp"
        },
        {
            "name": "Destiny Sets",
            "url": `https://data.destinysets.com/api/Destiny2.GetProfile?components=100%2C200&destinyMembershipId=${stats.id}&membershipType=${stats.platform}`,
            "icon": "/images/icons/external/destinysets.webp"
        },
        {
            "name": "Braytech",
            "url": `https://bray.tech/${stats.platform}/${stats.id}/`,
            "icon": "/images/icons/external/braytech.webp"
        },
        {
            "name": "Crucible Report",
            "url": `https://crucible.report/report/${stats.platform}/${stats.id}`,
            "icon": "/images/icons/external/cruciblereport.webp"
        },
        {
            "name": "Trials Report",
            "url": `https://trials.report/report/${stats.platform}/${stats.id}`,
            "icon": "/images/icons/external/cruciblereport.webp"
        },
        {
            "name": "Time Wasted on Destiny",
            "url": `https://wastedondestiny.com/${stats.id}`,
            "icon": "/images/icons/external/timewastedondestiny.webp"
        },
        {
            "name": "Crimson Report",
            "url": `https://crimson.report/${stats.id}`,
            "icon": "/images/icons/external/crimsonreport.webp"
        },
        {
            "name": "GM Report",
            "url": `https://gm.report/${stats.id}`,
            "icon": "/images/icons/external/gmreport.webp"
        },
        {
            "name": "D2LostSector",
            "url": `https://d2lostsector.report/player/${stats.platform}/${stats.id}/`,
            "icon": "/images/icons/external/d2lostsector.webp"
        },
        {
            "name": "RaidHub",
            "url": `https://raidhub.io/profile/${stats.id}`,
            "icon": "/images/icons/external/raidhub.webp"
        },
        {
            "name": "Lowman Central",
            "url": `https://lowman-central.com/Profiles/${stats.platform}/${stats.id}`,
            "icon": "/images/icons/external/lowmancentral.webp"
        },
        {
            "name": "Guardian Report",
            "url": `https://guardian.report/?guardians=${stats.id}`,
            "icon": "/images/icons/external/cruciblereport.webp"
        },/*
        {
            "name": "Destiny Focus",
            "url": `https://destiny-focus.me/pgcr/${stats.id}`,
            "icon": "/images/icons/external/destinyfocus.webp"
        },
        {
            "name": "Black Garden",
            "url": `https://black.garden/pgcr/${stats.id}`,
            "icon": "/images/icons/external/blackgarden.webp"
        },/*
        {
            "name": "DestinyKD",
            "url": `https://www.destinykd.com/game-report/${stats.id}`,
            "icon": "/images/icons/external/destinykd.webp"
        },*/
        {
            "name": "Emblem Report",
            "url": `https://emblem.report/p/${stats.platform}/${stats.id}`,
            "icon": "/images/icons/external/emblemreport.webp"
        },
        {
            "name": "Destiny Tracker",
            "url": `https://destinytracker.com/destiny-2/profile/bungie/${stats.id}/overview`,
            "icon": "/images/icons/external/destinytracker.webp"
        },
        /*{
            "name": "Raid Report",
            "url": `https://raid.report/pgcr/${stats.id}`, //https://raid.report/pc/4611686018476119091
            "icon": "/images/icons/external/raidreport.webp"
        },
        {
            "name": "Dungeon Report",
            "url": `https://dungeon.report/${stats.id}`,
            "icon": "/images/icons/external/dungeonreport.webp"
        },*/
    ]
    return <div className="flex flex-wrap justify-center">
        <D2Box title="Details" body={<div className="p-2">
            <table>
                <tbody>
                    <tr>
                        <td className="p-1 float-right">
                            Username
                        </td>
                        <td className="p-1 opacity-80 wrap-anywhere text-wrap">
                            {stats.profile.profileName + "#" + stats.profile.bungieNameCode}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-1 float-right">
                            ID
                        </td>
                        <td className="p-1">
                            <button onClick={() => {
                                navigator.clipboard.writeText(stats.id);
                                document.getElementById("profile_id_copy_button")!.dataset["tooltipHtml"] = "<div>ID copied!</div>";
                                setTimeout(() => {
                                    const el = document.getElementById("profile_id_copy_button");
                                    el ? el.dataset["tooltipHtml"] = "<div>Copy ID</div>" : "";
                                }, 1000);
                            }}
                                className="z-10 opacity-80 font-extralight hover:opacity-100 text-left"
                                data-tooltip-id={"profile_id_copy_tooltip"}
                                data-tooltip-html={"<div>Copy ID</div>"}
                                id={"profile_id_copy_button"}
                            >
                                {stats.id}
                            </button>
                            <Tooltip id={"profile_id_copy_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                        </td>
                    </tr>
                    <tr>
                        <td className="p-1 float-right">
                            Join Code
                        </td>
                        <td className="p-1 opacity-80 wrap-anywhere text-wrap">
                            <button onClick={() => {
                                navigator.clipboard.writeText(stats.id);
                                document.getElementById("profile_id_copy_button")!.dataset["tooltipHtml"] = "<div>Join code copied!</div>";
                                setTimeout(() => {
                                    const el = document.getElementById("profile_joincode_copy_button");
                                    el ? el.dataset["tooltipHtml"] = "<div>Copy join code</div>" : "";
                                }, 1000);
                            }}
                                className="z-10 opacity-80 font-extralight hover:opacity-100 text-left"
                                data-tooltip-id={"profile_joincode_copy_tooltip"}
                                data-tooltip-html={"<div>Copy join code</div>"}
                                id={"profile_joincode_copy_button"}
                            >
                                {"/join " + stats.profile.profileName + "#" + stats.profile.bungieNameCode}
                            </button>
                            <Tooltip id={"profile_joincode_copy_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>} />
        <D2Box title="Platforms" body={<div className="flex justify-center">
            {stats.profile.crosssaveEnabled ? <div>
                <img
                    className="w-8 h-8 mx-2 my-6 inline"
                    src={"/images/icons/crossSave.webp"}
                    data-tooltip-id={"profile_platform_tooltip_crosssave"}
                    data-tooltip-html={"<div>Cross Save enabled</div>"}
                />
                <Tooltip id={"profile_platform_tooltip_crosssave"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
            </div> : ""}
            {stats.profile.platform_all.map((platform, i) => <div key={"profile_platform_div_" + i}>
                {platformLookup(platform) ? <img
                    className="w-8 h-8 mx-2 my-6 inline"
                    src={platformLookup(platform)?.icon}
                    data-tooltip-id={"profile_platform_tooltip_" + i}
                    data-tooltip-html={"<div>" + platformLookup(platform)?.name + "</div>"}
                /> : ""}
                <Tooltip id={"profile_platform_tooltip_" + i} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
            </div>)}
        </div>} />
        <D2Box title="External Sites" body={<div className="flex flex-wrap justify-center p-4">
            {links.map(((site, i) =>
                <div key={"profile_links_" + i} className="p-2">
                    <a
                        href={site.url}
                        className=""
                        target="_blank" >
                        <img
                            src={site.icon}
                            className="cursor-pointer h-8 w-8 hover:brightness-150"
                            data-tooltip-id={"profile_external_links_tooltip_" + i}
                            data-tooltip-html={"<div>" + site.name + "</div>"}
                        />
                    </a>
                    <Tooltip id={"profile_external_links_tooltip_" + i} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                </div>
            ))}
        </div>} />
    </div>
}