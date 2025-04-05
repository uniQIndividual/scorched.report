import { type Scorcher } from "../../lib/entities";
import ApexChart from "react-apexcharts";

const textColor = '#e3e4ea';

interface RadarInterface {
    stats: Scorcher,
    context: ("total" | "character")
}

export const Radar = (props: RadarInterface) => {
    type calculateNormalizedStatsType = {
        trueSkill: number,
        kills: number,
        totalGold: number,
        matches: number,
        wins: number,
        deaths: number,
        timeSpent: number,
        useCombatRating: boolean
    }

    const stats = props.stats;
    const context = props.context;

    // A method to turn arbitrary stats into other arbitrary stats but they're normalized
    function calculateNormalizedStats({ trueSkill, kills, totalGold, matches, wins, deaths, timeSpent, useCombatRating }: calculateNormalizedStatsType) {
        return [
            useCombatRating ?
                Math.min(Math.max(trueSkill / 3, 0), 100).toFixed(0)
                : Math.min(Math.max(trueSkill / 20, 0), 100).toFixed(0), // Elo 50%:= 1000
            Math.min(Math.max(kills / 500, 0), 100).toFixed(0), // Experience' 50%:= 25000
            //Math.min(Math.max(stats.medals.totalGold / 10, 0), 100).toFixed(0), // Gold Medals': 0,
            Math.min(Math.max(wins * 100 / matches, 0), 100).toFixed(0), // Win Ratio 50%:=50
            Math.min(Math.max((Math.log((kills / deaths) * 3 + 1) * 0.3607) * 100, 0), 100).toFixed(0), // Performance simply: f(x)=log(ℯ,x*ρ+ϕ)*τ with ℯ=2,718... ρ=3 ϕ=1 τ=0.3607
            Math.min(Math.max((kills / (timeSpent / 60)) * 20, 0), 100).toFixed(0), // Aggressiveness 50%:= 2.5 100%:=5 (around 30 per match)
        ]
    };

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
                return "rgba(155, 53, 41,0.6)"
            case 1:
                return "rgba(69, 112, 121,0.6)"
            case 2:
                return "rgba(175, 135, 37,0.6)"
            default:
                return "Unknown"
        }
    }
    if (stats.bungieHistoricAccountStats.activitiesEntered < 10) {
        return <div>Not enough matches</div>
    }
    return context == "total" ? (
        <div className="sm:w-[500px]">
            <ApexChart
                width={"100%"}
                series={[{
                    name: "Overall Performance",
                    data: calculateNormalizedStats({
                        trueSkill: stats.performance.trueSkill,
                        kills: stats.performance.kills,
                        totalGold: stats.bungieHistoricAccountStats.medals.totalGold,
                        matches: stats.performance.matches,
                        wins: stats.performance.wins,
                        deaths: stats.performance.deaths,
                        timeSpent: stats.performance.timeSpent,
                        useCombatRating: false
                    }),
                    color: "rgba(250,50,40,0.3)",
                } /*,
                {
                    name: "Solo Performance",
                    hidden: true,
                    data: calculateNormalizedStats({
                        trueSkill: stats.soloPerformance.trueSkill,
                        kills: stats.soloPerformance.kills,
                        totalGold: stats.bungieHistoricAccountStats.medals.totalGold,
                        matches: stats.soloPerformance.matches,
                        wins: stats.soloPerformance.wins,
                        deaths: stats.soloPerformance.deaths,
                        timeSpent: stats.soloPerformance.timeSpent,
                        useCombatRating: false
                    }) || [0, 0, 0, 0, 0],
                    color: "#FF9800",
                }*/]}
                options={{
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                plotOptions: {
                                    radar: {
                                        size: '50',
                                        offsetX: 0,
                                    }
                                },
                                xaxis: {
                                    labels: {
                                        show: true,
                                        offsetY: 0,
                                        style: {
                                            colors: ['#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba'],
                                            fontSize: "12px",
                                            fontFamily: 'Arial'
                                        }
                                    }
                                },
                            }
                        }],
                    chart: {
                        type: 'radar',
                        dropShadow: {
                            enabled: true,
                            blur: 1,
                            left: 1,
                            top: 1
                        },
                        toolbar: {
                            show: true,
                            tools: {
                                download: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                            },
                        }
                    },
                    plotOptions: {
                        radar: {
                            size: '120',
                            offsetX: 0,
                            offsetY: 0,
                            polygons: {
                                strokeColors: '#a8a8a8',
                                strokeWidth: 1,
                                connectorColors: 'rgba(0,0,0,0)',
                            }
                        }
                    },
                    labels: ["Rating", 'Experience', 'Win Ratio', 'Performance', 'Aggressiveness'],
                    fill: {
                        colors: ["#fff"],
                        opacity: 0.5,
                    },
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ["#e8e8e8"],
                        dashArray: 0
                    },
                    markers: {
                        size: 3,
                        colors: ['#e8e8e8'],
                        hover: {
                            size: 8
                        }
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        labels: {
                            show: true,
                            offsetY: 0,
                            style: {
                                colors: ['#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba'],
                                fontSize: "16px",
                                fontFamily: 'Arial'
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        style: {
                        },
                        background: {
                            enabled: true,
                            foreColor: '#fff',
                        },
                    },
                    legend: {
                        show: true,
                        labels: {
                            colors: textColor,
                            useSeriesColors: false
                        },
                        itemMargin: {
                            horizontal: 5,
                            vertical: 0
                        },
                    },

                }}
                type={"radar"}
            />
        </div>
    ) : (
        <div className="block flex-none w-[100%]">
            {Object.keys(stats.bungieHistoricStats).length > 0 ? <>
                <ApexChart
                    height={350}
                    series={[].concat(Object.keys(stats.bungieHistoricStats).map((charater, i) => {
                        return {
                            name: characterClassToString(stats.characters[charater]?.classType || ""),
                            data: calculateNormalizedStats({
                                trueSkill: stats.bungieHistoricStats[charater]?.combatRating || 100,
                                kills: stats.bungieHistoricStats[charater]?.kills || 0,
                                totalGold: stats.bungieHistoricAccountStats.medals.totalGold,
                                matches: stats.bungieHistoricStats[charater]?.activitiesEntered || 0,
                                wins: stats.bungieHistoricStats[charater]?.activitiesWon || 0,
                                deaths: stats.bungieHistoricStats[charater]?.deaths || 0,
                                timeSpent: stats.bungieHistoricStats[charater]?.secondsPlayed || 0,
                                useCombatRating: true
                            }),
                            color: characterClassToColor(stats.characters[charater].classType),
                        }
                    }))
                    }
                    options={{
                        responsive: [
                            {
                                breakpoint: 1000,
                                options: {
                                    plotOptions: {
                                        radar: {
                                            size: '50',
                                            offsetX: 0,
                                        }
                                    },
                                    xaxis: {
                                        labels: {
                                            show: true,
                                            offsetY: 0,
                                            style: {
                                                colors: ['#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba'],
                                                fontSize: "10px",
                                                fontFamily: 'Arial'
                                            }
                                        }
                                    },
                                }
                            }],
                        chart: {
                            type: 'radar',
                            dropShadow: {
                                enabled: true,
                                blur: 1,
                                left: 1,
                                top: 1
                            },
                            toolbar: {
                                show: true,
                                tools: {
                                    download: true,
                                    zoom: true,
                                    zoomin: true,
                                    zoomout: true,
                                    pan: true,
                                    reset: true,
                                },
                            }
                        },
                        plotOptions: {
                            radar: {
                                size: '130',
                                offsetX: 30,
                                offsetY: 20,
                                polygons: {
                                    strokeColors: '#a8a8a8',
                                    strokeWidth: 1,
                                    connectorColors: 'rgba(0,0,0,0)',
                                }
                            }
                        },
                        labels: ["Bungie's Combat Rating", 'Experience', 'Win Ratio', 'Performance', 'Aggressiveness'],
                        fill: {
                            colors: ["#fff"],
                            opacity: 0.5,
                        },
                        stroke: {
                            show: true,
                            width: 1,
                            colors: ["#e8e8e8"],
                            dashArray: 0
                        },
                        markers: {
                            size: 3,
                            colors: ['#e8e8e8'],
                            hover: {
                                size: 8
                            }
                        },
                        yaxis: {
                            show: false,
                            min: 0,
                            max: 100,
                            tickAmount: 4,
                            labels: {
                                show: true,
                                minWidth: 0,
                                maxWidth: 160,
                                style: {
                                    colors: "#a8a8a8",
                                    fontSize: '12px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 400,
                                    cssClass: 'apexcharts-yaxis-label',
                                },
                            },

                        },
                        xaxis: {
                            labels: {
                                show: true,
                                offsetY: 2,
                                style: {
                                    colors: ['#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba', '#a6aaba'],
                                    fontSize: "14px",
                                    fontFamily: 'Arial'
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            style: {
                            },
                            background: {
                                enabled: true,
                                foreColor: '#fff',
                            },
                        },
                        legend: {
                            show: true,
                            labels: {
                                colors: textColor,
                                useSeriesColors: false
                            },
                            itemMargin: {
                                horizontal: 5,
                                vertical: 0
                            },
                        },
                        subtitle: {
                            text: "Characters",
                            align: 'center',
                            margin: 0,
                            offsetX: 0,
                            offsetY: 0,
                            floating: false,
                            style: {
                                fontSize: '26px',
                                fontWeight: 'normal',
                                color: '#f4f5f7'
                            },
                        }

                    }}
                    type={"radar"}
                />
            </>
                : <></>
            }
        </div>
    )
}