import { Link, useNavigate } from "react-router";
import SCORCHED_CANNONS, { type SCORCHED_SEASON_TYPE } from "../../lib/cannons";
import { cannonSeasonNameToURL } from "../../lib/fun";
import { ToolTipDestiny } from "./ToolTipDestiny";
import { useEffect } from "react";

export const ShowcaseSeason = () => {
    const navigate = useNavigate();
    const season_from_path = location.pathname.split("/").slice(-1)[0];
    let scorched_season: SCORCHED_SEASON_TYPE = null;

    Object.entries(SCORCHED_CANNONS).map(season => {
        if (cannonSeasonNameToURL(season[1].name) == season_from_path) {
            scorched_season = season[1];
        }
    })

    if (scorched_season === null) {
        return <div>Nothing here</div>
    } else {
        scorched_season
    }

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                console.log("as");
                navigate("/showcase", { viewTransition: true }) // go back to the showcase
            }
        }
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [])

    return (
        <>
            <div className="table mb-10 mx-2 mt-6 lg:mt-0">
                <div className="lg:table-row-group hidden">
                    <div className="table-cell">
                        <div className="peer hover:brightness-125 font-medium text-gray-200 float-right mb-8 text-xl flex">
                            <img className="w-6 mr-2 align-middle" src="/images/potential/scoin.png" />
                            <div>0</div>
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
                        <div className="font-medium text-lg">{scorched_season.name}</div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-cell">
                        <div className="flex flex-wrap my-2 justify-center lg:justify-normal">
                            {
                                Object.entries(scorched_season.cannons)
                                    .sort((a, b) => a[1].cost - b[1].cost)
                                    .map((cannon) => {
                                        return (
                                            <div key={"archive_cannon_showcase_" + cannon[0]}>
                                                <a href={"/collections/" + cannon[0]}>
                                                    <div className="peer p-[3px] hover:p-[2px]  hover:border border-[rgb(149,150,154)] hover:brightness-125 hover:!cursor-pointer">
                                                        {cannon[1].hasOwnProperty("3d") ?
                                                            <img
                                                                src="/images/3d/3d_small.webp"
                                                                className="absolute h-4 hover:brightness-110 !cursor-pointer m-1"
                                                                loading="eager"
                                                            />
                                                            : ""}
                                                        <img className="lg:max-w-52 border border-[rgb(149,150,154)]" src={cannon[1].image.replace("/cannons/", "/cannons/smaller/")} />
                                                    </div>
                                                    <ToolTipDestiny title={cannon[1].name} details={true} colorScheme={["bg-[rgba(199,168,58,0.8)]", "bg-[rgba(51,47,29,0.8)]"]}>
                                                        <div>
                                                            {cannon[1].alt_name != "" ?
                                                                <div className="font-semibold mb-4">
                                                                    {cannon[1].alt_name}
                                                                </div>
                                                                : ""}
                                                            <div>
                                                                Created by {cannon[1].author}
                                                            </div>
                                                            {cannon[1].description != "" ?
                                                                <div className="italic mt-4">
                                                                    {cannon[1].description}
                                                                </div>
                                                                : ""}
                                                        </div>
                                                        <div className="table-row">
                                                            <div className="table-cell w-full">
                                                                <img className="inline pr-1" src="/images/icons/scoin_26px.png" />
                                                                Scoins
                                                            </div>
                                                            <div className="table-cell w-full text-right font-bungo font-medium text-nowrap">
                                                                <div className="text-primary-600 inline">0</div>
                                                                <div className="px-1 inline">/</div>
                                                                <div className="inline">{cannon[1].cost}</div>
                                                            </div>
                                                        </div>
                                                    </ToolTipDestiny>
                                                </a>
                                                <div className="text-center text-gray-100 font-bungo lg:hidden mx-[3px] mb-4 p-y-2 text-lg backdrop-blur-sm bg-[rgba(0,0,0,0.5)]">
                                                    {cannon[1].name}
                                                </div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Link to={"/showcase"}>
                <div className="fixed flex right-5 bottom-0 p-2 hover:brightness-125 bg-[rgba(255,255,255,0.1)] lg:bg-[rgba(255,255,255,0)] hover:bg-[rgba(255,255,255,0.1)]">
                    <svg
                        className=" fill-gray-100 h-6 mt-0.5 hidden lg:block"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={"0 0 1800 1100"}
                    >
                        <metadata>
                            Copyright (c) Bungie, 2015. All rights reserved.
                        </metadata>
                        <path
                            transform="matrix(1 0 0 -1 0 900)"
                            d="M884 831h-572c-77 0 -162 -88 -162 -168v-566c0 -83 83 -166 167 -166h567c83 0 166 83 166 166v566c0 83 -82 168 -162 168h-4zM306 881h588c101 0 206 -105 206 -206v-588c0 -101 -105 -206 -206 -206h-588c-101 0 -206 105 -206 206v588c0 101 105 206 206 206z
M219 204v362h255v-57h-188v-90h165v-54h-165v-102h192v-59h-259zM494 284h60c4 -31 27 -45 62 -45s50 15 50 36c0 27 -27 31 -67 39c-49 8 -96 22 -96 80c0 49 42 77 103 77c69 0 103 -30 110 -77h-59c-4 23 -21 35 -51 35c-29 0 -44 -12 -44 -31c0 -23 27 -27 66 -35
c49 -8 98 -22 98 -84c0 -55 -47 -83 -111 -83c-75 0 -117 35 -121 88zM745 334c0 77 52 137 132 137c67 0 108 -38 117 -94h-61c-7 29 -25 47 -56 47c-45 0 -69 -38 -69 -90c0 -51 24 -90 69 -90c35 0 54 18 58 55h60c-4 -61 -47 -103 -118 -103c-80 0 -132 61 -132 138z
"
                        >
                        </path>
                    </svg>
                    <div className="px-2 lg:pl-0 text-white text-lg font-bungo">Return</div>
                </div>
            </Link>
        </>
    );
};