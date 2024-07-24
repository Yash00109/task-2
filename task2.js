let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(li);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
