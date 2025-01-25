import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { createStyles, MantineProvider } from '@mantine/core';
import { type DestinyActivityDefinitionType, type Scorcher } from '../../lib/entities';
import { type matchTableEntry, medalsBungie } from '../../lib/entities';
import PGCRLookup from '../../modules/PGCRLookup';
import React from 'react';
import update from 'immutability-helper';

interface MatchHistoryInterface {
  stats: Scorcher,
  DestinyActivityDefinition: DestinyActivityDefinitionType
}

export const MatchHistory = (props: MatchHistoryInterface) => {
  // should be memoized or stable
  // TODO: maybe an export function?
  const initialState: matchTableEntry[] = [];
  const { stats, DestinyActivityDefinition } = props;
  const [data, setData] = React.useState(initialState);

  React.useEffect(() => {
    let tmpMatchHistory = stats.matchHistory != undefined ? Object.values(stats.matchHistory).sort(function(a, b){
      if (Number(a.id) < Number(b.id))
       return -1;
      if (Number(a.id) > Number(b.id))
       return 1;
      return 0;
     }) : [];
     
    let newTable = tmpMatchHistory.map((match, index) => {
      let previousElo = index == 0 ? 1000 : (tmpMatchHistory[index - 1]?.elo || 1000);
      return {
        "id": match.id,
        "elo": match.elo,
        "eloDiff": match.elo == 0 ? 0 : match.elo - previousElo,
        "date": match.date,
        "kills": match.kills,
        "deaths": match.deaths,
        "assists": match.assists,
        "medals": {
          ...match.medals
        },
        "team": match.team,
        "map": match.map,
        "won": match.won,
        "win_chance": match.win_chance,
        "kd": match.kills / (match.deaths == 0 ? 1 : match.deaths),
        "time": match.time,
        "kpm": match.kills / (match.time == 0 ? 1 : (match.time / 60)),
        "efficiency": (match.kills + match.assists) / (match.deaths == 0 ? 1 : match.deaths)
      }
    }).sort(function(a, b){
      if (Number(a.id) > Number(b.id))
       return -1;
      if (Number(a.id) < Number(b.id))
       return 1;
      return 0;
     });
    setData(newTable)
    
  }, [props]);

   // Map names, filtered duplicates and sorted by name
  const mapNames = data.map(match => {
    return DestinyActivityDefinition.hasOwnProperty(match.map) ? DestinyActivityDefinition[match.map]?.name : ""
  }).filter((value, index, array) => array.indexOf(value) === index ).sort(function(a, b){
    var nameA = a.toLowerCase(), nameB = b.toLowerCase();
    if (nameA < nameB) //sort string ascending
     return -1;
    if (nameA > nameB)
     return 1;
    return 0; //default return value (no sorting)
   });


  const columns = useMemo<MRT_ColumnDef<matchTableEntry>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        accessorFn(originalRow) {
          return new Date(originalRow.date)
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
      {
        accessorKey: 'elo',
        header: 'Elo',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => {
          return cell.row.original.elo != 0 ? cell.row.original.elo : <i>not rated yet</i>
        }
      },
      {
        accessorKey: 'eloDiff',
        header: '',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => {
          return cell.row.original.elo != 0 ? <span className={cell.row.original.eloDiff > 0 ? "text-green-600" : (cell.row.original.eloDiff == 0 ? "" : "text-red-600")}>{(cell.row.original.eloDiff > 0 ? "+" : "") + cell.row.original.eloDiff}</span> : <></>
        }
      },
      {
        accessorKey: 'win_chance',
        header: 'Win Chance',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => {
          return cell.row.original.win_chance != undefined && cell.row.original.win_chance != -1 ? (cell.row.original.win_chance * 100).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 5,
        })+ "%" : <i>not rated yet</i>
        }
      },
      {
        accessorKey: 'kills',
        header: 'Kills',
        filterVariant: 'range',
        size: 50
      },
      {
        accessorKey: 'deaths',
        header: 'Deaths',
        filterVariant: 'range',
        size: 50
      },
      {
        accessorKey: 'kd',
        header: 'K/D',
        filterVariant: 'range',
        size: 50,
        accessorFn(originalRow) {
          return (originalRow.kills / (originalRow.deaths == 0 ? 1 : originalRow.deaths)).toFixed(2)
        }
      },
      {
        accessorKey: 'kpm',
        header: 'Kills/min',
        filterVariant: 'range',
        size: 100,
        accessorFn(originalRow) {
          return (originalRow.kpm).toFixed(2)
        }
      },
      {
        accessorKey: 'medals',
        header: 'Medals',
        maxSize: 220,
        minSize: 20,
        accessorFn(originalRow) { // this is so funny but it works lmao
          return Object.keys(originalRow.medals).map((medal) => originalRow.medals[medal] ? medalsBungie[medal].text : "")
        }, // essentially we're storing only the achived medals as a string which can be filtered
        Cell: ({ cell }) => {
          const cellContent = cell.row.original.medals;
          return <div className='flex'> {Object.keys(cellContent).map((medal) => {
            if (cellContent[medal]) {
              return <div key={"match_table_medals_" + medal} className='inline'><img className='w-6 object-scale-down' src={medalsBungie[medal].src} /></div>
              //medalsBungie
            } else {
              return <div key={"match_table_medals_" + medal}></div>
            }
          })} </div>
        },
        filterVariant: 'multi-select' as const, // a better way would probably to overwrite the filter function
        mantineFilterMultiSelectProps: {
          data: Object.keys(medalsBungie).map((medal) => medalsBungie[medal].text),
        },
      },
      {
        accessorKey: 'won',
        header: 'Outcome',
        size: 50,
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: ["true", "false"],
        },
        Cell: ({ cell }) => {
          return cell.row.original.won ? <span className="text-green-600">Victory</span> : <span className="text-red-600">Defeat</span>
        }
      },
      {
        accessorKey: 'map',
        header: 'Map',
        accessorFn(originalRow) {
          return DestinyActivityDefinition.hasOwnProperty(originalRow.map) ? DestinyActivityDefinition[originalRow.map]?.name : ""
        },
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: mapNames,
        },
      },
    ],
    [stats],
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
    renderDetailPanel: ({ row }) => (
      <div className="flex justify-center p-0 mb-3">
        <PGCRLookup matchid={row.original.id} membershipId={stats.id} forceRender={false} />
      </div>

    ),
    mantineExpandButtonProps: ({ row }) => ({
      onClick: (event) => {
        // <PGCRLookup matchid={row.original.id} membershipId={stats.id}/>
        document.getElementById(row.original.id)?.click(); // We need to hijack a hidden button so not all pages are loaded at once
      },
    }),
    mantineTableHeadCellProps: {
      className: ""
    },
    mantineTableContainerProps: {
      className: ""
    },
    //enableColumnResizing: true,
    enableExpandAll: false, // this could easily get you rate limited I'd assume
    enableDensityToggle: false,
    enableFullScreenToggle: false, // ik I'm incredibly sad as well, but it breaks too many things
    columnFilterDisplayMode: "popover",
    initialState: { density: 'xs',
      columnVisibility: {
        'win_chance': false,
      },
     }
  });

  return <div className=''>
    <div className="text-5xl text-gray-100 flex justify-center mt-2 font-semibold mb-10">Match History</div>
    <div className="text-gray-100 justify-center flex max-w-[calc(100vw-50px)] lg:max-w-[calc(100vw-440px)] mt-2 mb-5">
      <MantineProvider
        theme={{
          colorScheme: 'dark',
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
    </div>
  </div>;
};

export default MatchHistory;