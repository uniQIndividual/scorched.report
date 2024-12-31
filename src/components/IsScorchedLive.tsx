import React from "react";
import API from "../lib/api";

export const IsScorchedLive = () => {
    const initialState: boolean = undefined;
    const [data, setData] = React.useState(initialState);
    React.useEffect(() => {
        API.requests.Destiny2.Milestones().catch((err => "")).then(response => {
            if (response != undefined && response != "") {
                try {
                    response = JSON.parse(response);
                    response = response.Response;
                    if (response.hasOwnProperty("1049998276") && response["1049998276"].activities.some(e => e.activityHash == 17175025396)) {
                        setData(true)
                    } else {
                        setData(false)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
    return data == undefined ? "" :     data == true ? 
    (<div className="text-5xl font-bold text-red-600 text-center">
        Team Scorched is live!
    </div>) 
    : (<div className="text-2xl font-bold text-gray-300 text-center">
        Team Scorched is not live
    </div>)
}