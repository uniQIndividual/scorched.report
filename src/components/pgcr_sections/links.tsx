import type { combinedPGCR } from "../../modules/PGCRLookup";

export const PGCR_Sections_Links = (renderInfo: combinedPGCR) => {
    const links = [
        {
            "name": "Scorched Report",
            "url": `https://scorched.report/pgcr/?id=${renderInfo.matchid}&membershipid=${renderInfo.membershipId}`,
            "icon": "/images/logo2.png"
        },
        {
            "name": "Scorched Report Backup",
            "url": `https://scorched-report.pages.dev/pgcr/?id=${renderInfo.matchid}&membershipid=${renderInfo.membershipId}`,
            "icon": "/images/logo2.png"
        },
        {
            "name": "Bungie",
            "url": `https://www.bungie.net/en/PGCR/${renderInfo.matchid}`,
            "icon": "/images/icons/external/bungie.webp"
        },
        {
            "name": "Destiny Sets",
            "url": `https://data.destinysets.com/api/Destiny2.GetPostGameCarnageReport?activityId=${renderInfo.matchid}`,
            "icon": "/images/icons/external/destinysets.webp"
        },
        {
            "name": "Crucible Report",
            "url": `https://crucible.report/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/cruciblereport.webp"
        },
        {
            "name": "Braytech",
            "url": `https://bray.tech/report/${renderInfo.matchid}`,
            "icon": "/images/icons/external/braytech.webp"
        },
        {
            "name": "Destiny Focus",
            "url": `https://destiny-focus.me/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/destinyfocus.webp"
        },
        {
            "name": "DestinyKD",
            "url": `https://www.destinykd.com/game-report/${renderInfo.matchid}`,
            "icon": "/images/icons/external/destinykd.webp"
        },
        {
            "name": "Destiny Tracker",
            "url": `https://destinytracker.com/destiny-2/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/destinytracker.webp"
        },
        {
            "name": "GM Report",
            "url": `https://gm.report/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/gmreport.webp"
        },
        {
            "name": "Trials Report",
            "url": `https://trials.report/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/cruciblereport.webp"
        },
        {
            "name": "Raid Report",
            "url": `https://raid.report/pgcr/${renderInfo.matchid}`,
            "icon": "/images/icons/external/raidreport.webp"
        },
        {
            "name": "Dungeon Report",
            "url": `https://dungeon.report/${renderInfo.matchid}`,
            "icon": "/images/icons/external/dungeonreport.webp"
        },
    ]
    try {
        return (
            <div className="flex flex-wrap justify-center m-12 text-base">
                <div className="flex w-full justify-center text-xl">
                    Copy the link to this match
                </div>
                <button onClick={() => {
                    navigator.clipboard.writeText(location.origin + "/pgcr?id=" + renderInfo.matchid + (renderInfo.anonym ? "" : "&membershipid=" + renderInfo.membershipId));
                    document.getElementById(renderInfo.matchid + "_url_copy_button")!.dataset["tooltipHtml"] = "<div>Link Copied!</div>";
                    setTimeout(() => {
                        document.getElementById(renderInfo.matchid + "_url_copy_button")!.dataset["tooltipHtml"] = "<div>Copy link</div>";
                    }, 1000);
                }}
                    className="float-right z-10 opacity-80 font-extralight hover:opacity-100"
                    data-tooltip-id={renderInfo.matchid + "_url_copy_tooltip"}
                    data-tooltip-html={"<div>Copy link</div>"}
                    id={renderInfo.matchid + "_url_copy_button"}
                >
                    {location.origin}/pgcr?id={renderInfo.matchid}{renderInfo.anonym ? "" : "&membershipid=" + renderInfo.membershipId}
                </button>
                <div className="flex w-full justify-center text-xl mt-20">
                    View this match on other websites
                </div>
                <div className="grid grid-cols-6">
                    {links.map((val, index) => {
                        return <a key={"pgcr_section_links_" + index}
                            className="m-4"
                            target="_blank"
                            href={val.url}>
                            <div
                                className="group cursor-pointer p-4 backdrop-blur-sm bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.2)] rounded-lg"
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-10 !border-0">
                                                <img src={val.icon} className="cursor-pointer h-8 w-8 mr-2 group-hover:brightness-150" />
                                            </td>
                                            <td className="!border-0">
                                                <span className="align-middle group-hover:text-white">
                                                    {val.name}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </a>
                    })}
                </div>
            </div>
        )
    } catch (error) {
        console.log(error);
        return <div>An error occurred</div>
    }
}