import { useMemo } from "react";
import React from "react";
import * as fzstd from 'fzstd';
import { MantineProvider } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { LoadingAnimationWithTitle } from "../LoadingAnimation";
import { url_data } from "../../lib/api";

export const SpecialKills = () => {

  type tableEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "total_kills": number,
    "weaponKillsAbility": number,
    "weaponKillsSuper": number,
    "weaponKillsMelee": number,
    "weaponKillsGrenade": number,
    "precisionKills": number,
    "witherhoardKills": number,
    "grandOvertuneKills": number,
    "otherWeaponKills": number,
  }

  type sourceEntry = {
    "membershipID": string,
    "platform": number,
    "displayName": string,
    "awards": string,
    "total_kills": number,
    "weaponKillsAbility": number,
    "weaponKillsSuper": number,
    "weaponKillsMelee": number,
    "weaponKillsGrenade": number,
    "precisionKills": number,
    "witherhoardKills": number,
    "grandOvertuneKills": number,
    "otherWeaponKills": number,
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
      let oldData: tableEntry[] = [
      ]

      await fetch(url_data + '/leaderboards/special.json.zst').then(
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

            for (let i = 0; i < Object.keys(json).length && i < 10000; i++) {
              const key = Object.keys(json)[i] || "";
              oldData.push({
                "membershipID": key,
                "platform": json[key].platform,
                "displayName": json[key].name,
                "awards": "",
                "total_kills": json[key].total_kills,
                "weaponKillsAbility": json[key].weaponKillsAbility,
                "weaponKillsSuper": json[key].weaponKillsSuper,
                "weaponKillsMelee": json[key].weaponKillsMelee,
                "weaponKillsGrenade": json[key].weaponKillsGrenade,
                "precisionKills": json[key].precisionKills,
                "witherhoardKills": json[key].witherhoardKills,
                "grandOvertuneKills": json[key].grandOvertuneKills,
                "otherWeaponKills": json[key].otherWeaponKills,
              })
            }
            oldData = oldData.sort(function (a, b) {
              if (a.total_kills > b.total_kills)
                return -1;
              if (a.total_kills < b.total_kills)
                return 1;
              return 0;
            });
          }
        } catch {
        }
      });

      setData(oldData);
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
          return <a href={`/report?id=${cell.row.original.membershipID}&platform=${cell.row.original.platform}`} className="hover:text-white underline underline-offset-4 decoration-[1px]">{cell.getValue<string>()}</a>
        }
      },
      {
        accessorKey: 'total_kills',
        header: 'Total',
        size: 100
      },
      {
        accessorKey: 'weaponKillsAbility',
        header: 'Ability',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'weaponKillsSuper',
        header: 'Super',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'weaponKillsMelee',
        header: 'Melee',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'weaponKillsGrenade',
        header: 'Grenade',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'precisionKills',
        header: 'Precision Kills',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'witherhoardKills',
        header: 'Witherhoard',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'grandOvertuneKills',
        header: 'Grand Overtune',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
      },
      {
        accessorKey: 'otherWeaponKills',
        header: 'other weapon',
        size: 50,
        Cell: ({ cell }) => cell.getValue<number>().toLocaleString()
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
    }
  });

  return render ? (<div className=''>
    <div className="text-gray-100 flex justify-center mb-10 mt-2">
      <MantineProvider
        theme={{
          colorScheme: 'dark',
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