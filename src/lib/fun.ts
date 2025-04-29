
// Display Seconds as Xm Ys 
export function secondsToDisplayTime(seconds: number) {
    var date = new Date(seconds * 1000);
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    return mm + "m " + ss + "s";
}