import { type Scorcher } from "../../lib/entities";
import SCORCHED_CANNONS from "../../lib/cannons";
import { D2Box } from "./D2Box";


export const CannonCollection = (props: Scorcher) => {
    const seasons = Object.keys(SCORCHED_CANNONS)
    try {
        return (
            <div className="flex flex-wrap justify-center">
                <D2Box title={"Info"} body={
                    <div className="p-4 w-full block">
                        Sign up with the Scorched Bot to earn Scorched Coins. <br />
                        Once you have enough scoins you can purchase cannons with <span className="font-bold">/shop</span> <br />
                        <br />
                        You can find all Scorched Cannons in the <a className="stylized-link" href="/showcase">collection</a>.
                    </div>
                } />
                <D2Box title={"Scoins"} body={
                    <div className="p-4 w-full block">
                        Season 3: <span className="font-bold text-black dark:text-white">{Number(props.minigame.scoins.S3 || 0).toLocaleString()}</span>
                        <br />
                        Previous seasons: <span className="font-bold text-black dark:text-white">{Number(props.minigame.scoins.old || 0).toLocaleString()}</span>
                    </div>
                } />
                {seasons.map(season => {
                    if (SCORCHED_CANNONS[season] == undefined) {
                        return <></>
                    }
                    return <D2Box title={SCORCHED_CANNONS[season]?.name + " - " + (props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] != null ? Math.min(props.minigame.ownedCannons[season].length, SCORCHED_CANNONS[season]?.cannons.length) : 0) + "/" + SCORCHED_CANNONS[season]?.cannons.length} body={
                        <div className="m-4 sm:m-10" key={season + "_profile_showcase"}>
                            <div className="flex flex-wrap justify-center">
                                {SCORCHED_CANNONS[season].cannons.map(cannon => {
                                    let unlocked = props.minigame.ownedCannons.hasOwnProperty(season) && props.minigame.ownedCannons[season] && props.minigame.ownedCannons[season].some(c => c.base_cannon_hash == cannon.hash);

                                    return <div key={cannon.name + "_profile_season_showcase"} className="p-1">
                                        <img src={cannon.image.replace("/cannons/", unlocked ? "/cannons/smaller/" : "/cannons/missing/")} className={(unlocked ? "" : "grayscale brightness-75 ") + " max-h-28 object-scale-down w-[120px] sm:w-[200px]"} />
                                        <div className="mt-1 text-center flex justify-center">
                                            {cannon.name}
                                        </div>
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
        return <div>An error occurred</div>
    }
}