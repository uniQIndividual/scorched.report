// Courtesy of https://member.report/

import React from "react";

interface DropdownElementProps {
    username: string;
    subtitle: any;
    active: boolean;
    iconPath: string,
    to: string,
}

export default class DropdownElement extends React.Component<DropdownElementProps> {
    override render() {
        return (
            <a className="" href={this.props.to}>
                <div className={"w-[276px] rounded-lg bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.9)] flex backdrop-blur-[8px] text-gray-800 dark:text-white m-4 p-4 text-2xl"}>
                    <img src={"https://www.bungie.net/" + this.props.iconPath} className="h-8 w-8 mr-4" />
                    <div className="table">
                        <div className="table-row-group">
                            <div className="table-row font-bold">{this.props.username}</div>
                            <div className="table-row text-gray-200">{this.props.subtitle}</div>
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}