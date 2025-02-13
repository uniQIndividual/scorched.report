import React from "react";
import * as fzstd from 'fzstd';
import { LoadingAnimationWithTitle } from "../LoadingAnimation";
import ReactApexChart from "react-apexcharts";

export const EloDistribution = () => {

  const [render, triggerRender] = React.useState(false);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    (async () => {
      await fetch('/data/science/elo_distribution.json.zst').then(
        res => {
          if (res.status == 200) {
            return res.arrayBuffer()
          } else {
            return new ArrayBuffer(0)
          }
        }
      ).then(async (compressedBuf) => {
        try {
          if (compressedBuf.byteLength != 0) {
            const compressed = new Uint8Array(compressedBuf)
            const out = new TextDecoder().decode(fzstd.decompress(compressed));

            let old_json = JSON.parse(out);

            let total_entries = Object.values(old_json).reduce((sum, current) => sum + current, 0)

            setState({
              series: [{
                name: 'Elo Distribution',
                data: Object.values(old_json),
                color: '#c73b3b'
              }],
              options: {
                chart: {
                  height: 500,
                  type: 'bar',
                },
                plotOptions: {
                  bar: {
                    borderRadius: 0,
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },/*
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 10000000,
                            color: '#c73b3b'
                        }],
                      }*/
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val;
                  },
                  offsetY: -20,
                  style: {
                    fontSize: '12px',
                    colors: ["#7a7f96"]
                  }
                },

                xaxis: {
                  categories: Object.keys(old_json).map(rank => rank + " - " + (Number(rank) + 100 )),
                  position: 'top',
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  crosshairs: {
                    fill: {
                      type: 'gradient',
                      gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      }
                    }
                  },
                  tooltip: {
                    theme: "dark",
                    enabled: true,
                  },
                  labels: {
                    style: {
                      colors: '#7a7f96',
                    },
                  }
                },
                tooltip: {
                  theme: "dark",
                  followCursor: true,
                  intersect: false,
                },
                yaxis: {
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    style: {
                      colors: '#7a7f96',
                    },
                    show: false,
                    formatter: function (val) {
                      return val + " Scorchers (" + (val * 100 / total_entries).toFixed(3) + "%)";
                    }
                  }

                },
                responsive: [
                  {
                    breakpoint: 1000,
                    options: {
                      chart: {
                        height: 1050,
                      },
                      plotOptions: {
                        bar: {
                          horizontal: true
                        }
                      },
                      legend: {
                        position: "bottom"
                      },
                      xaxis: {
                        show: false,
                        labels: {
                          style: {
                            colors: '#7a7f96',
                          },
                          show: false,
                          formatter: function (val) {
                            return val + " Scorchers";
                          }
                        }
                      },
                      yaxis: {
                        show: true,
                        labels: {
                          style: {
                            colors: '#7a7f96',
                          },
                        }
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                          return val + " (" + (val * 100 / total_entries).toFixed(3) + "%)";
                        },
                        offsetY: +0,
                        style: {
                          fontSize: '12px',
                          colors: ["#7a7f96"]
                        }
                      },
                    }
                  }
                ]
              }


            })

            triggerRender(true);
          }
        } catch {

        }
      });
    })()

  }, []);


  return render ? (<div className=''>
    <div className=" mb-10 mt-6 lg:mr-4">
      <ReactApexChart options={state.options} series={state.series} type="bar" width={"100%"} />
    </div>
  </div>) :
    <>
      <div className="flex mt-10 mb-28 justify-center">
        <LoadingAnimationWithTitle title="Loading Data..." />
      </div>
    </>;
}
