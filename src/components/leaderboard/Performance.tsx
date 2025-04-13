import { useMemo } from "react";
import React from "react";
import * as fzstd from 'fzstd';
import { MantineProvider } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { LoadingAnimationWithTitle } from "../../components/LoadingAnimation";
import { url_data } from "../../lib/api";

export const LeaderboardPerformance = () => {

  type tableEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "kills": number,
    "assists": number,
    "deaths": number,
    "elo": number,
    "kd": number,
    "kda": number,
    "kpm": number,
    "wins": number,
    "highestKill": number,
    "highestKillMatch": String,
    "losses": number,
    "matches": number,
    "lastUpdated": number,
  }

  type sourceEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "elo": number,
    "kills": number,
    "deaths": number,
    "assists": number,
    "time": number,
    "wins": number,
    "highestKill": number,
    "highestKillMatch": String,
    "matches": number,
    "lastUpdated": number,
  }

  const initialState: tableEntry[] = [];
  const [data, setData] = React.useState(initialState);
  const [render, triggerRender] = React.useState(false);

  function formatSeconds(duration: number) {
    var date = new Date(duration * 1000);
    var hh = Math.floor(duration / 3600);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
  }

  React.useEffect(() => {
    (async () => {
      let oldData: sourceEntry[] = [
      ]

      await fetch(url_data +'/leaderboards/performance.json.zst').then(
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

            for (let i = 0; i < Object.keys(json).length && i < 1000; i++) {
              const key = Object.keys(json)[i] || "";
              oldData.push({
                "membershipID": key,
                "platform": json[key].platform,
                "displayName": json[key].name,
                "awards": "",
                "kills": json[key].kills,
                "deaths": json[key].deaths,
                "assists": json[key].assists,
                "elo": json[key].elo,
                "wins": json[key].wins,
                "matches": json[key].matches,
                "time": json[key].playtime,
                "highestKill": json[key].highest_kill,
                "highestKillMatch": json[key].highest_kill_match,
                "lastUpdated": 0,
              })

            }
            Object.keys(json).map(key => {

            })


          }
        } catch {

        }
      });

      /* const historyDB = new DatabaseMiddleware({
         databaseName: "PGCRHistory",
         storeName: "Entries",
         version: 1,
       });*/

      //await historyDB.initializeHistoryDatabase();

      let newData: tableEntry[] = [];
      // Update from indexedDB if possible
      let i = 0;
      let keys = Object.keys(oldData)
      while (i < keys.length) {
        const entry = oldData[keys[i]];
        // const updatedEntry = await historyDB.getValue(entry.membershipID);
        const updatedEntry = "";
        if (updatedEntry != undefined && updatedEntry != "") {
          const kills = Object.values(updatedEntry).reduce((sum, current) => sum + current.kills, 0);
          const deaths = Object.values(updatedEntry).reduce((sum, current) => sum + current.deaths, 0);
          const assists = Object.values(updatedEntry).reduce((sum, current) => sum + current.assists, 0);
          const playtime = Object.values(updatedEntry).reduce((sum, current) => sum + current.time, 0);
          /*newData.push(
            {
              "membershipID": entry.membershipID,
              "platform": entry.platform,
              "displayName": entry.displayName,
              "awards": entry.awards,
              "kills": kills,
              "deaths": deaths,
              "assists": assists,
              "kd": kills / (deaths == 0 ? 1 : deaths),
              "kda": (kills + assists) / (deaths == 0 ? 1 : deaths),
              "kpm": (kills) / (playtime == 0 ? 1 : playtime / 60),
              "wins": Object.values(updatedEntry).reduce((sum, current) => sum + current.won, 0),
              "matches": Object.keys(updatedEntry).length,
              "losses": Object.values(updatedEntry).reduce((sum, current) => sum - current.won, Object.keys(updatedEntry).length),
              "lastUpdated": Object.values(updatedEntry).reduce((highest, current) => highest > current.date ? highest : current.date, 0),
            });*/
        } else {
          newData.push({
            "membershipID": entry.membershipID,
            "platform": entry.platform,
            "displayName": entry.displayName,
            "awards": entry.awards,
            "kills": entry.kills,
            "deaths": entry.deaths,
            "assists": entry.assists,
            "elo": entry.elo,
            "kd": entry.kills / (entry.deaths == 0 ? 1 : entry.deaths),
            "kda": (entry.kills + entry.assists) / (entry.deaths == 0 ? 1 : entry.deaths),
            "kpm": (entry.kills) / (entry.time == 0 ? 1 : entry.time / 60),
            "wins": entry.wins,
            "matches": entry.matches,
            "highestKill": entry.highestKill,
            "highestKillMatch": entry.highestKillMatch,
            "losses": entry.matches - entry.wins,
            "lastUpdated": entry.lastUpdated,
          })
        }
        i++
      }
      await oldData.map(async (entry: sourceEntry, index) => {

      })
      newData = newData.sort(function (a, b) {
        if (a.elo > b.elo)
          return -1;
        if (a.elo < b.elo)
          return 1;
        return 0;
      });

      setData(newData);
      triggerRender(true);
    })()

  }, []);

  const columns = useMemo<MRT_ColumnDef<tableEntry>[]>(
    () => [
      {
        accessorKey: 'displayName',
        header: 'Name',
        size: 100,
        Cell: ({ cell }) => {
          return <a href={`/report?id=${cell.row.original.membershipID}&platform=${cell.row.original.platform}`} className="hover:text-black dark:hover:text-white hover:decoration-2 underline underline-offset-4 decoration-[1px]">{cell.getValue<string>()}</a>
        }
      },
      {
        accessorKey: 'elo',
        header: 'Elo',
        size: 100
      },
      {
        accessorKey: 'kills',
        header: 'Kills',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'kd',
        header: 'K/D',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2)
      },
      {
        accessorKey: 'kda',
        header: 'KDA',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2)
      },
      {
        accessorKey: 'kpm',
        header: 'KPM',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2)
      },
      {
        accessorKey: 'highestKill',
        header: 'Highest Kill Match',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => <a className="hover:text-black dark:hover:text-white hover:decoration-2 underline underline-offset-4 decoration-[1px]" href={"/pgcr?id=" + cell.row.original.highestKillMatch + "&membershipid="+ cell.row.original.membershipID}>{cell.getValue<number>()}</a>
      },
      {
        accessorKey: 'wins',
        header: 'Wins',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'losses',
        header: 'Losses',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },/*
      {
        accessorKey: 'date',
        header: 'Last Updated',
        accessorFn(originalRow) {
          return new Date(originalRow.lastUpdated)
        },
        filterVariant: 'date-range' as const,
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      },*/
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowNumbers: true,
    rowNumberMode: 'original',
    //enableColumnResizing: true,
    enableExpandAll: false, // this could easily get you rate limited I'd assume
    enableFullScreenToggle: false, // ik I'm incredibly sad as well, but it breaks too many things
    initialState: {
      density: 'xs',
      sorting: [
        {
          id: 'elo',
          desc: true
        }
      ]
    },
    mantineTableHeadCellProps: {
      className: "!bg-primary-900 !text-gray-100"
    },
    mantineTopToolbarProps: {
      className: "!bg-primary-900"
    },
    mantineTableContainerProps: {
    },
    mantineTableBodyRowProps: { //table bg / between cells
      className: "!bg-primary-900"
    },
    mantineTableBodyCellProps: {
      className: "!bg-gray-50 dark:!bg-gray-900 !text-gray-900 dark:!text-gray-300"
    },
    mantineBottomToolbarProps: {
      className: "!bg-primary-900 "
    },
    mantinePaperProps: { //empty results page
      className: "!bg-gray-50 dark:!bg-gray-900"
    },
    mantineDetailPanelProps: {
      className: "!bg-gray-50 dark:!bg-gray-900"
    },
    mantineExpandButtonProps: {
      className: "!text-gray-900 dark:!text-gray-50",
    },
  });

  return render ? (<div className=''>
    <div className="text-gray-100 flex justify-center mb-10 mt-20">
      <MantineProvider
        theme={{
          colorScheme: 'dark',
          primaryColor: "red",
          primaryShade: 9,
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
    </div>
  </div>) :
    <div className="flex mt-10 mb-28 justify-center">
      <LoadingAnimationWithTitle title="Loading Leaderboard..." />
    </div>;
}