import { Link } from "react-router";
import SCORCHED_CANNONS from "../../lib/cannons";
import { ToolTipDestiny } from "./ToolTipDestiny";
import { cannonSeasonNameToURL } from "../../lib/fun";

export const ShowcaseOverview = () => {
    return (
        <div className="table mx-2 mt-6 lg:mt-0">
            <div className="lg:table-row-group hidden">
                <div className="table-cell">
                    <div className="peer hover:brightness-125 font-medium text-gray-200 float-right mb-8 text-xl flex">
                        <img className="w-6 mr-2 align-middle" src="/images/icons/scoin_26px.png" />
                        <span>0</span>
                    </div>
                    <ToolTipDestiny title="Scoins" >
                        <div>Earn Scoins by playing Team Scorched after you've signed up with the bot.</div>
                    </ToolTipDestiny>
                </div>
            </div>
            <div className="table-row-group">
                <div
                    className="table-cell border-b-2 border-[rgb(149,150,154)] lg:min-w-96 text-[rgb(149,150,154)]"
                >
                    <div className="font-medium text-lg">SEASON ARCHIVE</div>
                </div>
            </div>
            <div className="table-row-group">
                <div className="table-cell">
                    <div className="flex flex-wrap my-2 justify-center lg:justify-normal">
                        {
                            Object.entries(SCORCHED_CANNONS).map((season) => {
                                if (season[0] === "3064974266") {
                                    return;
                                }
                                return (
                                    <div key={"archive_table_season_" + season[0]}>
                                        <Link to={"/showcase/" + cannonSeasonNameToURL(season[1].name)} viewTransition >
                                            <div className="peer p-[3px] hover:p-[2px]  hover:border border-[rgb(149,150,154)] hover:brightness-125 hover:!cursor-pointer lg:mx-1">
                                                <img className="" src="/images/collection/season_exotic_placeholder.webp" />
                                            </div>
                                            <ToolTipDestiny title={season[1].name} details={true}>
                                                <div>
                                                    All scorch cannons from {season[1].name}.
                                                </div>
                                            </ToolTipDestiny>
                                        </Link>
                                        <div className="text-center text-gray-100 font-bungo lg:hidden mx-[3px] mb-4 p-y-2 text-lg backdrop-blur-sm bg-[rgba(0,0,0,0.3)]">
                                            {season[1].name}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="table-row-group">
                <div
                    className="table-cell border-b-2 border-[rgb(149,150,154)] lg:min-w-96 text-[rgb(149,150,154)] pt-8"
                >
                    <div className="font-medium text-lg">SPECIAL CANNONS</div>
                </div>
            </div>
            <div className="table-row-group">
                <div className="table-cell">
                    <div className="flex flex-wrap my-2 justify-center lg:justify-normal">
                        <div>
                            <Link to={"/showcase/special-cannons"} viewTransition >
                                <div
                                    className="peer p-[3px] hover:p-[2px]  hover:border border-[rgb(149,150,154)] hover:brightness-125 hover:!cursor-pointer lg:mx-1"
                                >
                                    <img src="/images/collection/season_special_placeholder.webp" />
                                </div>
                                <ToolTipDestiny title="SPECIAL CANNONS" details={true}>
                                    <div>All scorch cannons from special events and promotions.</div>
                                </ToolTipDestiny>
                            </Link>
                            <div className="text-center text-gray-100 font-bungo lg:hidden mx-[3px] mb-4 p-y-2 text-lg backdrop-blur-sm bg-[rgba(0,0,0,0.3)]">
                                {'Special Cannons'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};