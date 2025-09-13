import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { MantineProvider } from '@mantine/core';
import { type DestinyActivityDefinitionType, type Scorcher } from '../../lib/entities';
import { type matchTableEntry, medalsBungie } from '../../lib/entities';
import PGCRLookup from '../../modules/PGCRLookup';
import React from 'react';

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
  const [mapNames, setMapNames] = React.useState([""]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pagination]);

  const handleKeyDown = (event) => {
    const activePage = pagination.pageIndex;
    const totalPages = Math.ceil(data.length / pagination.pageSize);

    if (event.key === 'ArrowRight' && activePage < totalPages - 1) {
      setPagination({
        pageIndex: activePage + 1,
        pageSize: pagination.pageSize
      });
    } else if (event.key === 'ArrowLeft' && activePage >= 1) {
      setPagination({
        pageIndex: pagination.pageIndex - 1,
        pageSize: pagination.pageSize
      });
    }
  };

  React.useEffect(() => {
    let tmpMatchHistory = stats.matchHistory != undefined ? Object.values(stats.matchHistory).sort(function (a, b) {
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
        "mode": match.mode,
        "outcome": match.outcome,
        "win_chance": match.win_chance,
        "kd": match.kills / (match.deaths == 0 ? 1 : match.deaths),
        "time": match.time,
        "kpm": match.kills / (match.time == 0 ? 1 : (match.time / 60)),
        "efficiency": (match.kills + match.assists) / (match.deaths == 0 ? 1 : match.deaths)
      }
    }).sort(function (a, b) {
      if (Number(a.id) > Number(b.id))
        return -1;
      if (Number(a.id) < Number(b.id))
        return 1;
      return 0;
    });

    // Map names, filtered duplicates and sorted by name

    const newMapNames = newTable.map(match => {
      return DestinyActivityDefinition && DestinyActivityDefinition.hasOwnProperty(match.map) ? DestinyActivityDefinition[match.map]!.name : ""
    }).filter((value, index, array) => array.indexOf(value) === index).sort(function (a, b) {
      var nameA = a.toLowerCase(), nameB = b.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
    setMapNames(newMapNames)

    setData(newTable)

  }, [props]);



  const columns = useMemo<MRT_ColumnDef<matchTableEntry>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        accessorFn(originalRow) {
          return new Date(originalRow.date)
        },
        size: 50,
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
        header: '+/-',
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

          if (cell.row.original.win_chance == undefined) {
            return <i>missing</i>
          }

          switch (Math.floor(cell.row.original.win_chance)) {
            case -4:
              return <i>invalid team</i>;
            case -3:
              return <i>missing data</i>;
            case -2:
              return <i>not rated</i>;
            case -1:
              return <i>not rated yet</i>;
            case 0:
              return (cell.row.original.win_chance * 100).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 5,
              }) + "%"
            default:
              return <i>missing</i>
          }
        }
      },
      {
        accessorKey: 'kills',
        header: 'K',
        filterVariant: 'range',
        size: 50
      },
      {
        accessorKey: 'deaths',
        header: 'D',
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
        header: 'K/min',
        filterVariant: 'range',
        size: 50,
        accessorFn(originalRow) {
          return (originalRow.kpm).toFixed(2)
        }
      },
      {
        accessorKey: 'time',
        header: 'Duration',
        filterVariant: 'range',
        size: 50,
        Cell: ({ cell }) => {
          return cell.row.original.time + "s"
        },
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'medals',
        header: 'Medals',
        size: 50,
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
        accessorKey: 'team',
        header: 'Teaming',
        size: 50,
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: ["Team", "Solo"],
        },
        Cell: ({ cell }) => {
          return cell.row.original.team ? "Team" : "Solo";
        }
      },
      {
        accessorKey: 'mode',
        header: 'Mode',
        size: 50,
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: ["Team Scorched", "Control", "Rift", "Clash", "Unknown"],
        },
        accessorFn(originalRow) { // makes them searchable by outcome
          switch (originalRow.mode) {
            case 62:
              return "Team Scorched";
            case 73:
              return "Control";
            case 88:
              return "Rift";
              case 71:
              return "Clash";
            default:
              return "Unknown";
          }
        }, // essentially we're storing only the achieved medals as a string which can be filtered
        Cell: ({ cell }) => {
          switch (cell.row.original.mode) {
            case 62:
              return "Team Scorched";
            case 73:
              return "Control";
            case 88:
              return "Rift";
              case 71:
              return "Clash";
            default:
              return "Unknown";
          }
        }
      },
      {
        accessorKey: 'outcome',
        header: 'Outcome',
        size: 50,
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: ["Victory", "Defeat", "Tie", "Unknown"],
        },
        accessorFn(originalRow) { // makes them searchable by outcome
          switch (originalRow.outcome) {
            case 0:
              return "Victory";
            case 1:
              return "Defeat";
            case 2:
              return "Tie";
            default:
              return "Unknown";
          }
        }, // essentially we're storing only the achieved medals as a string which can be filtered
        Cell: ({ cell }) => {
          switch (cell.row.original.outcome) {
            case 0:
              return <span className="text-green-600">Victory</span>;
            case 1:
              return <span className="text-red-600">Defeat</span>;
            case 2:
              return <span className="text-gray-200">Tie</span>;
            default:
              return <i>-</i>;
          }
        }
      },
      {
        accessorKey: 'map',
        header: 'Map',
        size: 50,
        accessorFn(originalRow) {
          return DestinyActivityDefinition && DestinyActivityDefinition.hasOwnProperty(originalRow.map) ? DestinyActivityDefinition[originalRow.map]?.name : ""
        },
        filterVariant: 'select' as const,
        mantineFilterMultiSelectProps: {
          data: mapNames,
        },
      },
    ],
    [data, mapNames],
  );

  const table = useMantineReactTable({
    columns,
    data,
    onPaginationChange: setPagination,
    state: { pagination },
    mantineSearchTextInputProps: {
      className: "bg-primary-900 text-primary-900",
    },
    mantineTableProps: {
      //className: "z-50"
    },
    renderDetailPanel: ({ row }) => (
        <div className="flex justify-center p-0 mb-3 font-body">
          <PGCRLookup matchid={row.original.id} membershipId={stats.id} forceRender={false} />
        </div>

    ),
    mantineExpandButtonProps: ({ row }) => ({
      className: "!text-gray-900 dark:!text-gray-50",
      onClick: (event) => {
        // most browsers preload the extended version so we need to induce a click on a hidden button
        // on e.g. opera gx this element does not exist, thus we need to wait perhaps
        let loadingButton = document.getElementById(String(row.original.id))
        if (loadingButton != null) {
          loadingButton.click(); // We need to hijack a hidden button so not all pages are loaded at once
        } else {
          setTimeout(() => {
            document.getElementById(String(row.original.id))?.click()
          }, 500);
        }
      },
    }),
    //enableColumnResizing: true,
    enableExpandAll: false, // this could easily get you rate limited I'd assume
    enableDensityToggle: false,
    enableFullScreenToggle: false, // ik I'm incredibly sad as well, but it breaks too many things
    columnFilterDisplayMode: "popover",
    initialState: {
      density: 'xs',
      columnVisibility: {
        'win_chance': true,
        'team': false,
        'time': false,
        'id': false,
      },
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
    /*mantineExpandButtonProps: {
      className: "!text-gray-900 dark:!text-gray-50",
    },*/
  });

  return <div className=''>
    <div className="text-gray-100 justify-center flex mt-2 mb-5">
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
  </div>;
};

export default MatchHistory;