import { useMemo } from "react";
import React from "react";
import * as fzstd from 'fzstd';
import { MantineProvider } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { LoadingAnimationWithTitle } from "../../components/LoadingAnimation";
import { seasons } from "../../lib/seasons";
import ReactApexChart from "react-apexcharts";

export const Science_Activity = () => {

  type tableEntry = {
    [day: number]: number
  }

  const [data, setData] = React.useState({});
  const [render, triggerRender] = React.useState(false);

  function formatSeconds(duration: number) {
    var date = new Date(duration * 1000);
    var hh = Math.floor(duration / 3600);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
  }

  let rollingElo = 1000;
  let lastElo = 1000;
  let lastEloSolo = 1000;
  let rollingEloSolo = 1000;

  const [state, setState] = React.useState({

  });

  React.useEffect(() => {
    (async () => {
      await fetch('/data/science/activity_timeline.json.zst').then(
        res => {
          if (res.status == 200) {
            return res.arrayBuffer()
          } else {
            return new ArrayBuffer(0)
          }
        }
      ).then((compressedBuf) => {
        try {
          if (compressedBuf.byteLength != 0) { // No local DB, skip forward
            const compressed = new Uint8Array(compressedBuf)
            const out = new TextDecoder().decode(fzstd.decompress(compressed));

            let json = JSON.parse(out);
            console.log(json);

            setData(json);

            setState({
              series: [
                {
                  name: 'Daily Active Players',
                  data: Object.keys(json).map((day, i) => {
                    return [Number(day) * 1000, json[day]]
                  }).sort((a, b) => a[0] - b[0]),
                },
              ],
              options: {
                chart: {
                  id: 'area-datetime',
                  type: 'area',
                  toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: -50,
                  },
                  zoom: {
                    autoScaleYaxis: true
                  }
                },
                annotations: {
                  xaxis: [].concat(seasons.map((season, index) => {
                    return {
                      x: new Date(season.start).getTime(),
                      x2: new Date(season.end).getTime(),
                      fillColor: index % 2 == 1 ? "#742828" : "#999",
                      opacity: 0.2,
                      label: {
                        borderColor: "#999",
                        orientation: 'horizontal',
                        style: {
                          fontSize: "11px",
                          color: "#fff",
                          background: index % 2 == 1 ? "#742828" : "#222",
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
                      colors: "#7a7f96",
                      fontSize: '18px',
                    }
                  }
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: "#7a7f96",
                      fontSize: '18px',
                    }
                  },
                  title: {
                    text: "Daily active players in Team Scorched",
                    style: {
                      color: "#7a7f96",
                      fontSize: '18px',
                      fontWeight: 200,
                    }
                  }
                },
                stroke: {
                  curve: "stepline" // straight, smooth, monotoneCubic, stepline
                },
                tooltip: {
                  theme: "dark",
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

            })

            triggerRender(true);
          }
        } catch {

        }
      });
    })()

  }, []);


  return render ? (<div className=''>
    <div className="text-gray-100 mb-10 mt-24 lg:mr-4">
      <ReactApexChart options={state.options} series={state.series} type="area" height={"500px"} width={"100%"} />
    </div>
  </div>) :
    <>
      <div className="flex mt-10 mb-28 justify-center">
        <LoadingAnimationWithTitle title="Loading Data..." />
      </div>
    </>;
}