import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataText = document.getElementById("datetime-picker");
let countdown;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Error', 'Please choose a date in the future', 'OK');
      dataStart.disabled = true;
    } else {
      dataStart.disabled = false;
    }
  }
};

flatpickr("#datetime-picker", options);

dataStart.addEventListener('click', startClick);

function startClick() {
  const endDate = new Date(dataText.value);
  if (endDate < new Date()) {
      Notiflix.Notify.failure('Error', 'Please choose a date in the future', 'OK');
      dataStart.disabled = true;
      return;
    }
    
  clearInterval(countdown)
    
  dataStart.disabled = true;

  countdown = setInterval(updateTimer, 1000);

  function updateTimer() {
      const timeDifference = endDate - new Date();

      if (timeDifference <= 0) {
          clearInterval(countdown);
          return;
        }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      dataDays.textContent = addZero(days);
      dataHours.textContent = addZero(hours);
      dataMinutes.textContent = addZero(minutes);
      dataSeconds.textContent = addZero(seconds);
  }
}

function addZero(value) {
  return value < 10 ? `0${value}` : value;
}