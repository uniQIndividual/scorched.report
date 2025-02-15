import ReactApexChart from "react-apexcharts";
import { mapRankings } from "../../lib/mapRankings";
import update from 'immutability-helper';

export const MapScience = () => {

    let newMapRankings = mapRankings;

    const tierToNumber = (tier: string) => {
        switch (tier) {
            case "S":
                return 1
            case "A":
                return 2
            case "B":
                return 3
            case "C":
                return 4
            case "D":
                return 5
            case "F":
                return 6
            default:
                return 0
        }
    };

    const numberToTier = (value: number) => {
        switch (value) {
            case 1:
                return "S"
            case 2:
                return "A"
            case 3:
                return "B"
            case 4:
                return "C"
            case 5:
                return "D"
            case 6:
                return "F"
            default:
                return ""
        }
    };

    function medianof2Arr(arr1) {
        var concat = arr1;
        concat = concat.sort(
            function (a, b) { return a - b });
        var length = concat.length;
        if (length % 2 == 1) {
            return concat[(length / 2) - .5]
        }
        else {
            return (arr1.reduce((a, b) => a + b) / arr1.length < concat[(length / 2) - .5]) ? concat[(length / 2) - 1] : concat[length / 2]
        }
    }

    function quantile(arr, q) {
        const sorted = arr.sort((a, b) => a - b);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    // Edit rankings
    Object.keys(newMapRankings).map(map => {
        newMapRankings = update(newMapRankings, {
            [map]: {
                rankings: {
                    $set: newMapRankings[map].rankings.map((rank: string) => {
                        return tierToNumber(rank);
                    })
                }
            }
        })
    });
    Object.keys(newMapRankings).map(map => {
        newMapRankings = update(newMapRankings, {
            [map]: {
                tier: {
                    $set: medianof2Arr(newMapRankings[map].rankings)
                },
                box_plot: { // [min, q1, median, q3, max]
                    $set: [
                        Math.min(...newMapRankings[map].rankings),
                        Math.round(quantile(newMapRankings[map].rankings, .25)),
                        medianof2Arr(newMapRankings[map].rankings),
                        Math.round(quantile(newMapRankings[map].rankings, .75)),
                        Math.max(...newMapRankings[map].rankings)
                    ]
                }
            }
        })
    });


    const series = [
        {
            data: Object.keys(newMapRankings).map(map => {
                return ({
                    x: map,
                    y: newMapRankings[map].box_plot
                })
            }
            )
        },
    ]

    const options = {
        chart: {
            type: 'boxPlot',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%'
            },
            boxPlot: {
                colors: {
                    upper: '#cc4c3b',
                    lower: '#cc4c3b'
                }
            }
        },
        stroke: {
            colors: ['#7a7f96']
        },
        grid: {
            show: false,
            borderColor: '#555',
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#7a7f96',
                    fontSize: '26px',
                },
                formatter: (value: number) => {
                    return numberToTier(value)
                },
                offsetY: 10,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#7a7f96',
                    fontSize: '16px',
                }
            }
        },
        tooltip: {
            theme: "dark",
            followCursor: true,
            intersect: false,

            custom: function (opts) {
                let text = "";
                opts.series.map((series, index) => {
                    let dataPointIndex = opts.dataPointIndex;
                    const w = opts.ctx.w
                    let seriesName = w.config.series[0].data[dataPointIndex].x
                        ? w.config.series[0].data[dataPointIndex].x
                        : ''
                    text +=
                        '<div class="m-2 text-gray-900 dark:text-gray-100"> <div class="text-base mb-2">' +
                        (seriesName ? seriesName : '') +
                        '</div>' +
                        '<span class="">Maximum:</span>' +
                        '<span class="ml-2 text-gray-900 dark:text-gray-100">' +
                        numberToTier(w.config.series[0].data[dataPointIndex].y[0]) +
                        '</span>' +
                        '<br />' +
                        '<span class="">Q1:</span>' +
                        '<span class="ml-2 text-gray-900 dark:text-gray-100">' +
                        numberToTier(w.config.series[0].data[dataPointIndex].y[1]) +
                        '</span>' +
                        '<br />' +
                        '<span class="">Median:</span>' +
                        '<span class="ml-2 text-gray-900 dark:text-gray-100">' +
                        numberToTier(w.config.series[0].data[dataPointIndex].y[2]) +
                        '</span>' +
                        '<br />' +
                        '<span class="">Q3:</span>' +
                        '<span class="ml-2 text-gray-900 dark:text-gray-100">' +
                        numberToTier(w.config.series[0].data[dataPointIndex].y[3]) +
                        '</span>' +
                        '<br />' +
                        '<span class="">Minimum:</span>' +
                        '<span class="ml-2 text-gray-900 dark:text-gray-100">' +
                        numberToTier(w.config.series[0].data[dataPointIndex].y[4]) +
                        '</span>' +
                        '</div>';
                })

                return (
                    '<div class="apexcharts-tooltip-rangebar bg-gray-100 dark:!bg-gray-920">' + text +
                    '</div>'
                )
            },
        },
    }

    const tiers = {
        1: "rgb(255,127,127)",
        2: "rgb(255,191,127)",
        3: "rgb(255,223,127)",
        4: "rgb(255,255,127)",
        5: "rgb(191,255,127)",
        6: "rgb(127,255,127)",
    }


    return (
        <div>
            <div className="text-lg text-gray-400 flex justify-center text-center mx-2 mt-20 font-light">The current crucible maps as ranked by {Object.values(newMapRankings)[0].rankings.length} Scorchers</div>
            <div className="flex justify-center mt-4 mb-12 text-black">
                <div className="table border-spacing-2">
                    {Object.keys(tiers).map(tier => {
                        return (
                            <div className="table-row-group" key={"tierlist_div_tier_" + tier}>
                                <div className="table-row">
                                    <div className="table-cell align-middle w-32 py-3 px-6" style={{ backgroundColor: tiers[tier] }}>
                                        <div className="px-14">
                                            {numberToTier(Number(tier))}
                                        </div>
                                    </div>
                                    <div className="table-cell w-full ">
                                        <div className="flex flex-wrap space-x-1 space-y-1">
                                            {Object.values(newMapRankings).map(map => {
                                                if (map.tier == tier)
                                                    return <img key={map.image + "image"} src={"https://www.bungie.net" + map.image} className="max-h-20 object-scale-down" />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <div className="">

                <div className="max-w-[1000px] m-auto">
                    <ReactApexChart options={options} series={series} type="boxPlot" width={"100%"} height={1000} />
                </div>
            </div>
        </div>
    );
}