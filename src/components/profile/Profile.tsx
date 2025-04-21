import { type Scorcher } from "../../lib/entities";
import { medalsBungie } from "../../lib/entities";
import { Tooltip } from 'react-tooltip'
import SCORCHED_CANNONS from "../../lib/cannons";
import { D2Box } from "./D2Box";
import { Radar } from "./Summary";


export const Profile = (stats: Scorcher) => {

    // Reorder the awards
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    const awardKeys = Object.keys(stats.awards).filter((award) => stats.awards[award]);
    awardKeys.move(0, 6)

    const emblemLength = awardKeys.map(value => (stats.awards[value] === true ? 1 : 0))
        .reduce((sum, current) => sum + current, 0); // Let's print a max of 8 awards per row
    const wrapEmblems = emblemLength > 6;

    const iconSize = wrapEmblems ? "22px" : "26px";
    const glowOffset = wrapEmblems ? "11px" : "13px";

    const hoverTextMedals = (award) => {
        return `<div style="padding: 12px; z-index: 11000; max-width: 240px; ">
            <table >
            <tbody>
                <tr>
                <td style="justify-content: center; display: flex; padding: 12px;">
                    <div style=" position: absolute; transform: rotate(45deg);` +
            (medalsBungie[award].glow == "shadow-awardGlow" ? "box-shadow: 44px 44px 50px 30px rgba(240,217,170,0.8)" : "") +
            (medalsBungie[award].glow == "shadow-awardGlowRed" ? "box-shadow: 44px 44px 50px 30px rgba(212,47,47,0.9)" : "") +
            `"></div>
                    <img style="" src=` + medalsBungie[award].src + ` />
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 12px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.125rem; color: rgb(255 255 255); z-index: 110;">
                        ` + medalsBungie[award].description + `
                    </div>
                    </td>
                </tr>
               </tbody>
            </table>
        </div>`};

    // use default cannon if necessary
    const noCannon = stats.minigame.selectedSeason == "" || stats.minigame.equippedCannons[stats.minigame.selectedSeason] == undefined;
    const equippedSeason = noCannon ? "S1" : stats.minigame.selectedSeason
    const equippedCannon = noCannon ? 3 : SCORCHED_CANNONS[equippedSeason]?.cannons.map((item, i) => {
        if (item.hash === stats.minigame.equippedCannons[equippedSeason].base_cannon_hash) return i;
    }).filter((i) => i != undefined); // 1 == ScornchedCannon

    let last_matches = Object.keys(stats.matchHistory);
    last_matches = last_matches.sort((a,b) => Number(b) - Number(a));
    let last_matches_box = "";
    let number_of_matches = last_matches.length;
    let last_matches_stats = {
        kills: 0,
        deaths: 0,
        time: 0,
    }
    if (number_of_matches > 1) {
        last_matches_box = last_matches.map((match, i) => {
            if (i > 4 || stats.matchHistory[match] == undefined) {
                return <></>
            }
            last_matches_stats.kills += stats.matchHistory[match].kills;
            last_matches_stats.deaths += stats.matchHistory[match].deaths;
            last_matches_stats.time += stats.matchHistory[match].time;
            return <div className="p-3" key={"last_matches_box_" + stats.matchHistory[match].id}>
                <div className="flex justify-center mb-1">{
                    stats.matchHistory[match].won ?
                        <img className="h-8 w-8" src="/images/icons/outcome_win.webp" />
                        :
                        <img className="h-8 w-8" src="/images/icons/outcome_loss.webp" />
                }</div>
                <div className="text-center">{stats.matchHistory[match].kills + ":" + stats.matchHistory[match]?.deaths}</div>
            </div>
        })
    } else {
        last_matches_box = <div>there are no matches</div>
    }


    return (
        <div className="">
            <div className="flex flex-wrap justify-center space-y-10 sm:space-y-0">
                <D2Box title="Stats" body={
                    <div className="w-full my-6 mx-6">
                        <table className="w-full">
                            <tbody className="">
                                <tr className="text-gray-800 dark:text-gray-200 text-3xl">
                                    <td className="m-0 p-0 float-left pr-2">
                                        {stats.performance.trueSkill || "..."}
                                    </td>
                                    <td className="m-0 p-0 float-right pl-2">
                                        {stats.performance.deaths ? (stats.performance.kills / stats.performance.deaths).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }) : "..."}
                                    </td>
                                </tr>
                                <tr className="mt-0 text-gray-400 text-lg">
                                    <td className="m-0 p-0 float-left">
                                        Elo
                                    </td>
                                    <td className="m-0 p-0 float-right">
                                        K/D
                                    </td>
                                </tr>
                                <tr className="text-gray-800 dark:text-gray-200 text-3xl space-x-20">
                                    <td className="m-0 p-0 float-left pt-3 pr-2">
                                        {stats.performance.kills ? (stats.performance.kills).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }) : "..."}
                                    </td>
                                    <td className="m-0 p-0 float-right pt-3 pl-2">
                                        {stats.performance.kills ? (stats.performance.kills / (stats.performance.timeSpent / 60)).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }) : "..."}
                                    </td>
                                </tr>
                                <tr className="mt-0 text-gray-400 text-lg">
                                    <td className="m-0 p-0 float-left">
                                        Kills
                                    </td>
                                    <td className="m-0 p-0 float-right">
                                        KPM
                                    </td>
                                </tr>
                                <tr className="mt-0 text-gray-400 text-lg">
                                    <td className="m-0 p-0 float-left">
                                    </td>
                                    <td className="m-0 p-0 float-right text-sm">
                                        (Kills per minute)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                } />
                <D2Box title="Medals" body={
                    <div className="grid grid-cols-8 max-w-[500px] sm:w-[500px] px-4 pt-8 py-2 ">
                        {Object.keys(stats.bungieHistoricAccountStats.medals).map((medal) => {
                            return medalsBungie[medal] ? <div className="flex justify-center mb-4" key={"medal_highlight_div_" + medal}> <div>
                                <div className={"flex justify-center" + (stats.bungieHistoricAccountStats.medals[medal] == 0 ? " opacity-30" : "")}>
                                    <a
                                        data-tooltip-id={medal + "_tooltip"}
                                        data-tooltip-html={hoverTextMedals(medal)}
                                        className={"w-[" + iconSize + "] h-[" + iconSize + "]"}
                                    >
                                        <img className="w-8" src={medalsBungie[medal].src} />
                                    </a>
                                </div>
                                <span className={"flex justify-center mt-2 font-bungo text-gray-800 dark:text-gray-100 text-base sm:text-xl font-medium" + (stats.bungieHistoricAccountStats.medals[medal] == 0 ? " opacity-30" : "")}>{stats.bungieHistoricAccountStats.medals[medal]}</span>
                                <Tooltip id={medal + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                            </div>
                            </div> : ""
                        })
                        }
                    </div>
                } />
                <D2Box title="Equipped Cannon" body={
                    <div className="max-w-[500px] px-4 sm:px-6 py-4 sm:py-8">
                        <div className="flex justify-center">
                            <img className="" src={SCORCHED_CANNONS[equippedSeason]?.cannons[equippedCannon]?.image} />
                        </div>
                        <table className="w-full">
                            <tbody className="">
                                <tr className="text-gray-800 dark:text-gray-200 text-lg sm:text-3xl">
                                    <td className="m-0 p-0 float-left pt-3">
                                        {SCORCHED_CANNONS[equippedSeason]?.cannons[equippedCannon]?.name}
                                    </td>
                                    <td className="m-0 p-0 float-right pt-3">
                                        {(noCannon ? "0" : stats.minigame.equippedCannons[equippedSeason].kills).toLocaleString()}
                                    </td>
                                </tr>
                                <tr className="mt-0 text-gray-400 text-base sm:text-lg">
                                    <td className="m-0 p-0 float-left">
                                        Equipped Cannon
                                    </td>
                                    <td className="m-0 p-0 float-right">
                                        Tracked Kills
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                } />
                <D2Box title={"Radar chart"} body={
                    <Radar stats={stats} context="total" />
                } />
                <D2Box title={"Last Matches"} body={
                    <div className="p-2">
                    <div className="p-3 flex flex-wrap">
                    <table className="w-full">
                        <tbody className="">
                            <tr className="text-gray-800 dark:text-gray-200 text-3xl">
                                <td className="m-0 p-0 float-left pr-2">
                                    {last_matches_stats.deaths != 0 ? (last_matches_stats.kills / last_matches_stats.deaths).toPrecision(2)  : "..."}
                                </td>
                                <td className="m-0 p-0 float-right pl-2">
                                    {last_matches_stats.deaths != 0 ? (last_matches_stats.kills * 60 / last_matches_stats.time).toPrecision(2)  : "..."}
                                </td>
                            </tr>
                            <tr className="mt-0 text-gray-400 text-lg">
                                <td className="m-0 p-0 float-left">
                                K/D
                                </td>
                                <td className="m-0 p-0 float-right">
                                    KPM
                                </td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                            <div className="flex flex-wrap justify-center">
                        {last_matches_box}
                    </div>
                    </div>
                } />
            </div>
            {/*<img className="w-full absolute opacity-30 saturate-50 mask-radial" src="images/potential/4CBDDA80.png" />*/}
        </div>
    );

}