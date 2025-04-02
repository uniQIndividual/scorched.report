import React from "react";
import { type Scorcher } from "../../lib/entities";
import { CharacterBanner } from "./Character_Banner";
import { D2Box } from "./D2Box";

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
            classType = "Titan"
            break;
        case 1:
            classType = "Hunter"
            break;
        case 2:
            classType = "Warlock"
            break;
        default:
            classType = "Deleted"
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


    return (
        <D2Box title={classType} body={
            <div className="mt-4 mb-10 h-max">
            <div className="flex justify-center">
                <CharacterBanner bannerUrl={props.characters[characterId].emblemBackgroundPath != undefined && props.characters[characterId].emblemBackgroundPath != "" ? props.characters[characterId].emblemBackgroundPath : ""} profileName={props.profile.profileName} lightLevel={props.profile.lightLevel} clanName={props.profile.clanName} />
            </div>
            <div className="max-w-[470px] px-2 mt-8 mx-2 my-2 ">
                {/*<div className="absolute max-w-[470px] justify-center flex">
                    {classType != "" ? <img className="opacity-10" src={"/images/icons/" + classType + "_icon.png"} /> : ""}
                </div>*/}
                {(characterStats?.activitiesEntered || 0) <= 0 ? <span className="w-full flex justify-center text-gray-400 font-light">
                    Time to play more Team Scorched
                </span> :
                    <div className="mt-4 text-gray-500 dark:text-gray-400 text-lg sm:text-xl">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Playtime
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {formatSeconds(characterStats?.secondsPlayed || 0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Usage
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.activitiesEntered || 0) * 100 / (props.bungieHistoricAccountStats.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Matches
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.activitiesEntered}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Wins
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {(characterStats?.activitiesWon || 0)}
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.activitiesWon || 0) * 100 / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}%)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Team matches
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.fireTeamActivities}
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.fireTeamActivities || 0) * 100 / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
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
                                        Opponents defeated
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.opponentsDefeated.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.opponentsDefeated || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Kills
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.kills.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.kills || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Deaths
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.deaths.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.deaths || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Assists
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.assists.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.assists || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Physics Kills
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.kills || 0) - ((characterStats?.weaponKills.weaponKillsRelic || 0) + truelyStrangeKills)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                </tr>
                                {truelyStrangeKills == 0 ? "" :
                                    <tr>
                                        <td className="text-right pr-2">
                                            Unconventional Kills
                                        </td>
                                        <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                            {(truelyStrangeKills).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>}
                                <tr>
                                    <td className="text-right pr-2">
                                        Misadventures
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.suicides}
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.suicides || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
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
                                        K/D
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.kills || 0) / Math.max(characterStats?.deaths || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Efficiency
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {(((characterStats?.kills || 0) + (characterStats?.assists || 1)) / Math.max(characterStats?.deaths || 0, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        KPM
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.kills || 0) * 60 / Math.max(characterStats?.secondsPlayed || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Combat Rating
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
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
                                        Highest Kill Streak
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        <a className="hover:text-white underline underline-offset-4 decoration-[1px]" href={"/pgcr?id=" + characterStats?.longestKillSpreeMatch}>
                                            {characterStats?.longestKillSpree}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Highest Score
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.bestSingleGameScore}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Highest Kill count
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.bestSingleGameKills}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Fastest Match
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {formatSeconds((characterStats?.fastestCompletionMs || 0) / 1000)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Longest Kill Distance
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
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
                                        Orbs generated
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {characterStats?.orbsDropped.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-800 dark:text-gray-300 text-lg ml-1">({((characterStats?.orbsDropped || 0) / (characterStats?.activitiesEntered || 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average kill distance
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.totalKillDistance || 0) / Math.max(characterStats?.kills || 1, 1)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} m
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Match Duration
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {formatSeconds((characterStats?.totalActivityDurationSeconds || 0) / Math.max(characterStats?.activitiesEntered || 1, 1))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Lifespan
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {formatSeconds(characterStats?.averageLifespan || 0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Average Team Score
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {((characterStats?.teamScore || 0) / (characterStats?.activitiesEntered || 0)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Avg Match Completion
                                    </td>
                                    <td className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                                        {(100 - ((characterStats?.remainingTimeAfterQuitSeconds || 0) * 100 / (characterStats?.totalActivityDurationSeconds || 1))).toLocaleString(undefined, {
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
                <span className="text-gray-400 text-xl"><span className="text-gray-900 dark:text-gray-100 lg:text-2xl">{characterStats?.activitiesWon}</span> Wins / <span className="text-gray-900 dark:text-gray-100 lg:text-2xl">
                    {(characterStats?.activitiesEntered || 0) - (characterStats?.activitiesWon || 0)}</span> Ties & Losses </span>
            </div>
        </div>
        } />
    );

}