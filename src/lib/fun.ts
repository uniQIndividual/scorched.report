
// Display Seconds as Xm Ys 
export function secondsToDisplayTime(seconds: number) {
    var date = new Date(seconds * 1000);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    const m_string = mm < 10 ? (mm == 0 ? "" : "0" + mm + "m ") : mm + "m ";
    const s_string = ss < 10 && mm != 0 ? ("0" + ss) : ss;
    return m_string + s_string + "s";
}

export function millisecondsToDisplayTime(seconds: number) {
    var date = new Date(seconds);
    var ms = date.getMilliseconds().toString().padStart(3, '0');
    var ss = date.getSeconds();
    return ss + "s " + ms + "ms";
}

export function flattenSpeedrunsWithCategories(a) {
    return Object.entries(a).map(b => b[1].runs
        .map(c => {
            c.category = b[0]; c.category_name = b[1].name; return c
        }))
        .flat()
        .sort((a, b) => a.time - b.time)
}
export const platformLookup = (platform: number) => {
    switch (platform) {
        case 1:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/xboxLiveLogo.png",
                "name": "Xbox/Windows Store"
            }
        case 2:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/psnLogo.png",
                "name": "PlayStation Network"
            }
        case 3:
            return {
                "icon": "https://www.bungie.net//img/theme/bungienet/icons/steamLogo.png",
                "name": "Steam"
            }
        case 4:
            return {
                "icon": "",
                "name": "Blizzard"
            } //"Blizzard" //TODO: get images
        case 5:
            return {
                "icon": "https://www.bungie.net//img/theme/destiny/icons/icon_stadia.png",
                "name": "Stadia"
            }
        case 6:
            return {
                "icon": "https://www.bungie.net//img/theme/destiny/icons/icon_egs.png",
                "name": "Epic Games Store"
            }
        default:
            return undefined
    }
}
export const cannonSeasonNameToURL = (seasonName: string) => {
    return encodeURI(seasonName.toLowerCase().replaceAll(" ", "-"));
}