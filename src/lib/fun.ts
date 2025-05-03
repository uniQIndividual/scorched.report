
// Display Seconds as Xm Ys 
export function secondsToDisplayTime(seconds: number) {
    var date = new Date(seconds * 1000);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    const m_string = mm < 10 ? (mm == 0 ? "" : "0" + mm + "m ") : mm + "m ";
    const s_string = ss < 10 && mm != 0 ? ("0" + ss) : ss;
    return m_string + s_string + "s";
}