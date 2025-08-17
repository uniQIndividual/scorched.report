import { type Scorcher } from "../../lib/entities";
import SCORCHED_CANNONS from "../../lib/cannons";
import { D2Box } from "./D2Box";
import { cannonBungieTooltip } from "../../lib/fun";


export const CannonCollection = (props: Scorcher) => {
    const seasons = Object.entries(SCORCHED_CANNONS)
    try {
        return (
            <div className="flex flex-wrap justify-center">
                <D2Box title={"Info"} body={
                    <div className="p-4 w-full block">
                        Sign up with the Scorched Bot to earn Scorched Coins. <br />
                        Once you have enough Scoins you can purchase cannons with <span className="font-bold">/shop</span> <br />
                        <br />
                        You can find all Scorch Cannons in the <a className="stylized-link" href="/showcase">collection</a>.
                    </div>
                } />
                <D2Box title={"Scoins"} body={
                    <div className="p-4 w-full block">
                        Season 3: <span className="font-bold text-black dark:text-white">{Number(props.minigame.scoins["1047977623"] || 0).toLocaleString()}</span>
                        <br />
                        Previous seasons: <span className="font-bold text-black dark:text-white">{Number(props.minigame.scoins["1031377680"] || 0).toLocaleString()}</span>
                    </div>
                } />
                {seasons.map(season => {
                    const numberSeasonCannons = Object.keys(season[1].cannons).length;
                    const numberOwnedCannons = (props.minigame.ownedCannons.hasOwnProperty(season[0]) && props.minigame.ownedCannons[season[0]] != null
                        ? Math.min(numberSeasonCannons, props.minigame.ownedCannons[season[0]]!.length)
                        : 0)
                    const ownedCannonsFlattened = (props.minigame.ownedCannons.hasOwnProperty(season[0])
                        && props.minigame.ownedCannons[season[0]])
                        ?
                        props.minigame.ownedCannons[season[0]]!.flatMap((item) => String(item.base_cannon_hash))
                        :
                        [];

                    return <D2Box
                        key={"profile_section_seasons_" + season[0]}
                        title={season[1].name + " - " + numberOwnedCannons + "/" + numberSeasonCannons}
                        body={
                            <div className="m-4 sm:m-10" key={season + "_profile_showcase"}>
                                <div className="flex flex-wrap justify-center">
                                    {Object.entries(season[1].cannons)
                                        .sort((a, b) => a[1].cost - b[1].cost)
                                        .map(cannon => {
                                            let unlocked = ownedCannonsFlattened.includes(cannon[0]);

                                            return <a
                                            href={"/collections/" + cannon[0]}
                                            target="_blank"
                                            >
                                            <div
                                            key={cannon[1].name + "_profile_season_showcase"}
                                            className="peer p-1 hover:brightness-150 hover:!cursor-pointer">
                                                <img src={cannon[1].image.replace("/cannons/", unlocked ? "/cannons/smaller/" : "/cannons/missing/")} className={(unlocked ? "" : "grayscale brightness-75 ") + " max-h-28 object-scale-down w-[120px] sm:w-[200px]"} />
                                                <div className="mt-1 text-center flex justify-center">
                                                    {cannon[1].name}
                                                </div>
                                            </div>
                                            {cannonBungieTooltip(cannon)}
                                            </a>
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