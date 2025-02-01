import React from "react";
import { type Scorcher } from "../../lib/entities";
import { awards, medalsBungie } from "../../lib/entities";
import { Tooltip } from 'react-tooltip'

interface LayoutProps {
    props: Scorcher;
    characterId: string;
}

export const CharacterInfo: React.FC<LayoutProps> = ({ props, characterId }) => {
    if (!props.characters.hasOwnProperty(characterId) || !props.bungieHistoricStats.hasOwnProperty(characterId)) {
        return ""
    }

    let classType = "" // https://bungie-net.github.io/multi/schema_Destiny-DestinyClass.html#schema_Destiny-DestinyClass
    switch (props.characters[characterId].classType) {
        case 0:
            classType = "titan"
            break;
        case 1:
            classType = "hunter"
            break;
        case 2:
            classType = "warlock"
            break;
        default:
            ""
            break;
    }

    const characterStats = props.bungieHistoricStats[characterId];
    let truelyStrangeKills = 0;
    Object.keys(characterStats!.weaponKills).map((category) => {
        if (category != "weaponKillsRelic") truelyStrangeKills += (characterStats!.weaponKills[category] || 0);
    })

    function formatSeconds(duration: number) {
        var date = new Date(duration * 1000);
        var hh = Math.floor(duration / 3600);
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
    }




    // Reorder the awards
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    const awardKeys = Object.keys(props.awards);
    awardKeys.move(0, 6)

    const emblemLength = awardKeys.map(value => (props.awards[value] === true ? 1 : 0))
        .reduce((sum, current) => sum + current, 0); // Let's print a max of 8 awards per row
    const wrapEmblems = emblemLength > 6;

    const iconSize = wrapEmblems ? "22px" : "26px";
    const glowOffset = wrapEmblems ? "11px" : "13px";

    const hoverText = (award) => {
        return `<div style="padding: 12px; z-index: 11000; max-width: 240px; ">
            <table >
            <tbody>
                <tr>
                <td style="justify-content: center; display: flex; padding: 12px;">
                    <div style=" position: absolute; transform: rotate(45deg);` +
            (awards[award].glow == "shadow-awardGlow" ? "box-shadow: 44px 44px 50px 30px rgba(240,217,170,0.8)" : "") +
            (awards[award].glow == "shadow-awardGlowRed" ? "box-shadow: 44px 44px 50px 30px rgba(212,47,47,0.9)" : "") +
            `"></div>
                    <img style="" src=` + awards[award].src + ` />
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 6px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.5rem; color: rgb(255 255 255); z-index: 110;">
                        ` + awards[award].text + `
                    </div>
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 12px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.125rem; color: rgb(255 255 255); z-index: 110;">
                        ` + awards[award].description + `
                    </div>
                    </td>
                </tr>
               </tbody>
            </table>
        </div>`};

    return (
        <div className="block mt-4 mb-10 h-max">
            <div className="bg-no-repeat max-w-[474px] h-[96px]" style={{ backgroundImage: (props.characters[characterId].emblemBackgroundPath != undefined && props.characters[characterId].emblemBackgroundPath != "" ? "url(https://www.bungie.net" + props.characters[characterId].emblemBackgroundPath + ")" : ""), backgroundColor: "#000" }}>
                <table className=" ml-[86px] max-w-[388px]">
                    <tbody>
                        <tr className="mt-1">
                            <td className="m-0 p-0">
                                <table className="mr-2 h-12">
                                    <tbody>
                                        <tr>
                                            <td className=" text-white text-3xl font-bungo leading-none m-0 p-0  max-w-[388px]">
                                                <span className="max-w-[268px] block truncate ...">
                                                    {props.characters[characterId].deleted ? "Deleted" : props.profile.profileName}
                                                </span>
                                                {/*<div className="w-[268px] h-[48px]">
                                                    <svg viewBox="0 0 48 26" width={"100%"} height={"100%"}>
                                                        <text x="-48" y="20" textAnchor="">{"12345678901234567890"}</text>
                                                    </svg></div>*/}
                                            </td>
                                            <td className="font-bungo font-[500] text-[#D3BF4A] text-[42px] pr-3 leading-none m-0 p-0 left-0 text-right flex">
                                                <img src="/images/icons/ll.png" className="w-[14px] h-[14px] float-right object-scale-down mt-2" />
                                                {props.characters[characterId].light}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table className="mr-2 h-12">
                                    <tbody>
                                        <tr>
                                            <td className=" text-white opacity-40 font-bungo text-[22px] leading-none m-0 p-0 max-w-[218px] h-[48px] ">
                                                <span className="max-w-[218px]  pt-2 block truncate ...">
                                                    {props.profile.clanName}
                                                </span>
                                            </td>
                                            <td className={"max-w-[170px] max-h-12 h-[" + { iconSize } + "] leading-none m-0 p-0 left-0 text-right"}>
                                                {awardKeys.map((award) => {
                                                    return props.awards[award] ? (
                                                        <div key={"div_" + award}>
                                                            <a
                                                                data-tooltip-id={award + "_tooltip"}
                                                                data-tooltip-html={hoverText(award)}
                                                                className={"w-[" + iconSize + "] h-[" + iconSize + "] float-right ml-1"}
                                                            >
                                                                <div style={{ marginTop: glowOffset, marginLeft: glowOffset }} className={awards[award].glow + " absolute rotate-45"}></div>
                                                                <img src={awards[award].src} key={"img_" + award} width={iconSize} height={iconSize} className="float-right " />
                                                            </a>
                                                            <Tooltip id={award + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                                                        </div>
                                                    ) : ""
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="max-w-[470px] px-2 mt-8 mx-2 my-2 ">
                <div className="absolute max-w-[470px] justify-center flex">
                    {classType != "" ? <img className="opacity-10" src={"/images/icons/" + classType + "_icon.png"} /> : ""}
                </div>
                {(characterStats?.activitiesEntered || 0) <= 0 ? <span className="w-full flex justify-center text-gray-400 font-light">
                    Time to play more Team Scorched
                </span> :
                    <div className="mt-4 text-gray-300 text-xl">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Playtime:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {formatSeconds(characterStats?.secondsPlayed || 0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Usage:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.activitiesEntered || 0) * 100 / (props.bungieHistoricAccountStats.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Matches:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.activitiesEntered}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Wins:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {(characterStats?.activitiesWon || 0)}
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.activitiesWon || 0) * 100 / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Team matches:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.fireTeamActivities}
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.fireTeamActivities || 0) * 100 / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-3"></td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Opponents defeated:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.opponentsDefeated.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.opponentsDefeated || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Kills:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.kills.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.kills || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Deaths:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.deaths.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.deaths || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Assists:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.assists.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.assists || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Physics Kills:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.kills || 0) - ((characterStats?.weaponKills.weaponKillsRelic || 0) + truelyStrangeKills)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                </tr>
                                {truelyStrangeKills == 0 ? "": 
                                <tr>
                                    <td className="text-right pr-2">
                                        Unconventional Kills:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {(truelyStrangeKills).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                </tr>}
                                <tr>
                                    <td className="text-right pr-2">
                                        Misadventures:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.suicides}
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.suicides || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 3,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-3"></td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        K/D:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.kills || 0) / Math.max(characterStats?.deaths || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Efficiency:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {(((characterStats?.kills || 0) + (characterStats?.assists || 1)) / Math.max(characterStats?.deaths || 0, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        KPM:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.kills || 0) * 60 / Math.max(characterStats?.secondsPlayed || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Combat Rating:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.combatRating.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-3"></td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Highest Kill Streak:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        <a className="hover:text-white underline underline-offset-4 decoration-[1px]" href={"/pgcr?id=" + characterStats?.longestKillSpreeMatch}> 
                                            {characterStats?.longestKillSpree}
                                            </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Highest Score:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.bestSingleGameScore}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Highest Kill count:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.bestSingleGameKills}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Fastest Match:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {formatSeconds((characterStats?.fastestCompletionMs || 0) / 1000)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Longest Kill Distance:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {(characterStats?.longestKillDistance || 0).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} m
                                    </td>
                                </tr>
                                <tr>
                                    <td className="h-3"></td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Orbs generated:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {characterStats?.orbsDropped.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-300 text-lg ml-1">({((characterStats?.orbsDropped || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average kill distance:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.totalKillDistance || 0) / Math.max(characterStats?.kills || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} m
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Match Duration:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {formatSeconds((characterStats?.totalActivityDurationSeconds || 0) / Math.max(characterStats?.activitiesEntered || 1, 1))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Lifespan:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {formatSeconds(characterStats?.averageLifespan || 0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Team Score:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {((characterStats?.teamScore || 0) / (characterStats?.activitiesEntered || 0)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Avg Match Completion:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {( 100 -((characterStats?.remainingTimeAfterQuitSeconds || 0)* 100 / (characterStats?.totalActivityDurationSeconds || 1))).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <div className="flex justify-center mt-6">
                <span className="text-gray-400 text-xl"><span className="text-gray-100 text-2xl">{characterStats?.activitiesWon}</span> Wins / <span className="text-gray-100 text-2xl">
                    {(characterStats?.activitiesEntered || 0) - (characterStats?.activitiesWon || 0)}</span> Ties & Losses </span>
            </div>
        </div>
    );

}