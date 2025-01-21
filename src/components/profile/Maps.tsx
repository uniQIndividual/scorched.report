import React from "react";
import { type DestinyActivityDefinitionType, type Scorcher } from "../../pages/entities";
import ReactApexChart from "react-apexcharts";


interface MatchHistoryInterface {
    stats: Scorcher,
    DestinyActivityDefinition: DestinyActivityDefinitionType
}


export const Maps = (props: MatchHistoryInterface) => {
    const { stats, DestinyActivityDefinition } = props;
    if (Object.keys(stats.matchHistory).length == 0) {
        return <></>;
    }

    let mapGroups = Object.groupBy(Object.values(stats.matchHistory), ({ map }) => map)
    let mapStats = Object.keys(mapGroups).map(map => {
        return {
            "name": DestinyActivityDefinition.hasOwnProperty(map) ? DestinyActivityDefinition[map]?.name : "",
            "kills": mapGroups[map]!.reduce((partialSum, a) => partialSum + a.kills, 0),
            "deaths": mapGroups[map]!.reduce((partialSum, a) => partialSum + a.deaths, 0),
            "time": mapGroups[map]!.reduce((partialSum, a) => partialSum + a.time, 0),
            "matches": mapGroups[map]!.length,
        }
    }).sort(function(a, b){
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default return value (no sorting)
       });



    const mostPlayed = mapStats.reduce((a, b) => (b.matches > a.matches ? b : a));

    const state = {
        series: [{
            name: 'Matches',
            type: 'column',
            data: mapStats.map(map => map.matches)
        }, {
            name: 'Kills per match',
            type: 'column',
            data: mapStats.map(map => (map.kills / (map.matches == 0 ? 1 : map.matches)).toFixed(2))
        }, {
            name: 'K/D',
            type: 'column',
            data: mapStats.map(map => (map.kills / (map.deaths == 0 ? 1 : map.deaths)).toFixed(2))
        }, {
            name: 'KPM',
            type: 'column',
            data: mapStats.map(map => (map.kills / (Number(map.time) == 0 ? Math.max() : Number(map.time) / 60)).toFixed(2))
        }],
        options: {
            chart: {
                type: 'line',
                stacked: false,
                toolbar: {
                  show: true,
                  offsetX: 0,
                  offsetY: -50,
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            colors: ['#baf046', '#deb140', '#cc4c3b', '#ba3676'],

            xaxis: {
                categories: mapStats.map(map => map.name),
                labels: {
                    style: {
                        colors: "#CACCD7",
                        fontSize: '18px',
                    }
                }
            },
            legend: {
                horizontalAlign: 'left',
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
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    barHeight: '10%',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            color: undefined
                        }],
                        backgroundBarColors: ["#000"],
                        backgroundBarOpacity: 0.5,
                        backgroundBarRadius: 0,
                    },
                }
            },
            stroke: {
                width: [0, 0, 0, 0]
            },
            yaxis: [
                {
                    seriesName: 'Matches',
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#baf046'
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                        },
                        style: {
                            colors: '#baf046',
                            fontSize: '18px',
                        }
                    },
                    title: {
                        text: "Matches",
                        style: {
                            color: '#baf046',
                            fontSize: '22px',
                            fontWeight: 300,
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Kills per match',
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#deb140'
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });
                        },
                        style: {
                            fontSize: '18px',
                            colors: '#deb140',
                        }
                    },
                    title: {
                        text: "Kills per match",
                        style: {
                            color: '#deb140',
                            fontSize: '22px',
                            fontWeight: 300,
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'K/D',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#cc4c3b',
                        offsetX: -5,
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 1,
                            });
                        },
                        style: {
                            fontSize: '18px',
                            colors: '#cc4c3b',
                        }
                    },
                    title: {
                        text: "K/D",
                        style: {
                            color: '#cc4c3b',
                            fontSize: '22px',
                            fontWeight: 300,
                        }
                    },
                },
                {
                    seriesName: 'KPM',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#ba3676'
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 1,
                            });
                        },
                        style: {
                            fontSize: '18px',
                            colors: '#ba3676',
                        },
                    },
                    title: {
                        text: "KPM (Kills per minute)",
                        style: {
                            color: '#ba3676',
                            fontSize: '22px',
                            fontWeight: 300,
                        }
                    }
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
            },
        },


        selection: 'all',

    };



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
            <div className="text-4xl text-gray-100 flex justify-center mt-2 font-semibold">Maps</div>


            <div>

                <ReactApexChart options={state.options} series={state.series} type="line" height={700} width={"100%"} />
                <div id="html-dist"></div>
            </div>

            <div className="flex justify-center mt-6 mb-10">
                <span className="text-gray-400 text-xl"><span className="text-gray-100 text-3xl  font-black">{mostPlayed.name}</span> was played <span className="text-gray-100 text-3xl font-black">
                    {mostPlayed.matches}</span> times with <span className="text-gray-100 text-3xl  font-black">{mostPlayed.kills}</span> kills</span>
            </div>
        </div>
    )

}