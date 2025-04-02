import type { ReactElement } from "react";


interface Props {
    title: string,
    body: ReactElement
}

export const D2Box = ({ title, body }: Props) => {

    return <div className="table p-2 lg:p-4">
        <div className="table-header-group">
            <div className="table-row-group">
                <div className="table-row">
                    <div className="table-cell text-center uppercase py-2 px-4 bg-[rgba(130,131,133,0.5)] dark:bg-[rgba(130,131,133,0.3)] text-gray-700 dark:text-[rgb(164,165,167)] tracking-[0.25em] font-bungo font-medium">
                        {title}
                    </div>
                </div>
                <div className="table-row h-[2px] bg-[rgb(130,131,133)]">
                    <div className="table-cell"></div>
                </div>
                <div className="table-row">
                    <div className="table-cell h-full bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(0,0,0,0.2)] text-gray-800 dark:text-gray-200">
                        <div className="flex justify-center">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}