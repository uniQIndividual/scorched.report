import React from "react";
import { awards, type Scorcher } from "../../pages/entities";
import ApexChart from "react-apexcharts";
import { Tooltip } from 'react-tooltip'


export const Activity = (stats: Scorcher) => {
    // How much was played
    // team or solo
    // comparing to boring crucible
    // total play time
    // quit percentage
    // kill distance
    // special kills

    // Reorder the awards
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    const awardKeys = Object.keys(stats.awards);
    awardKeys.move(0, 6)

    const emblemLength = awardKeys.map(value => (stats.awards[value] === true ? 1 : 0))
        .reduce((sum, current) => sum + current, 0); // Let's print a max of 8 awards per row
    const wrapEmblems = emblemLength > 6;

    const iconSize = wrapEmblems ? "22px" : "26px";
    const glowOffset = wrapEmblems ? "11px" : "13px";

    const hoverText = (award: string) => {
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


    function formatSeconds(duration: number) {
        var date = new Date(duration * 1000);
        var hh = Math.floor(duration / 3600);
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
    }

    function characterClassToString(characterClass: number) {
        switch (characterClass) {
            case 0:
                return "Titan"
            case 1:
                return "Hunter"
            case 2:
                return "Warlock"
            default:
                return "Unknown"
        }
    }
    function characterClassToColor(characterClass: number) {
        switch (characterClass) {
            case 0:
                return "rgba(155, 53, 41,1)"
            case 1:
                return "rgba(69, 112, 121,1)"
            case 2:
                return "rgba(175, 135, 37,1)"
            default:
                return "Unknown"
        }
    }


    let truelyStrangeKills = 0;
    Object.keys(stats.bungieHistoricAccountStats.weaponKills).map((category) => {
        if (category != "weaponKillsRelic") truelyStrangeKills += (stats.bungieHistoricAccountStats.weaponKills[category] || 0);
    })

    return (
        <div className="w-[80vw] lg:w-[calc(90vw-350px)]">
            <div className="text-4xl text-gray-100 flex justify-center mt-2 font-semibold">Experience</div>
            <div className="grid grid-cols-3 justify-evenly mt-12">
                <div>
                    <ApexChart
                        className="sparkline-chart"
                        type={"pie"}
                        height={200}
                        series={[stats.performance.matches, stats.crucible.matches - stats.performance.matches]}
                        options={{
                            colors: ["rgba(250,50,40,0.4)", "#a8a8a8"],
                            chart: {
                                dropShadow: {
                                    enabled: true,
                                    blur: 1,
                                    left: 1,
                                    top: 1
                                }
                            },
                            labels: ['Team Scorched', 'Wrong game modes'],
                            fill: {
                                opacity: 1,
                            },
                            stroke: {
                                show: true,
                                width: 0.5,
                                colors: [],
                                dashArray: 0
                            },
                            yaxis: {
                                show: true,
                            },
                            xaxis: {
                                labels: {
                                    show: true,
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                                    return w.config.series[seriesIndex] + " (" + value.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 1,
                                    }) + "%)"
                                },
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    colors: ['#333']
                                },
                                background: {
                                    enabled: true,
                                    foreColor: '#fff',
                                    padding: 10,
                                },
                            },
                            legend: {
                                show: true,
                                position: 'bottom',
                                labels: {
                                    colors: "#e8e8e8",
                                    useSeriesColors: false
                                },
                            }
                        }}
                    />
                    <span className="flex justify-center mt-2  text-gray-300">Matches per game mode</span>
                </div>
                <div>
                    <ApexChart
                        className="sparkline-chart"
                        type={"pie"}
                        height={200}
                        series={Object.keys(stats.bungieHistoricStats).map(character => {
                            return stats.bungieHistoricStats[character]?.activitiesEntered
                        })}
                        options={{
                            colors: Object.keys(stats.bungieHistoricStats).map(character => {
                                return characterClassToColor(stats.characters[character]?.classType)
                            }),
                            chart: {
                                dropShadow: {
                                    enabled: true,
                                    blur: 1,
                                    left: 1,
                                    top: 1
                                }
                            },
                            labels: Object.keys(stats.bungieHistoricStats).map(character => {
                                return characterClassToString(stats.characters[character]?.classType)
                            }),
                            fill: {
                                opacity: 1,
                            },
                            stroke: {
                                show: true,
                                width: 0.4,
                                colors: [],
                                dashArray: 0
                            },
                            yaxis: {
                                show: true,
                            },
                            xaxis: {
                                labels: {
                                    show: true,
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                                    return w.config.series[seriesIndex] + " (" + value.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 1,
                                    }) + "%)"
                                },
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    colors: ['#333']
                                },
                                background: {
                                    enabled: true,
                                    foreColor: '#fff',
                                    padding: 10,
                                },
                            },
                            legend: {
                                show: true,
                                position: 'bottom',
                                labels: {
                                    colors: "#e8e8e8",
                                    useSeriesColors: false
                                },
                            }
                        }}
                    />
                    <span className="flex justify-center mt-2  text-gray-300">Matches per character</span>
                </div>
                <div>
                    <ApexChart
                        className="sparkline-chart"
                        type={"pie"}
                        height={200}
                        series={[stats.bungieHistoricAccountStats.fireTeamActivities, stats.bungieHistoricAccountStats.activitiesEntered - stats.bungieHistoricAccountStats.fireTeamActivities]}
                        options={{
                            colors: ["#a8a8a8", "rgba(250,50,40,0.4)"],
                            chart: {
                                dropShadow: {
                                    enabled: true,
                                    blur: 1,
                                    left: 1,
                                    top: 1
                                }
                            },
                            labels: ["Team", "Solo"],
                            fill: {
                                opacity: 1,
                            },
                            stroke: {
                                show: true,
                                width: 0.5,
                                colors: [],
                                dashArray: 0
                            },
                            yaxis: {
                                show: true,
                            },
                            xaxis: {
                                labels: {
                                    show: true,
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                                    return w.config.series[seriesIndex] + " (" + value.toLocaleString(undefined, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 1,
                                    }) + "%)"
                                },
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    colors: ['#333']
                                },
                                background: {
                                    enabled: true,
                                    foreColor: '#fff',
                                    padding: 10,
                                },
                            },
                            legend: {
                                show: true,
                                position: 'bottom',
                                labels: {
                                    colors: "#e8e8e8",
                                    useSeriesColors: false
                                },
                            }
                        }}
                    />
                    <span className="flex justify-center mt-2  text-gray-300">Matches per fireteam</span>
                </div>
            </div>
            <div className="flex justify-center mt-16">
                <span className="text-gray-400 text-xl"><span className="text-gray-100 text-4xl  font-black">{(stats.performance.kills).toLocaleString()}</span> Kills / <span className="text-gray-100 text-4xl font-black">
                    {(stats.performance.matches).toLocaleString()}</span> Matches</span>
            </div>
            <div className="">
                <div className="">
                    <div className=" text-gray-300 text-xl flex flex-wrap space-x-10 justify-evenly">
                        <table className="flex w-[400px] mt-14">
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Playtime
                                    </td>
                                    <td className="text-gray-200 text-2xl">
                                        {formatSeconds(stats.performance.timeSpent)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        First played
                                    </td>
                                    <td className="text-gray-200 text-2xl">
                                        {new Date(Object.values(stats.matchHistory).reduce((a, b) => {
                                            if (a.date < b.date && a.date != 0) {
                                                return a
                                            } else {
                                                return b
                                            }
                                        }, { date: 0 }).date).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Last played
                                    </td>
                                    <td className="text-gray-200 text-2xl">
                                        {new Date(Object.values(stats.matchHistory).reduce((a, b) => {
                                            if (a.date > b.date) {
                                                return a
                                            } else {
                                                return b
                                            }
                                        }, { date: 0 }).date).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="flex align-top w-[400px] mt-14">
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Opponents defeated:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {(stats.performance.kills + stats.performance.assists).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({((stats.performance.kills + stats.performance.assists) / (stats.performance.matches == 0 ? 1 : stats.performance.matches)).toLocaleString(undefined, {
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
                                        {stats.performance.kills.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({(stats.performance.kills / stats.performance.matches).toLocaleString(undefined, {
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
                                        {stats.performance.deaths.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                        }
                                        <span className="text-gray-300 text-lg ml-1">({(stats.performance.deaths / stats.performance.matches).toLocaleString(undefined, {
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
                                        {stats.performance.assists.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-300 text-lg ml-1">({(stats.performance.assists / stats.performance.matches).toLocaleString(undefined, {
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
                                        {((stats.bungieHistoricAccountStats.kills || 0) - ((stats.bungieHistoricAccountStats.weaponKills.weaponKillsRelic || 0) + truelyStrangeKills)).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Misadventures:
                                    </td>
                                    <td className="text-gray-100 text-2xl">
                                        {stats.bungieHistoricAccountStats.suicides}
                                    </td>
                                </tr>
                                {truelyStrangeKills == 0 ? "" :
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
                            </tbody>
                        </table>
                        <table className="flex w-[400px] mt-14">
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Gold Medals
                                    </td>
                                    <td className="text-gray-200 text-2xl">
                                        {stats.bungieHistoricAccountStats.medals.totalGold.toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Medals
                                    </td>
                                    <td className="text-gray-200 text-2xl">
                                        {stats.bungieHistoricAccountStats.medals.total.toLocaleString()}
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
                                        {stats.bungieHistoricAccountStats.orbsDropped.toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-gray-300 text-lg ml-1">({(stats.bungieHistoricAccountStats.orbsDropped / stats.bungieHistoricAccountStats.activitiesEntered).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 1,
                                        })} pga)
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-14 2xl:mt-14">
                    <span className=" flex justify-center text-gray-200 text-3xl 2xl:text-2xl font-semibold">Team Scorched Achievements</span>
                    <div className="flex flex-wrap justify-evenly space-y-2 mt-5">
                        {awardKeys.map((award) => {
                            return stats.awards[award] ? (
                                <div key={"award_" + award} className="flex items-center w-[500px] ml-2">
                                    <a
                                        data-tooltip-id={award + "_tooltip2"}
                                        data-tooltip-html={hoverText(award)}
                                        className={"min-w-[58px]"}
                                    >
                                        <div style={{
                                            marginTop: "30px", marginLeft: "30px",
                                            boxShadow: awards[award].glow == "shadow-awardGlow" ? "0px 0px 30px 15px rgba(240,217,170,0.8)" :
                                                (awards[award].glow == "shadow-awardGlowRed" ? "0px 0px 30px 15px rgba(212,47,47,0.9)" : "")
                                        }} className={awards[award].glow + "-large absolute rotate-45"}></div>
                                        <img src={awards[award].src} key={"img_" + award} width={"58px"} height={"58px"} className="flex-none" />
                                    </a>
                                    <Tooltip id={award + "_tooltip2"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                                    <div className="pl-3 text-gray-100 text-xl font-light flex">
                                        {awards[award].text}
                                    </div>
                                </div>
                            ) : ""
                        })}
                    </div>
                    {emblemLength > 0 ? "" :
                        <span className="w-full flex justify-center text-gray-400 font-light">
                            Time to play more Team Scorched
                        </span>}
                </div>

            </div>
        </div>
    )
}