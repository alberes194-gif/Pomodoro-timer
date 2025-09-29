// Seletores 
const pomodoro = document.getElementById("pomodoro-timer");
const short = document.getElementById("short-timer");
const long = document.getElementById("long-timer");
const timers = document.querySelectorAll(".timer-display");

const session = document.getElementById("pomodoro-session");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const pauseBtn = document.getElementById("pause"); 
const timerMsg = document.getElementById("timer-message");

// Variáveis de controle 
let currentTimer = null;
let myInterval = null;
let remainingTime = 0;
let isPaused = false;

// Funções auxiliares 
function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
}
showDefaultTimer();

function hideAll() {
  timers.forEach(t => t.style.display = "none");
}

// Seletor de sessões 
session.addEventListener("click", () => {
  hideAll();
  pomodoro.style.display = "block";
  session.classList.add("active");
  shortBreak.classList.remove("active");
  longBreak.classList.remove("active");
  currentTimer = pomodoro;
});

shortBreak.addEventListener("click", () => {
  hideAll();
  short.style.display = "block";
  session.classList.remove("active");
  shortBreak.classList.add("active");
  longBreak.classList.remove("active");
  currentTimer = short;
});

longBreak.addEventListener("click", () => {
  hideAll();
  long.style.display = "block";
  session.classList.remove("active");
  shortBreak.classList.remove("active");
  longBreak.classList.add("active");
  currentTimer = long;
});

//  Relógio 
function startTimer(timerDisplay, resume = false) {
  clearInterval(myInterval);

  const baseDuration = parseFloat(timerDisplay.dataset.duration) * 60 * 1000;
  const duration = resume ? remainingTime : baseDuration;
  const endTimestamp = Date.now() + duration;

  myInterval = setInterval(() => {
    remainingTime = endTimestamp - Date.now();

    if (remainingTime <= 0) {
      clearInterval(myInterval);
      timerDisplay.querySelector(".time").textContent = "00:00";
      isPaused = false;
// audio: bip
      const beep = new Audio ("Pomodoro-timer/audio/achive-sound-132273.mp3");
      beep.play();

      return;
    }

    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    timerDisplay.querySelector(".time").textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

//  Botões 
startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer, isPaused);
    isPaused = false;
    timerMsg.style.display = "none";
  } else {
    timerMsg.style.display = "block";
  }
});

pauseBtn.addEventListener("click", () => {
  if (myInterval) {
    clearInterval(myInterval);
    myInterval = null;
    isPaused = true;
  }
});

stopBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
    myInterval = null;
    isPaused = false;
    remainingTime = 0;
    // volta o display para o tempo original
    const original = parseFloat(currentTimer.dataset.duration);
    currentTimer.querySelector(".time").textContent = `${original}:00`;
  }
});
