import { Children, type ReactNode } from "react"


export const TimelineElement = ({ children }:
    { children: ReactNode }) => {
    return (
        <div className="flex justify-center columns-3 mx-2 lg:mx-20">
            <ol className="-mr-[1px] max-w-[600px]">
                {Children.map(children, (child, index) =>
                    index % 2 == 1 ? <></> : (
                        <li className="relative flex clear-both mb-6 sm:mb-0 lg:opacity-70 peer peer-hover:opacity-20 hover:opacity-100 transition-all duration-200 float-right"
                        >
                            {child}
                            <img className="my-auto h-[1px] w-[20px] lg:w-[82px]" src="/images/potential/timeline_line.png" />
                            <img className="flex w-[1px] object-cover" src="/images/potential/timeline_1px_divider_rotated_scaled.png" />
                        </li>
                    ))}
            </ol>
            <img className="object-cover w-[1px]" src="/images/potential/timeline_1px_divider_rotated.png" />
            <ol className="mt-[150px] -ml-[1px] max-w-[600px]">
                {Children.map(children, (child, index) =>
                    index % 2 == 0 ? <></> : (
                        <li className="relative flex clear-both mb-6 sm:mb-0 lg:opacity-70 peer peer-hover:opacity-20 hover:opacity-100 transition-all duration-200 float-left w-f"
                        >
                            <img className="flex w-[1px] object-cover" src="/images/potential/timeline_1px_divider_rotated_scaled.png" />
                            <img className="my-auto rotate-180 h-[1px] w-[20px] lg:w-[82px]" src="/images/potential/timeline_line.png" />
                            {child}
                        </li>
                    ))}
            </ol>
        </div>
    )
}