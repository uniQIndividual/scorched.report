import { useState } from "react"
import { ToolTipDestiny } from "../showcase/ToolTipDestiny"
import { TimelineElement } from "./TimelineElement"
import { timelineEvents } from "../../lib/timelineEvents"
import React from "react"


export const SETimeline = () => {
    const [activeBackground, setActiveBackground] = React.useState("");
    const useMobileLayout = window.innerWidth < 1024;
    const timelineDefaulsEntries: {
        title: string,
        date: string,
        icon: string,
        tooltipTitle: string,
        tooltipDescription: string,
        tooltipImage: string | undefined,
        backgroundImage: string | undefined,
        link: string | undefined,
        hash: `${string}-${string}-${string}-${string}-${string}`
    }[] = [];
    const [timelineEntries, setTimelineEntries] = React.useState(timelineDefaulsEntries)
    const showBackground = (id: string) => {
        document.getElementById(id)?.classList.remove("animate-fade-out")
        document.getElementById(id)?.classList.add("animate-fade-in")
        document.getElementById(id)?.classList.add("opacity-50")
        document.getElementById(id)?.classList.remove("opacity-0")
    }
    const hideBackground = (id: string) => {
        document.getElementById(id)?.classList.remove("animate-fade-in")
        document.getElementById(id)?.classList.add("animate-fade-out")
        document.getElementById(id)?.classList.remove("opacity-50")
        document.getElementById(id)?.classList.add("opacity-0")
    }

    React.useEffect(() => {
        const newTimelineEvents = timelineEvents
            .map(entry => {
                return {
                    "title": entry.title,
                    "date": entry.date,
                    "icon": entry.icon,
                    "tooltipTitle": entry.tooltipTitle,
                    "tooltipDescription": entry.tooltipDescription,
                    "tooltipImage": entry.tooltipImage,
                    "backgroundImage": entry.backgroundImage,
                    "link": entry.link,
                    "hash": crypto.randomUUID()
                }
            })
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setTimelineEntries(newTimelineEvents);

        if (window.innerWidth < 1024) {
            window.addEventListener("click", (event) => {
                newTimelineEvents.map(entry => {
                    const entryElement = document.getElementById("eventBox-" + entry.hash);
                    if (entryElement && event.target && entryElement.contains(event.target as Node)) {
                        // Clicked on a valid event entry; remove previous one and change to new
                        setActiveBackground((prev) => {
                            if (prev != "") {
                                hideBackground(prev);
                            }
                            showBackground(entry.hash);
                            return entry.hash
                        })
                    }
                })
            })
        }
    }, [])
    return <>
        {timelineEntries.map(entry => (
            <img
                key={"backgroundImage" + entry.hash}
                src={entry.backgroundImage}
                id={entry.hash}
                className="fixed top-0 object-cover object-center justify-center no-fullscreen h-full w-full opacity-0 grayscale-50 contrast-125 -z-10"
                loading="lazy" />
        ))}
        <img
            src="/images/potential/timeline_mask.png"
            className="fixed top-0 object-fill object-top justify-center no-fullscreen h-full w-full brightness-0 opacity-90 -z-10"
            loading="eager" />
        {/*<div className="absolute mt-[42px] align-middle flex items-center h-dvh">
            <img src="/images/potential/timeline_1px_divider.png" />
        </div>*/}
        <div className="mt-[84px] pb-0 lg:pb-16 z-10 align-middle flex flex-col justify-center items-center min-h-dvh">
            <div className="font-extralight tracking-wider text-gray-950 dark:text-white mb-4 lg:mb-12 flex justify-center text-center lg:text-3xl">
                The Scorched Enthusiasts Timeline
            </div>
            <TimelineElement>
                {timelineEntries.map(entry => (
                    <div className="my-auto"
                    >
                        {entry.link && !useMobileLayout ?
                            <a
                                className="mt-3 lg:flex z-10 relative peer cursor-pointer hover:brightness-125"
                                target="_blank"
                                href={entry.link}
                                onMouseOver={(event) => showBackground(entry.hash)}
                                onMouseLeave={(event) => hideBackground(entry.hash)}
                            >
                                <img src={entry.icon} className="h-14 lg:h-20" />
                                <div className="ml-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white uppercase tracking-widest text-base lg:text-3xl wrap-anywhere lg:wrap-break-word">
                                        {entry.title}
                                    </h3>
                                    <time dateTime={entry.date} className="block mb-2 text-sm font-normal leading-none text-gray-800 dark:text-gray-200">
                                        {new Date(entry.date).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </a>
                            :
                            <div
                                className="mt-3 lg:flex z-10 relative peer cursor-pointer hover:brightness-125 backdrop-blur-[0px] lg:backdrop-blur-none"
                                id={"eventBox-" + entry.hash}
                                onMouseOver={(event) => showBackground(entry.hash)}
                                onMouseLeave={(event) => hideBackground(entry.hash)}
                            >
                                <img src={entry.icon} className="h-14 lg:h-20 object-scale-down" />
                                <div className="ml-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white uppercase tracking-widest text-base lg:text-3xl  wrap-anywhere lg:wrap-break-word">
                                        {entry.title}
                                    </h3>
                                    <time dateTime={entry.date} className="block mb-2 text-sm font-normal leading-none text-gray-800 dark:text-gray-200">
                                        {new Date(entry.date).toLocaleString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                    {entry.link ?

                                        <a
                                            className="mt-3 lg:flex z-10 relative peer cursor-pointer hover:brightness-125"
                                            target="_blank"
                                            href={entry.link}
                                        >
                                            Read more
                                        </a>
                                        : ""}
                                </div>
                            </div>
                        }
                        <ToolTipDestiny
                            title={entry.tooltipTitle}
                            colorScheme={["bg-primary-900", "bg-[rgba(20,20,20,0.9)]", "bg-primary-600"]}
                            heroImage={entry.tooltipImage ?
                                <img
                                    src={entry.tooltipImage}
                                    className="object-cover object-center w-full max-h-32 backdrop-blur-md"
                                    loading="lazy"
                                />
                                : undefined
                            }
                            details={entry.link != undefined}
                        >
                            <div className="leading-5 my-2 whitespace-pre-line">
                                {entry.tooltipDescription}
                            </div>
                        </ToolTipDestiny>
                    </div>
                ))}
            </TimelineElement>
        </div>
        {/* 
        <div className="fixed flex right-5 bottom-0 p-2">
            <div className="flex shrink-0 mr-4">
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
M750 128l-52 -52l-304 305l304 305l52 -51l-253 -254z"
                    >
                    </path>
                </svg>
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
                        d="M316 -69h572c77 0 162 88 162 168v566c0 83 -83 166 -167 166h-567c-83 0 -166 -83 -166 -166v-566c0 -83 82 -168 162 -168h4zM894 -119h-588c-101 0 -206 105 -206 206v588c0 101 105 206 206 206h588c101 0 206 -105 206 -206v-588c0 -101 -105 -206 -206 -206z
M503 77l-51 52l253 253l-253 254l51 51l305 -305z"
                    >
                    </path>
                </svg>
                <div className="px-2 lg:pl-0 text-white text-lg font-bungo">Change Page</div>
            </div>
            <div className="flex shrink-0">
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
        </div>*/}
    </>
}