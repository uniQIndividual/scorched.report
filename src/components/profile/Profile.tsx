import React from "react";
import { type Scorcher } from "../../pages/entities";
import { awards, medalsBungie } from "../../pages/entities";
import { Tooltip } from 'react-tooltip'
import SCORCHED_CANNONS from "../../lib/cannons";


export const Profile = (stats: Scorcher) => {

    // Reorder the awards
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    const awardKeys = Object.keys(stats.awards);
    awardKeys.move(0, 6)

    const emblemLength = awardKeys.map(value => (stats.awards[value] === true ? 1 : 0))
        .reduce((sum, current) => sum + current, 0); // Let's print a max of 8 awards per row
    const wrapEmblems = emblemLength > 6;

    const iconSize = wrapEmblems ? "22px" : "26px";
    const glowOffset = wrapEmblems ? "11px" : "13px";

    const hoverText = (award: string) => {
        return `<div style="padding: 12px; z-index: 11000; max-width: 240px; ">
            <table >
            <tbody>
                <tr>
                <td style="justify-content: center; display: flex; padding: 12px;">
                    <div style=" position: absolute; transform: rotate(45deg);` +
            (awards[award].glow == "shadow-awardGlow" ? "box-shadow: 44px 44px 50px 30px rgba(240,217,170,0.8)" : "") +
            (awards[award].glow == "shadow-awardGlowRed" ? "box-shadow: 44px 44px 50px 30px rgba(212,47,47,0.9)" : "") +
            `"></div>
                    <img style="" src=` + awards[award].src + ` />
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 6px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.5rem; color: rgb(255 255 255); z-index: 110;">
                        ` + awards[award].text + `
                    </div>
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 12px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.125rem; color: rgb(255 255 255); z-index: 110;">
                        ` + awards[award].description + `
                    </div>
                    </td>
                </tr>
               </tbody>
            </table>
        </div>`};

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
    const noCannon = stats.minigame.selectedSeason == "" || stats.minigame.equippedCannons[stats.minigame.selectedSeaso] == undefined;
    const equippedSeason = noCannon ? "S1" : stats.minigame.selectedSeason
    const equippedCannon = noCannon ? 3 : SCORCHED_CANNONS[equippedSeason]?.cannons.map((item, i) => {
        if (item.hash === stats.minigame.equippedCannons[equippedSeason].base_cannon_hash) return i;
    }).filter((i) => i != undefined); // 1 == ScornchedCannon



    return (
        <div className="block mt-4 h-max w-[474px] ">
            <div className="bg-no-repeat w-[474px] h-[96px]" style={{ backgroundImage: (stats.profile.bannerUrl != "" ? "url(https://www.bungie.net" + stats.profile.bannerUrl + ")" : "") }}>
                <table className=" ml-[86px] w-[388px]">
                    <tbody>
                        <tr className="mt-1">
                            <td className="m-0 p-0">
                                <table className="mr-2 h-12">
                                    <tbody>
                                        <tr>
                                            <td className=" text-white text-3xl font-bungo leading-none m-0 p-0  w-[388px]">
                                                <span className="max-w-[268px] block truncate ...">
                                                    {stats.profile.profileName}
                                                </span>
                                                {/*<div className="w-[268px] h-[48px]">
                                                    <svg viewBox="0 0 48 26" width={"100%"} height={"100%"}>
                                                        <text x="-48" y="20" textAnchor="">{"12345678901234567890"}</text>
                                                    </svg></div>*/}
                                            </td>
                                            <td className="font-bungo font-[500] text-[#D3BF4A] text-[42px] pr-3 leading-none m-0 p-0 left-0 text-right flex">
                                                <img src="/images/icons/ll.png" className="w-[14px] h-[14px] float-right object-scale-down mt-2" />
                                                {stats.profile.lightLevel}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table className="mr-2 h-12">
                                    <tbody>
                                        <tr>
                                            <td className=" text-white opacity-40 font-bungo text-[22px] leading-none m-0 p-0 w-[218px] h-[48px] ">
                                                <span className="w-[218px]  pt-2 block truncate ...">
                                                    {stats.profile.clanName}
                                                </span>
                                            </td>
                                            <td className={"w-[170px] max-h-12 h-[" + { iconSize } + "] leading-none m-0 p-0 left-0 text-right"}>
                                                {awardKeys.map((award) => {
                                                    return stats.awards[award] ? (
                                                        <div key={"div_" + award}>
                                                            <a
                                                                data-tooltip-id={award + "_tooltip"}
                                                                data-tooltip-html={hoverText(award)}
                                                                className={"w-[" + iconSize + "] h-[" + iconSize + "] float-right ml-1"}
                                                            >
                                                                <div style={{ marginTop: glowOffset, marginLeft: glowOffset }} className={awards[award].glow + " absolute rotate-45"}></div>
                                                                <img src={awards[award].src} key={"img_" + award} width={iconSize} height={iconSize} className="float-right " />
                                                            </a>
                                                            <Tooltip id={award + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                                                        </div>
                                                    ) : ""
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-8 w-[470px] px-2 mt-8 mx-2 my-2 ">
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
                        <span className={"flex justify-center mt-2 text-gray-100 text-xl font-medium" + (stats.bungieHistoricAccountStats.medals[medal] == 0 ? " opacity-30" : "")}>{stats.bungieHistoricAccountStats.medals[medal]}</span>
                        <Tooltip id={medal + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                    </div>
                    </div> : ""
                })
                }
            </div>
            <div className="flex justify-center px-2 mt-6 mx-2 my-2 ">
                <table className="w-full">
                    <tbody className="">
                        <tr className="text-gray-200 text-3xl">
                            <td className="m-0 p-0 float-left">
                                {stats.performance.trueSkill}
                            </td>
                            <td className="m-0 p-0 float-right">
                                {(stats.performance.kills / stats.performance.deaths).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
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
                        <tr className="text-gray-200 text-3xl">
                            <td className="m-0 p-0 float-left pt-3">
                                {(stats.performance.kills).toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })}
                            </td>
                            <td className="m-0 p-0 float-right pt-3">
                                {(stats.performance.kills / (stats.performance.timeSpent / 60)).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
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
            <div className="flex justify-center mt-10">
                <img className="" src={SCORCHED_CANNONS[equippedSeason]?.cannons[equippedCannon]?.image} />
            </div>
            <div>
                <table className="w-full">
                    <tbody className="">
                        <tr className="text-gray-200 text-3xl">
                            <td className="m-0 p-0 float-left pt-3">
                            {SCORCHED_CANNONS[equippedSeason]?.cannons[equippedCannon]?.name}
                            </td>
                            <td className="m-0 p-0 float-right pt-3">
                                {(noCannon? "0" : stats.minigame.equippedCannons[equippedSeason].kills).toLocaleString()}
                            </td>
                        </tr>
                        <tr className="mt-0 text-gray-400 text-lg">
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
        </div>
    );

}