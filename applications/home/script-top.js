// Status
const date = document.getElementById("date");
const time = document.getElementById("time");

date.innerHTML = dayjs().format('DD/MM/YYYY');
time.innerHTML = dayjs().format('HH:mm');

setInterval(() => {
    time.innerHTML = dayjs().format('HH:mm');
}, 60 * 1000);

let batteryDisplay = "block";

setInterval(() => {
    batteryDisplay = batteryDisplay === "none" ? "block" : "none"
    document.getElementById("last-battery-level").style.display = batteryDisplay;
}, 600);