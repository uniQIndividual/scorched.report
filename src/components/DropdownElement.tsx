// Courtesy of https://member.report/

import React from "react";

interface DropdownElementProps {
    username: string;
    subtitle: any;
    active: boolean;
    lastOnline: number;
    iconPath: string,
    to: string,
}

// straight from SO https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date: number) {

    var seconds = Math.floor((new Date().valueOf() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " year" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " month" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " day" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hour" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute" + (interval > 2 ? "s" : "");
    }
    return Math.floor(seconds) + " second" + (interval > 2 ? "s" : "");
}

export default class DropdownElement extends React.Component<DropdownElementProps> {
    override render() {
        return (
            <a className="my-4 mx-2" href={this.props.to}>
                <div className={"w-[260px] rounded-lg bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.9)] !cursor-pointer flex backdrop-blur-[8px] text-white p-4 text-base"}>
                    <img src={"https://www.bungie.net/" + this.props.iconPath} className="!cursor-pointer h-8 w-8 mr-4" />
                    <div className="table flex-grow-0 max-w-52 text-wrap !cursor-pointer">
                        <div className="table-row-group max-w-52 text-wrap !cursor-pointer">
                            <div className="table-row max-w-52 text-wrap font-bold !cursor-pointer">{this.props.username}</div>
                            <div className="table-row text-gray-200 text-sm !cursor-pointer">{this.props.subtitle}</div>
                            {this.props.lastOnline == 0 ? <></> : <div className="table-row text-gray-200 text-sm !cursor-pointer">{"last seen: " + timeSince(this.props.lastOnline) + " ago"}</div>}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}