const dataStart = document.querySelector('[data-start]');
const dataStop = document.querySelector('[data-stop]');
let colorChange;

dataStart.addEventListener("click", startButton);
dataStop.addEventListener("click", stopButton);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function startButton() {

    dataStart.disabled = true;
    dataStop.disabled = false;

    colorChange = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopButton() {

    dataStart.disabled = false;
    dataStop.disabled = true;

    clearInterval(colorChange);
}