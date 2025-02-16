import React from "react";
import { type Scorcher } from "../../lib/entities";
import ReactApexChart from "react-apexcharts";
import { seasons } from "../../lib/seasons";

export const Performance = (stats: Scorcher) => {
    let rollingElo = 1000;
    let lastElo = 1000;
    let lastEloSolo = 1000;
    let rollingEloSolo = 1000;

    const [state, setState] = React.useState({
        series: [
            {
                name: 'Elo Overall',
                data: Object.values(stats.matchHistory).map((match, i) => {
                    if (i == 0) {
                        return [match.date, lastElo];
                    }
                    lastElo = match.elo;
                    return [match.date, match.elo]
                }).filter(elo => elo[1] != 0).sort((a, b) => a[0] - b[0]),
            },/*
            {
                name: 'Elo Solo',
                data: Object.values(stats.matchHistory).map((match, i) => {
                    if (i == 0) {
                        return [match.date, lastEloSolo];
                    }
                    lastEloSolo = match.eloSolo;
                    return [match.date, match.eloSolo]
                }).filter(elo => elo[1] != 0).sort((a, b) => a[0] - b[0]),
            }*/
        ],
        options: {
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 350,
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: -10,
                },
                zoom: {
                    autoScaleYaxis: true
                }
            },
            annotations: {
                xaxis: [/*{
                    x: new Date('14 Nov 2024').getTime(),
                    borderColor: '#999',
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: 'Team Scorched Launch',
                        offsetY: -10,
                        style: {
                            color: "#fff",
                            background: 'rgba(230,40,20,1)'
                        }
                    }
                }
                */].concat(seasons.map((season, index) => {
                    return {
                        x: new Date(season.start).getTime(),
                        x2: new Date(season.end).getTime(),
                        fillColor: index % 2 == 1 ? "#555" : "#999",
                        opacity: 0.2,
                        label: {
                            borderColor: "#999",
                            orientation: 'horizontal',
                            style: {
                                fontSize: "11px",
                                color: "#fff",
                                background: "#222",
                            },
                            offsetY: index % 2 == 1 ? -15 : 15,
                            text: "S" + index + ": " + season.name,
                            textAnchor: 'start',
                            position: 'top',
                        }
                    }
                }))
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            colors: ['rgba(250,50,40,0.6)', '#FF9800'],
            xaxis: {
                type: 'datetime',
                //min: new Date('01 Mar 2012').getTime(),
                labels: {
                    style: {
                        colors: "#CACCD7",
                        fontSize: '18px',
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#CACCD7",
                        fontSize: '18px',
                    }
                }
            },
            stroke: {
                curve: "stepline" // straight, smooth, monotoneCubic, stepline
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.31,
                    opacityFrom: 0.8,
                    opacityTo: 0.0,
                    stops: [0, 100]
                }
            },
            legend: {
                horizontalAlign: 'center',
                offsetX: 40,
                fontSize: '18px',
                labels: {
                    colors: '#e3e4ea',
                    useSeriesColors: false
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 10
                },
            },
        },


        selection: 'all',

    });



    // raw stats
    function formatSeconds(duration: number) {
        var date = new Date(duration * 1000);
        var hh = Math.floor(duration / 3600);
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
    }
    return (
        <div className="w-[80vw] lg:w-[calc(90vw-350px)]">
            <div className="text-4xl text-gray-100 flex justify-center mt-2 mb-10 font-semibold">Performance</div>


            <div>

                <ReactApexChart options={state.options} series={state.series} type="area" height={350} width={"100%"} />
                <div id="html-dist"></div>
            </div>

            <div className="flex justify-center mt-6 mb-10">
                <span className="text-gray-400 text-lg sm:text-xl"><span className="text-gray-100 text-2xl sm:text-4xl font-black">{stats.performance.trueSkill}</span> Rating / <span className="text-gray-100 text-2xl sm:text-4xl font-black">
                    {(stats.performance.kills * 60 / Math.max(stats.performance.timeSpent || 1, 1)).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</span> KPM</span>
            </div>
            <div className="mt-4 text-gray-300 text-lg sm:text-xl flex flex-wrap justify-evenly">
                <table className="flex w-[300px] justify-center">
                    <tbody>
                        <tr>
                            <td className="text-right pr-2">
                                K/D
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {(stats.performance.kills / Math.max(stats.performance.deaths || 1, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Efficiency
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {((stats.performance.kills + stats.performance.assists) / Math.max(stats.performance.deaths || 0, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                KPM
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {(stats.performance.kills * 60 / Math.max(stats.performance.timeSpent, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Combat Rating
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.combatRating.toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Peak Rating
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {Object.values(stats.matchHistory).reduce((highest, current) => highest > current.elo ? highest : current.elo, 0)}
                            </td>
                        </tr>
                        <tr>
                            <td className="h-3"></td>
                        </tr>
                    </tbody>
                </table>
                <table className="flex w-[350px] justify-center">
                    <tbody>
                        <tr>
                            <td className="text-right pr-2">
                                Win Ratio
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {((stats.performance.wins * 100) / stats.performance.matches).toFixed(0)} %
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average kill distance
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {((stats.bungieHistoricAccountStats.totalKillDistance || 0) / Math.max(stats.bungieHistoricAccountStats.kills || 1, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })} m
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Match Duration
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds(stats.performance.timeSpent / Math.max(stats.performance.matches, 1))}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Lifespan
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds(stats.bungieHistoricAccountStats.averageLifespan || 0)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Team Score
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {((stats.bungieHistoricAccountStats.teamScore || 0) / (stats.bungieHistoricAccountStats.activitiesEntered || 0)).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Avg Match Completion
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {(100 - ((stats.bungieHistoricAccountStats.remainingTimeAfterQuitSeconds || 0) * 100 / (stats.bungieHistoricAccountStats.totalActivityDurationSeconds || 1))).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })}%
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="flex w-[300px] justify-center">
                    <tbody>

                        <tr>
                            <td className="text-right pr-2">
                                Highest Kill Streak
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.longestKillSpree}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Highest Score
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.bestSingleGameScore}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Highest Kill count
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.bestSingleGameKills}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Fastest Match
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds((stats.bungieHistoricAccountStats?.fastestCompletionMs || 0) / 1000)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Longest Kill Distance
                            </td>
                            <td className="text-gray-100 text-lg sm:text-2xl">
                                {(stats.bungieHistoricAccountStats?.longestKillDistance || 0).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })} m
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}