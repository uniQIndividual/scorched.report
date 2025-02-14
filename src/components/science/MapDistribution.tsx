import React from "react";
import * as fzstd from 'fzstd';
import { LoadingAnimationWithTitle } from "../LoadingAnimation";
import { seasons } from "../../lib/seasons";
import ReactApexChart from "react-apexcharts";
import { DatabaseMiddleware } from "../../lib/IndexedDB";

export const MapDistribution = () => {

  const [render, triggerRender] = React.useState(false);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    (async () => {
      await fetch('/data/science/map_occurrence.json.zst').then(
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

            const definitionsDB = new DatabaseMiddleware({
              databaseName: "DestinyActivityDefinition",
              storeName: "Entries",
              version: 1,
            });
            await definitionsDB.initializeDefinitionsDatabase();

            let destinyActivityDefinition = await definitionsDB.getValue("DestinyActivityDefinition");


            let mapsNames = new Set();
            let mapsNamesArray = [];
            let seriesHash = {};

            Object.values(old_json).map(day_entries => Object.keys(day_entries.entries).map(map_entry => mapsNames.add(destinyActivityDefinition[map_entry].name)));

            mapsNames.forEach(
              (map) => {
                mapsNamesArray.push(map);
                seriesHash[map] = {
                  "name": map,
                  "data": []
                }
              })

            mapsNamesArray = mapsNamesArray.sort(function (a, b) {
              var nameA = a.toLowerCase(), nameB = b.toLowerCase();
              if (nameA < nameB) //sort string ascending
                return -1;
              if (nameA > nameB)
                return 1;
              return 0; //default return value (no sorting)
            });

            let seasonBarOffset = [];
            Object.keys(seasons).map(i => seasonBarOffset.push(0))


            mapsNamesArray.map((map, i) => {
              Object.values(seasons).map((season, season_index) => {
                if (season_index > -1) {
                  let buffer = 0;
                  let total_matches_per_season = 0;
                  Object.keys(old_json).map(day => {
                    const element = old_json[day];
                    if (Date.parse(season.start) < Number(day) * 1000 && Date.parse(season.end) > Number(day) * 1000) {

                      Object.keys(element.entries).map((day_map => {
                        total_matches_per_season += element.entries[day_map]
                        if (destinyActivityDefinition[day_map].name == map) {
                          buffer += element.entries[day_map];
                        }
                      }))
                    }
                  })

                  if (total_matches_per_season == 0) {
                    total_matches_per_season++;
                  }
                  let newOffset = seasonBarOffset[season_index] + buffer * 100 / total_matches_per_season;
                  seriesHash[map.toString()].data.push({
                    x: season.name,
                    y: buffer == 0 ? [null, null] : [seasonBarOffset[season_index], newOffset],
                  });
                  seasonBarOffset[season_index] = newOffset;
                }
              })
            })





            setState({

              series: Object.values(seriesHash).sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                  return -1;
                if (nameA > nameB)
                  return 1;
                return 0; //default return value (no sorting)
              }),
              options: {
                chart: {
                  type: 'rangeBar',
                  height: 2000,
                  zoom: {
                    enabled: false
                  },
                  animations: {
                    enabled: false
                  }
                },
                plotOptions: {
                  bar: {
                    barHeight: '100%',
                    borderRadius: 0,
                    rangeBarGroupRows: true,
                    horizontal: true,
                  },
                },
                tooltip: {
                  theme: "dark",
                  followCursor: true,
                  intersect: false,
                  custom: function (opts) {
                    const fromYear = opts.y2 - opts.y1;

                    const w = opts.ctx.w
                    let ylabel = ""
                    if (w.config.series[opts.seriesIndex].data && w.config.series[opts.seriesIndex].data[opts.dataPointIndex]) {
                      ylabel = w.config.series[opts.seriesIndex].data[opts.dataPointIndex].x;
                    }
                    let seriesName = w.config.series[opts.seriesIndex].name
                      ? w.config.series[opts.seriesIndex].name
                      : ''
                    const color = w.globals.colors[opts.seriesIndex]

                    return (
                      '<div class="apexcharts-tooltip-rangebar !bg-gray-920">' +
                      '<div> <span class="series-name" style="color: ' +
                      color +
                      '">' +
                      (seriesName ? seriesName : '') +
                      '</span></div>' +
                      '<div> <span class="category">' +
                      ylabel +
                      ': </span> <span class="text-gray-100">' +
                      fromYear +
                      '%</span></div>' +
                      '</div>'
                    )
                  }
                },
                dataLabels: {
                  background: {
                    enabled: true,
                  },
                  formatter(val, opts) {
                    const seriesName = opts.w.config.series[opts.seriesIndex].name
                    return val !== null ? seriesName : ''
                  },
                },
                yaxis: {
                  show: true,
                  labels: {
                    style: {
                      colors: Object.keys(seasons).map(i => '#7a7f96'),
                    },
                  },
                },
                xaxis: {
                  position: 'bottom',
                  min: 0,
                  max: 100,
                  labels: {
                    show: true,
                    formatter: (value) => { return value + "%" },
                    style: {
                      colors: ['#7a7f96'],
                    },
                  },
                },
                colors: ['#b7a726', '#9d44c8', '#4b78f9', '#e4fc96', '#f37562', '#603e12', '#8ecccb', '#57120f', '#ca98aa', '#6b7c12', '#a76828', '#851112', '#52a1c9', '#f95a3e', '#cc6fcf', '#96ac84', '#70f7ba', '#3b5e34'],
                legend: {
                  show: true,
                  position: 'top',
                  horizontalAlign: 'left',
                  labels: {
                    colors: '#7a7f96',
                  },
                },
              },


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
      <ReactApexChart options={state.options} series={state.series} type="rangeBar" height={"2000px"} width={"100%"} />
    </div>
  </div>) :
    <>
      <div className="flex mt-10 mb-28 justify-center">
        <LoadingAnimationWithTitle title="Loading Data..." />
      </div>
    </>;
}
