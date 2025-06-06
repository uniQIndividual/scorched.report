/*
Display information as a d2 hover box
multiple children are displayed with a vertical separator
*/
import { Children, type ReactNode } from "react"

export const ToolTipDestiny = ({ title, details, children, colorScheme, heroImage }:
    { title: string, details?: boolean, children: ReactNode, colorScheme?: string[], heroImage?: ReactNode }) => {
    if (window.innerWidth < 1024) {
        return "";
    }

    return (
        <div
            role="tooltip"
            className="invisible peer-hover:visible fixed destiny-tooltip z-50 m-8 font-bungo tracking-wider transition-opacity duration-300 shadow-sm min-w-[400px] text-gray-200 max-w-[400px] max-h-[600px] text-[0px]  peer-hover:text-base left-0 top-0"
        >
            {colorScheme && colorScheme.length > 2
                ? <div className={"pt-1 " + colorScheme[2]}></div>
                : ""}
            <div className={(colorScheme ? colorScheme[0] : "bg-[rgba(65,66,62,0.9)]") + " px-4 py-2 text-white font-semibold uppercase text-3xl"}>
                {title}
            </div>
            {heroImage ? heroImage : ""}
            {Children.map(children, (child, index) => {
                return <div>
                    {/* Add section divider */}
                    {index > 0 ?
                        <div className="pt-0.5 bg-[rgba(149,150,154,0.8)]">
                        </div> : ""}
                    <div className={(colorScheme ? colorScheme[1] : "bg-[rgba(20,20,20,0.9)]") + " px-4 py-2"}>
                        {child}
                    </div>
                </div>
            })}
            {
                details ? (
                    <div className="bg-[rgba(1,1,1,1)] p-1 text-right text-sm font-medium">
                        <div className="float-right pr-[90px]">
                            <svg
                                className="absolute mx-auto mb-1 fill-gray-100 h-6 sm:h-8 p-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={"0 0 814 1000"}
                            >
                                <metadata>
                                    Copyright (c) Bungie, 2015. All rights reserved.
                                </metadata>
                                <path
                                    transform="matrix(1 0 0 -1 0 800)"
                                    d="M100 119v355c77 -15 154 -23 233 -26c8 -35 39 -61 76 -61c39 0 69 26 77 61c75 3 151 11 228 26v-355c0 -132 -108 -239 -240 -239h-135c-132 0 -239 107 -239 239zM434 621v-167c0 -12 -10 -22 -25 -22s-25 10 -25 22v167c0 12 10 21 25 21s25 -9 25 -21zM714 638v-67
c-74 -14 -149 -23 -226 -27v73c0 27 -13 49 -33 64v196h19c132 0 240 -107 240 -239z"
                                ></path>
                            </svg>
                            <svg
                                className="absolute z-10 mx-auto mb-1 fill-primary-700 h-6 sm:h-8 p-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={"0 0 1000 1000"}
                            >
                                <metadata>
                                    Copyright (c) Bungie, 2015. All rights reserved.
                                </metadata>
                                <path
                                    transform="matrix(1 0 0 -1 0 800)"
                                    d="M339 877h20v-199c-17 -15 -29 -37 -29 -61v-73c-77 3 -154 12 -230 27v67c0 132 107 239 239 239z"
                                ></path>
                            </svg>
                        </div>
                        <div className="py-1 pr-2">Details</div>
                    </div>
                ) : (
                    ""
                )
            }
        </div>

    )
}