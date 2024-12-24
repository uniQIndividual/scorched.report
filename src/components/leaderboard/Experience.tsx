import { useMemo, useState } from "react";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { DatabaseMiddleware } from "../../lib/IndexedDB";

export const LeaderboardExperience = () => {

  type tableEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "kills": number,
    "timeSpent": number,
    "matches": number,
    "wins": number,
    "losses": number,
    "lastUpdated": number,
  }

  const initialState: tableEntry[] = [];
  const [data, setData] = React.useState(initialState);

  function formatSeconds(duration: number) {
    var date = new Date(duration * 1000);
    var hh = Math.floor(duration / 3600);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
}

  React.useEffect(() => {
    (async () => {
      let newData = [
        {
          "membershipID": "4611686018513396043",
          "platform": 3,
          "displayName": "uniQ#1468",
          "awards": "",
          "kills": 234,
          "timeSpent": 32423,
          "matches": 2342,
          "wins": 234,
          "lastUpdated": 123,
        },
        {
          "membershipID": "2454823095840925",
          "platform": 3,
          "displayName": "uniQ#1468",
          "awards": "",
          "kills": 2342,
          "timeSpent": 32423,
          "matches": 3,
          "wins": 3,
          "losses": 3,
          "lastUpdated": 123,
        },
      ]

      const historyDB = new DatabaseMiddleware({
        databaseName: "PGCRHistory",
        storeName: "Entries",
        version: 1,
      });

      await historyDB.initializeHistoryDatabase();

      // Update from indexedDB if possible
      newData.map(async (entry, index) => {
        const updatedEntry = await historyDB.getValue(entry.membershipID);
        if (updatedEntry != undefined) {
          newData[index] =
          {
            "membershipID": entry.membershipID,
            "platform": entry.platform,
            "displayName": entry.displayName,
            "awards": entry.awards,
            "kills": Object.values(updatedEntry).reduce((sum, current) => sum + current.kills, 0),
            "timeSpent": Object.values(updatedEntry).reduce((sum, current) => sum + current.time, 0),
            "matches": Object.keys(updatedEntry).length,
            "wins": Object.values(updatedEntry).reduce((sum, current) => sum + current.won, 0),
            "losses": Object.values(updatedEntry).reduce((sum, current) => sum - current.won, Object.keys(updatedEntry).length),
            "lastUpdated": Object.values(updatedEntry).reduce((highest, current) => highest > current.date ? highest : current.date, 0),
          };
          setData(newData);
        }
      })
    })()

  }, []);

  const columns = useMemo<MRT_ColumnDef<tableEntry>[]>(
    () => [
      {
        accessorKey: 'displayName',
        header: 'Name',
        size: 100,
        Cell: ({ cell }) => {
          return <a href={`/report?id=${cell.row.original.membershipID}&platform=${cell.row.original.platform}`} className="hover:text-white underline underline-offset-4 decoration-[1px]">{cell.getValue<string>()}</a>}
      },
      {
        accessorKey: 'awards',
        header: 'Awards',
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
        accessorKey: 'timeSpent',
        header: 'Playtime',
        filterVariant: 'range',
        size: 150,
        Cell: ({ cell }) => formatSeconds(cell.getValue<number>())
      },
      {
        accessorKey: 'matches',
        header: 'Matches',
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
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    mantineSearchTextInputProps: {
      className: "bg-primary-900 text-primary-900",
    },
    mantineTableProps: {
      //className: "z-50"
    },
    mantineTableHeadCellProps: {
      className: ""
    },
    mantineTableContainerProps: {
      className: ""
    },
    //enableColumnResizing: true,
    enableExpandAll: false, // this could easily get you rate limited I'd assume
    enableFullScreenToggle: false, // ik I'm incredibly sad as well, but it breaks too many things
    initialState: { density: 'xs' }
  });

  return <div className=''>

    <div className="text-gray-100 flex justify-center mt-20 mb-40">
      <MantineProvider
        theme={{
          colorScheme: 'dark',
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
    </div>
  </div>;
}