import { type Scorcher } from "../../lib/entities";
import { D2Box } from "./D2Box";
import { Tooltip } from "react-tooltip";


export const Medals = (props: Scorcher) => {

    try {
        return (
            <div className="flex flex-wrap justify-center">
                {[3, 2, 1].map(tier => // create a box for each tier
                    <D2Box key={"profile_medal_section_tier" + tier} title={"Tier " + tier} body={
                        <div className="" key={"_profile_showcase"}>
                            <div className="flex flex-wrap justify-center">
                                {Object.keys(props.bungieHistoricMedals).map(medal => {
                                    return props.bungieHistoricMedals[medal]!.medalTierIdentifier == ("PVP_TIER_" + tier) ?
                                        <div key={medal + "_profile_season_showcase"} className="p-4">
                                            <div className="flex justify-center p-2" data-tooltip-id={medal + "_tooltip"}
                                                data-tooltip-html={props.bungieHistoricMedals[medal]!.statDescription}>
                                                <img src={"https://bungie.net" + props.bungieHistoricMedals[medal]!.iconImage} className="w-12 h-12" />
                                            </div>
                                            <div className=" text-center align-middle ">
                                                <span className="font-semibold text-gray-950 dark:text-white">{props.bungieHistoricMedals[medal]!.value + "x "}</span> {props.bungieHistoricMedals[medal]!.statName}
                                            </div>
                                            <div className="text-center align-middle text-sm text-gray-600 dark:text-gray-400">
                                                {(props.bungieHistoricMedals[medal]!.value / Math.max(props.bungieHistoricAccountStats.activitiesEntered, 1)).toLocaleString(undefined, {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2,
                                                }) + " pga"}
                                            </div>
                                            <Tooltip id={medal + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(20,20,20,0.9)" }} />
                                        </div>
                                        : <></>
                                }).filter(a => a != <></>)}
                            </div>
                        </div>
                    } />
                )}
                <D2Box title={"Info"} body={
                    <div className="p-4">
                        <div className="">
                            Due to <a href="/faq#missing-data" target="_blank" className="underline underline-offset-2 hover:text-gray-950 hover:dark:text-gray-100">known issues with Bungie's API</a> some medals will be missing. The actual numbers should be about 5% higher.
                        </div>
                    </div>
                } />
            </div>
        )
    } catch (error) {
        console.log(error);
        return <div>An error occurred</div>
    }
}