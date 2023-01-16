const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;

// funkcja startBtn

const startRandom = () => {
  timer = setInterval(randomBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

const randomBackgroundColor = () => {
  body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', startRandom);

// funkcja stopBtn

const stopRandom = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timer);
};

stopBtn.addEventListener('click', stopRandom);

// randomowy kolor

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
