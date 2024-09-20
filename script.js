const startStopButton = document.getElementById('start-stop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapTimesList = document.getElementById('lap-times');

let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    startStopButton.textContent = 'Stop';
    lapButton.disabled = false;
    resetButton.disabled = false;
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  startStopButton.textContent = 'Start';
  lapButton.disabled = true;
  resetButton.disabled = true;
  updateDisplay(0, 0, 0, 0);
  lapTimesList.innerHTML = '';
}

function lap() {
  const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapTimesList.appendChild(lapItem);
}

function updateTime() {
  elapsedTime = Date.now() - startTime;

  const milliseconds = Math.floor(elapsedTime % 1000);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  updateDisplay(hours, minutes, seconds, milliseconds);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  millisecondsDisplay.textContent = String(milliseconds).padStart(3, '0');
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
