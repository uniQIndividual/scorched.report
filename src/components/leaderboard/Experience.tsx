import { useMemo } from "react";
import React from "react";
import * as fzstd from 'fzstd';
import { MantineProvider } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { LoadingAnimationWithTitle } from "../LoadingAnimation";
import { url_data } from "../../lib/api";

export const LeaderboardExperience = () => {

  type tableEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "elo": number,
    "opponents_defeated": number,
    "start_date": number,
    "matches": number,
    "wins": number,
    "losses": number,
  }

  type sourceEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "elo": number,
    "opponents_defeated": number,
    "start_date": number,
    "wins": number,
    "matches": number,
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

      await fetch(url_data + '/leaderboards/experience.json.zst').then(
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
                "opponents_defeated": json[key].opponents_defeated,
                "elo": json[key].elo,
                "wins": json[key].wins,
                "matches": json[key].matches,
                "start_date": Number(json[key].start_date) * 1000,
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
          /*newData.push(
            {
              "membershipID": entry.membershipID,
              "platform": entry.platform,
              "displayName": entry.displayName,
              "awards": entry.awards,
              "opponents_defeated": opponents_defeated,
              "deaths": deaths,
              "assists": assists,
              "kd": opponents_defeated / (deaths == 0 ? 1 : deaths),
              "kda": (opponents_defeated + assists) / (deaths == 0 ? 1 : deaths),
              "kpm": (opponents_defeated) / (playstart_date == 0 ? 1 : playstart_date / 60),
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
            "opponents_defeated": entry.opponents_defeated,
            "elo": entry.elo,
            "wins": entry.wins,
            "matches": entry.matches,
            "losses": entry.matches - entry.wins,
            "start_date": entry.start_date
          })
        }
        i++
      }
      await oldData.map(async (entry: sourceEntry, index) => {

      })
      newData = newData.sort(function (a, b) {
        if (a.matches > b.matches)
          return -1;
        if (a.matches < b.matches)
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
          return <a href={`/report?id=${cell.row.original.membershipID}&platform=${cell.row.original.platform}`} className="hover:text-black dark:hover:text-white hover:decoration-2 underline underline-offset-4 decoration-[1px]">{cell.getValue<string>() != "#0000" ? cell.getValue<string>() : <i className="text-gray-500">{"unknown"}</i>}</a>
        }
      },
      {
        accessorKey: 'matches',
        header: 'Matches',
        size: 100
      },
      {
        accessorKey: 'opponents_defeated',
        header: 'Opponents Defeated',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
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
      },
      {
        accessorKey: 'elo',
        header: 'Elo',
        size: 100
      },
      {
        accessorKey: 'start_date',
        header: 'First Match',
        accessorFn(originalRow) {
          return new Date(originalRow.start_date)
        },
        filterVariant: 'date-range' as const,
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
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
          id: 'matches',
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