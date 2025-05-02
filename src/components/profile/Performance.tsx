import React, { useEffect } from "react";
import { type Scorcher } from "../../lib/entities";
import ReactApexChart from "react-apexcharts";
import { seasons } from "../../lib/seasons";
import * as dc from "dc";
import * as d3 from 'd3';
import "dc/src/compat/d3v6";  // needed for DataTable to render
import crossfilter from 'crossfilter2';
import { D2Box } from "./D2Box";
import { secondsToDisplayTime } from "../../lib/fun";

export const Performance = (stats: Scorcher) => {

    useEffect(() => {
        let data = Object.values(stats.matchHistory);
        data = data.filter(d => d.win_chance != -2 && d.win_chance != -3) // filter broken matches
        if (data.length == 0) {
            return
        }

        const colorsChart = ['#742828', 'rgba(40,40,40,0.5)'];

        const cf = crossfilter(data);
        const yearDimension = cf.dimension(d => { const a = new Date(d.date); return a.getYear() });
        const valueGroup = yearDimension.group().reduceSum(d => d.kills);

        const dateFirst = data.map(d => d.date).reduce((p, v) => Math.min(p, v), Math.min())
        let dateLast = data.map(d => d.date).reduce((p, v) => Math.max(p, v), 0)
        dateLast += 60000 * 60 * 24 * 30; // add one month for margin


        const chatOutcomes = dc.pieChart('#chart-outcomes');
        const chartTeamSolo = dc.pieChart('#chart-team-solo');
        const chartWinChances = dc.barChart('#chart-win-chances');
        const chartKillsPerMatch = dc.barChart('#chart-kills-per-match');
        const chartElo = dc.lineChart('#chart-elo');
        const chartEloSmaller = dc.barChart('#chart-elo-smaller');
        const yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');
        const counterMatches = dc.dataCount('.dc-data-count');
        const statsOutputKD = dc.numberDisplay('#chart-stats-kd');
        const statsOutputKPM = dc.numberDisplay('#chart-stats-kpm');
        const statsOutputEfficiency = dc.numberDisplay('#chart-stats-efficiency');
        const statsOutputKills = dc.numberDisplay('#chart-stats-kills');
        const tableMatches = dc.dataTable('.dc-data-table');
        const dateFormatParser = d3.timeParse('%Q'); // We're dealing with a unix timestamp in milliseconds 
        const dateFormatParser2 = d3.timeParse('%s'); // We're dealing with a unix timestamp in seconds
        const numberFormat = d3.format('.2f');

        data.forEach(d => {
            d.dd = d.date > 100000000000 ? dateFormatParser(String(d.date)) : dateFormatParser2(String(d.date));
            d.month = d3.timeMonth(d.dd);
            d.day = d3.timeDay(d.dd); // pre-calculate month for better performance
        });

        const cFilter = crossfilter(data);
        const all = cFilter.groupAll();
        const dimentionYear = cFilter.dimension(d => d3.timeYear(d.dd).getFullYear());
        const groupKD = cFilter.groupAll().reduce(
            (p, v) => {
                ++p.count;
                p.kills += v.kills;
                p.assists += v.assists;
                p.deaths += v.deaths;
                p.time += v.time;
                p.sumWinChance += v.win_chance;
                p.avgWinChance = p.sumWinChance / p.count;
                return p;
            },
            (p, v) => {
                --p.count;
                ++p.count;
                p.kills -= v.kills;
                p.assists -= v.assists;
                p.deaths -= v.deaths;
                p.time -= v.time;
                p.sumWinChance += v.win_chance;
                p.avgWinChance = p.count ? p.avgWinChance / p.count : 0;
                return p;
            },
            () => ({
                count: 0,
                kills: 0,
                assists: 0,
                deaths: 0,
                time: 0,
                sumWinChance: 0,
                avgWinChance: 0,
            })
        )
        const yearlyPerformanceGroup = dimentionYear.group().reduce(
            (p, v) => {
                ++p.count;
                p.kills += v.kills;
                p.deaths += v.deaths;
                p.sumWinChance += v.win_chance;
                p.avgWinChance = p.sumWinChance / p.count;
                return p;
            },
            (p, v) => {
                --p.count;
                ++p.count;
                p.kills -= v.kills;
                p.deaths -= v.deaths;
                p.sumWinChance -= v.win_chance;
                p.avgWinChance = p.count ? p.avgWinChance / p.count : 0;
                return p;
            },
            () => ({
                count: 0,
                kills: 0,
                deaths: 0,
                sumWinChance: 0,
                avgWinChance: 0,
            })
        );
        const dimentionDate = cFilter.dimension(d => d.day);
        const dimentionMonth = cFilter.dimension(d => d.month);
        const dimentionElo = cFilter.dimension(d => d.elo);
        const groupMatchesPerMonth = dimentionMonth.group().reduceCount();
        const groupElo = dimentionDate.group().reduce(
            (p, v) => Math.max(p, v.elo),
            (p, v) => p,
            () => (0)
        );
        const indexAvgByMonthGroup = dimentionMonth.group().reduce(
            (p, v) => {
                ++p.count;
                p.kills += v.kills;
                p.avg = Math.round(p.kills / p.count);
                return p;
            },
            (p, v) => {
                --p.count;
                p.kills -= v.kills;
                p.avg = p.count ? Math.round(p.kills / p.count) : 0;
                return p;
            },
            () => ({ count: 0, kills: 0, avg: 0 })
        );
        const gainOrLoss = cFilter.dimension(d => d.won ? 'Win' : 'Loss');
        const gainOrLossGroup = gainOrLoss.group();
        const dimentionTeamOrSolo = cFilter.dimension(d => d.team ? 'Team' : 'Solo');
        const groupTeamOrSolo = dimentionTeamOrSolo.group();
        const dimentionWinChance = cFilter.dimension(d => Math.round(d.win_chance * 100));
        const groupWinChance = dimentionWinChance.group();
        const dimentionKills = cFilter.dimension(d => d.kills);
        const groupKills = dimentionKills.group();
        const dayOfWeek = cFilter.dimension(d => {
            const day = d.dd.getDay();
            const name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return `${day}.${name[day]}`;
        });
        yearlyBubbleChart
            .height(250)
            .transitionDuration(1500)
            .margins({ top: 10, right: 50, bottom: 30, left: 40 })
            .dimension(dimentionYear)
            .group(yearlyPerformanceGroup)
            .colorDomain([-500, 500])
            .colorAccessor(d => d.value.absGain)
            .keyAccessor(p => p.value.absGain)
            .valueAccessor(p => p.value.percentageGain)
            .radiusValueAccessor(p => p.value.dimentionWinChancePercentage)
            .maxBubbleRelativeSize(0.3)
            .x(d3.scaleLinear().domain([-2500, 2500]))
            .y(d3.scaleLinear().domain([-100, 100]))
            .r(d3.scaleLinear().domain([0, 4000]))
            .elasticY(true)
            .elasticX(true)
            .yAxisPadding(100)
            .xAxisPadding(500)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel('Effort')
            .yAxisLabel('Scoins earned')
            .renderLabel(true)
            .label(p => p.key)
            .renderTitle(true)
            .title(p => [
                p.key,
                `Index Gain: ${numberFormat(p.value.absGain)}`,
                `Index Gain in Percentage: ${numberFormat(p.value.percentageGain)}%`,
                `dimentionWinChance / Index Ratio: ${numberFormat(p.value.dimentionWinChancePercentage)}%`
            ].join('\n'))
            .yAxis().tickFormat(v => `${v}%`);

        chatOutcomes
            .width(220)
            .height(180)
            .radius(80)
            .dimension(gainOrLoss)
            .group(gainOrLossGroup)
            .label(d => {
                if (chatOutcomes.hasFilter() && !chatOutcomes.hasFilter(d.key)) {
                    return `${d.key}(0%)`;
                }
                let label = d.key;
                if (all.value()) {
                    label += `(${(d.value / all.value() * 100).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                    })}%)`;
                }
                return label;
            })
            .renderLabel(true)
            .innerRadius(40)
            .transitionDuration(500)
            .colors(colorsChart)
            .colorDomain([0, 100])
            .colorAccessor(function (d, i) { return (d.value / all.value() * 100); })

        chartTeamSolo
            .width(220)
            .height(180)
            .radius(80)
            .dimension(dimentionTeamOrSolo)
            .group(groupTeamOrSolo)
            .label(d => {
                if (chartTeamSolo.hasFilter() && !chartTeamSolo.hasFilter(d.key)) {
                    return `${d.key}(0%)`;
                }
                let label = d.key;
                if (all.value()) {
                    label += `(${(d.value / all.value() * 100).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                    })}%)`;
                }
                return label;
            })
            .renderLabel(true)
            .innerRadius(40)
            .transitionDuration(500)
            .colors(colorsChart)
            .colorDomain([0, 100])
            .colorAccessor(function (d, i) { return (d.value / all.value() * 100); })

        chartKillsPerMatch
            .yAxisLabel('Matches')
            .height(180)
            .margins({ top: 10, right: 10, bottom: 30, left: 50 })
            .dimension(dimentionKills)
            .group(groupKills)
            .elasticY(true)
            .centerBar(true)
            .gap(1)
            .round(Math.floor)
            .alwaysUseRounding(true)
            .x(d3.scaleLinear().domain([0, data.map(d => d.kills).reduce((p, v) => Math.max(p, v))]))
            .colors(colorsChart)
            .renderHorizontalGridLines(true)
            .filterPrinter(filters => {
                const filter = filters[0];
                let s = '';
                s += `${numberFormat(filter[0])}% -> ${numberFormat(filter[1])}%`;
                return s;
            });

        chartWinChances
            .yAxisLabel('Matches')
            .height(180)
            .margins({ top: 10, right: 10, bottom: 30, left: 50 })
            .dimension(dimentionWinChance)
            .group(groupWinChance)
            .elasticY(true)
            .centerBar(true)
            .gap(1)
            .round(Math.floor)
            .alwaysUseRounding(true)
            .x(d3.scaleLinear().domain([0, 100]))
            .colors(colorsChart)
            .renderHorizontalGridLines(true)
            .filterPrinter(filters => {
                const filter = filters[0];
                let s = '';
                s += `${numberFormat(filter[0])}% -> ${numberFormat(filter[1])}%`;
                return s;
            });
        chartWinChances.xAxis().tickFormat(
            v => `${v}%`);
        chartWinChances.yAxis().ticks(5);

        chartElo
            .renderArea(true)
            .height(200)
            .transitionDuration(500)
            .margins({ top: 30, right: 50, bottom: 25, left: 40 })
            .dimension(dimentionDate)
            .mouseZoomable(true)
            .rangeChart(chartEloSmaller)
            .x(d3.scaleTime().domain([new Date(dateFirst), new Date(dateLast)]))
            .round(d3.timeDay.round)
            .xUnits(d3.timeDays)
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .legend(dc.legend().x(100).y(10).itemHeight(13).gap(5))
            .brushOn(false)
            .group(groupElo, 'Rating')
            .colors(colorsChart.reverse())
            .yAxisLabel('Matches')
            //.stack(monthlyMoveGroup, 'Monthly Index Move', d => d.value)
            .title(d => {
                let value = d.value.avg ? d.value.avg : d.value;
                if (isNaN(value)) {
                    value = 0;
                }
                return `${d.key}\n${numberFormat(value)}`;
            });

        chartEloSmaller/* dc.barChart('#chart-elo-smaller', 'chartGroup'); */
            .height(100)
            .margins({ top: 0, right: 50, bottom: 20, left: 40 })
            .dimension(dimentionMonth)
            .group(groupMatchesPerMonth)
            .centerBar(true)
            .gap(1)
            .x(d3.scaleTime().domain([new Date(dateFirst), new Date(dateLast)]))
            .round(d3.timeMonth.round)
            .colors(colorsChart.reverse())
            .alwaysUseRounding(true)
            .xUnits(d3.timeMonths)
            .elasticY(true)
            .yAxisLabel('Matches');

        counterMatches /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .crossfilter(cFilter)
            .groupAll(all)
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records',
                all: 'All records selected. Please click on the graph to apply filters.'
            });
        statsOutputKD
            .group(groupKD)
            .formatNumber(d3.format(".1f"))
            .valueAccessor(function (d) { return d.kills / d.deaths; })
            .html({
                one: '%number',
                some: '%number',
                none: '-/-'
            });
            statsOutputEfficiency
                .group(groupKD)
                .formatNumber(d3.format(".1f"))
                .valueAccessor(function (d) { return (d.kills + d.assists) / d.deaths; })
                .html({
                    one: '%number',
                    some: '%number',
                    none: '-/-'
                });
                statsOutputKPM
                    .group(groupKD)
                    .formatNumber(d3.format(".1f"))
                    .valueAccessor(function (d) { return d.kills * 60 / d.time; })
                    .html({
                        one: '%number',
                        some: '%number',
                        none: '-/-'
                    });
        statsOutputKills
            .group(groupKD)
            .valueAccessor(function (d) { return d.kills })
            .html({
                one: '%number',
                some: '%number',
                none: '-/-'
            });
        tableMatches /* dc.dataTable('.dc-data-table', 'chartGroup') */
            .dimension(dimentionDate)
            .size(10)
            .columns([{
                label: 'Date',
                format: function (d) {
                    return "<a class=\"stylized-link\" href=\"/pgcr/?id=" + d.id + "&membershipid=" + stats.id + "\">" + d.dd.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    }) + "</a>";
                }
            },
            {
                label: 'Kills',
                format: function (d) {
                    return d.kills;
                }
            },
            {
                label: 'Death',
                format: function (d) {
                    return d.deaths;
                }
            },
            ])
            .sortBy(d => d.dd)
            .order(d3.ascending)
            .on('renderlet', table => {
                table.selectAll('.dc-table-group').classed('info', true);
            });


        dc.renderAll();
    }, [])

    const resetFilters = () => {
        dc.filterAll(); // Clear all filters
        dc.redrawAll(); // Redraw all charts
    };

    // raw stats
    function formatSeconds(duration: number) {
        var date = new Date(duration * 1000);
        var hh = Math.floor(duration / 3600);
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        return (hh == 0 ? "" : hh + "h ") + (mm == 0 ? "" : mm + "m ") + ss + "s";
    }
    return (
        <div className="xl:mx-6 fill-gray-950 dark:fill-gray-100">
            <div className="flex flex-wrap justify-center ">
                <D2Box title="Info" body={
                    <div className="max-w-60 p-4 lg:p-6 text-center lg:text-left">
                        These charts are interactive.<br />Filter by any value to see how you performed in certain matches
                    </div>
                } />
                <D2Box title="Stats" body={
                    <div className="dc-js-chart">
                        <table className="p-2 flex justify-center">
                            <tbody>
                                <tr>
                                    <td className="text-right pr-2">
                                        Kills
                                    </td>
                                    <td id="chart-stats-kills" className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        K/D
                                    </td>
                                    <td id="chart-stats-kd" className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        Efficiency
                                    </td>
                                    <td id="chart-stats-efficiency" className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-right pr-2">
                                        KPM
                                    </td>
                                    <td id="chart-stats-kpm" className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                } />
                <D2Box title="Outcomes" body={
                    <div id="chart-outcomes" className="dc-js-chart"></div>
                } />
                <D2Box title="Solo vs Team" body={
                    <div id="chart-team-solo" className="dc-js-chart"></div>
                } />
                <D2Box title="Win Chances" body={
                    <div id="chart-win-chances" className="dc-js-chart"></div>
                } />
                </div>
            <div className="flex flex-wrap justify-center ">
                <div className="grid columns-1">
                    <D2Box title="Rating" body={
                        <div>
                            <div id="chart-elo" className="dc-js-chart dc-js-chart-full"></div>

                            <div className="flex justify-center mt26 mb-4">
                                <span className="text-gray-400 text-lg sm:text-xl"><span className="text-gray-900 dark:text-gray-100 text-xl sm:text-4xl font-black">{stats.performance.trueSkill}</span> Current / <span className="text-gray-900 dark:text-gray-100 text-xl sm:text-4xl font-black">
                                    {Object.values(stats.matchHistory).reduce((highest, current) => highest > current.elo ? highest : current.elo, 0)}</span> Peak</span>
                            </div>
                        </div>
                    } />
                    <D2Box title="Matches per month" body={
                        <div id="chart-elo-smaller" className="dc-js-chart dc-js-chart-full"></div>
                    } />
                </div>
                <D2Box title="Kills per match" body={
                    <div id="chart-kills-per-match" className="dc-js-chart"></div>
                } />
                <D2Box title="Last 10 matches" body={
                    <div className="grid grid-cols-1 dc-js-chart max-w-80 mb-4">
                        <div className="dc-data-count text-center text-wrap"></div>
                        <button onClick={resetFilters} className="stylized-link p-2">Reset All Filters</button>
                        <div className="mt-4 flex justify-center">
                            <table className="dc-data-table">
                            </table>
                        </div>
                    </div>
                } />
                <D2Box title="TBA" body={
                    <div id="yearly-bubble-chart" className="dc-js-chart"></div>
                } />
                <div id="html-dist"></div>
            <D2Box title="All Time high scores" body={
            <div className="p-4 text-gray-300 text-lg sm:text-xl flex flex-wrap justify-evenly">
                <table className="flex w-[280px] justify-center">
                    <tbody>
                        <tr>
                            <td className="text-right pr-2">
                                K/D
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {(stats.performance.kills / Math.max(stats.performance.deaths || 1, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Efficiency
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {((stats.performance.kills + stats.performance.assists) / Math.max(stats.performance.deaths || 0, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                KPM
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {(stats.performance.kills * 60 / Math.max(stats.performance.timeSpent, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Combat Rating
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.combatRating.toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Peak Rating
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {Object.values(stats.matchHistory).reduce((highest, current) => highest > current.elo ? highest : current.elo, 0)}
                            </td>
                        </tr>
                        <tr>
                            <td className="h-3"></td>
                        </tr>
                    </tbody>
                </table>
                <table className="flex w-[280px] justify-center">
                    <tbody>
                        <tr>
                            <td className="text-right pr-2">
                                Win Ratio
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {((stats.performance.wins * 100) / stats.performance.matches).toFixed(0)} %
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average kill distance
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {((stats.bungieHistoricAccountStats.totalKillDistance || 0) / Math.max(stats.bungieHistoricAccountStats.kills || 1, 1)).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })} m
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Match Duration
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds(stats.performance.timeSpent / Math.max(stats.performance.matches, 1))}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Lifespan
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds(stats.bungieHistoricAccountStats.averageLifespan || 0)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Average Team Score
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {((stats.bungieHistoricAccountStats.teamScore || 0) / (stats.bungieHistoricAccountStats.activitiesEntered || 0)).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Avg Match Completion
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {(100 - ((stats.bungieHistoricAccountStats.remainingTimeAfterQuitSeconds || 0) * 100 / (stats.bungieHistoricAccountStats.totalActivityDurationSeconds || 1))).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })}%
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="flex w-[280px] justify-center">
                    <tbody>

                        <tr>
                            <td className="text-right pr-2">
                                Highest Kill Streak
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.longestKillSpree}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Highest Score
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.bestSingleGameScore}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Highest Kill count
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {stats.bungieHistoricAccountStats?.bestSingleGameKills}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Fastest Match
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {formatSeconds((stats.bungieHistoricAccountStats?.fastestCompletionMs || 0) / 1000)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right pr-2">
                                Longest Kill Distance
                            </td>
                            <td className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl">
                                {(stats.bungieHistoricAccountStats?.longestKillDistance || 0).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 1,
                                })} m
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            } />
            </div>
        </div>
    )

}