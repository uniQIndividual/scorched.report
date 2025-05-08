
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
    return Object.entries(a).map(b => b[1].runs.map(c => { c.category = b[0]; c.category_name = b[1].name; return c })).flat().sort((a, b) => a.time - b.time)
}