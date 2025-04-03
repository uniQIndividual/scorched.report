import React from "react";
import { type Scorcher } from "../../lib/entities";
import SCORCHED_CANNONS from "../../lib/cannons";
import { D2Box } from "./D2Box";


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
                <D2Box title={"Info"} body={
                    <div className="p-4">
                        Sign up with the Scorched Bot to earn Scorched Coins. <br />
                        Once you have enough scoins you can purchase cannons with <span className="font-bold">/shop</span>
                    </div>
                } />
                {seasons.map(season => {
                    return <D2Box title={SCORCHED_CANNONS[season]?.name + " - " + (props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] != null ? Math.min(props.minigame.ownedCannons[season].length, SCORCHED_CANNONS[season]?.cannons.length) : 0) + "/" + SCORCHED_CANNONS[season]?.cannons.length} body={
                        <div className="mt-10" key={season + "_profile_showcase"}>
                            <div className="flex flex-wrap justify-center">
                                {SCORCHED_CANNONS[season]?.cannons.map(cannon => {
                                    return <div key={cannon.name + "_profile_season_showcase"}>
                                        <img src={cannon.image.replace("/cannons/", props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] != null && props.minigame.ownedCannons[season].some(c => c.base_cannon_hash == cannon.hash) ? "/cannons/smaller/" : "/cannons/missing/")} className={(props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] && props.minigame.ownedCannons[season].some(c => c.base_cannon_hash == cannon.hash) ? "" : "grayscale brightness-75 ") + " max-h-28 object-scale-down w-[140px] sm:w-[200px]"} />
                                    </div>
                                })}
                            </div>
                        </div>
                    } />
                })}
                <div className="flex justify-center mt-8">
                </div>
            </div>
        )
    } catch (error) {
        console.log(error);

    }
}