import React from "react";
import './ErrorDynamic.css'

interface ErrorDynamicProps {
    title: string;
    text: string;
}

export default class ErrorDynamic extends React.Component<ErrorDynamicProps> {
    override render() {
        return (
            <div className="hide-after-5s flex flex-col fixed justify-center bottom-0 w-screen left-0 z-50 items-center px-6 bg-[#111]/70 dark:bg-[#111]/50 backdrop-blur ">
                <div className="transition bg-[#91332F] w-screen h-2"></div>
                <div className="xl:w-3/4 inline">
                    <table className="mt-4">
                        <tbody>
                            <tr>
                                <td className="p-2 w-20 lg:w-28">
                                    <img className="w-20 lg:w-28" src="/images/icons/error_color.png" />
                                </td>
                                <td className="p-2">
                                    <h1
                                        className="mb-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl text-white"
                                    >
                                        {this.props.title}
                                    </h1>
                                    <p className="mb-5 text-base font-normal text-gray-300 md:text-lg dark:text-gray-300">
                                        {this.props.text}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}