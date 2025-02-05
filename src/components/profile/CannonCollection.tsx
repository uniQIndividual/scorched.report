import React from "react";
import { type Scorcher } from "../../lib/entities";
import SCORCHED_CANNONS from "../../lib/cannons";


export const CannonCollection = (props: Scorcher) => {

    React.useEffect(() => {
        try {
            // Load Scorched Cannon progress

        } catch (error) {

        }
    }, []);

    const seasons = Object.keys(SCORCHED_CANNONS)

    try {
        return (
            <div className="">
                <div className="text-5xl text-gray-100 flex justify-center mt-2 font-semibold text-center">Scorched Cannon Progress</div>
                {seasons.map(season => {
                    return <div className="mt-10" key={season + "_profile_showcase"}>
                        <div className="text-3xl w-full text-gray-200 mb-8 ml-[5%]">{SCORCHED_CANNONS[season]?.name}
                            <span className="text-gray-200 text-2xl ml-5">{props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] != null ? props.minigame.ownedCannons[season].length : 0}/<span className="text-gray-100">{SCORCHED_CANNONS[season]?.cannons.length}</span>
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {SCORCHED_CANNONS[season]?.cannons.map(cannon => {
                                return <div key={cannon.name + "_profile_season_showcase"}>
                                    <img src={cannon.image.replace("/cannons/", props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] != null && props.minigame.ownedCannons[season].some(c => c.base_cannon_hash == cannon.hash) ? "/cannons/smaller/" : "/cannons/missing/")} className={(props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] && props.minigame.ownedCannons[season].some(c => c.base_cannon_hash == cannon.hash) ? "" : "grayscale brightness-75 ") + " max-h-28 object-scale-down w-[140px] sm:w-[200px]"} />
                                </div>
                            })}
                        </div>
                    </div>
                })}
                <div className="flex justify-center mt-8">
                </div>
            </div>
        )
    } catch (error) {
        console.log(error);

    }
}