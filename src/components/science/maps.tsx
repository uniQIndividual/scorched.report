import ReactApexChart from "react-apexcharts";
import { mapRankings } from "../../lib/mapRankings";
import type { string } from "astro:schema";
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

    const numberToTier = (value:number) => {
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
                }
            }
        })
    });


    console.log(newMapRankings);

    const series = [
        {
            data: Object.keys(newMapRankings).map(map => {
                return ({
                    x: map,
                    y: newMapRankings[map].rankings
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
            colors: ['#ddd']
        },
        grid: {
            show: true,
            borderColor: '#555',
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '26px',
                },
                formatter: (value: number) => {
                    console.log(value);
                    
                    return numberToTier(value)
                },
                offsetY: 10,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff',
                    fontSize: '20px',
                }
            }
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
            <div className="text-lg text-gray-400 flex justify-center mt-20 mb-20  font-light">This data is based on individuals ratings by {Object.values(newMapRankings)[0].rankings.length} Scorchers.</div>
            <div className="flex justify-center mt-20 mb-12 text-black">
                <div className="table border-spacing-2">
                    {Object.keys(tiers).map(tier => {
                        return(
                    <div className="table-row-group">
                        <div className="table-row">
                            <div className="table-cell align-middle w-32 py-3 px-6" style={{backgroundColor: tiers[tier]}}>
                                <div className="px-14">
                                    {numberToTier(Number(tier))}
                                </div>
                            </div>
                            <div className="table-cell w-full ">
                                <div className="flex flex-wrap">
                                {Object.values(newMapRankings).map(map => {
                                    if(map.tier == tier)
                                    return <img key={map.image + "image"} src={"https://www.bungie.net" + map.image} className="h-36" />
                                })}
                                </div>
                            </div>
                        </div>
                    </div>)
                    })}
                </div>
            </div>
            <div className="flex justify-center">
                <ReactApexChart options={options} series={series} type="boxPlot" width={"1200"} height={1000} />
            </div>
        </div>
    );
}