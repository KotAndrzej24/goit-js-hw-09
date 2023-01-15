import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// selektory

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const timerInterface = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// Obiekt

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};
const fp = flatpickr(input, options);

// funkcja

let ms;

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}

function timer() {
  const timerId = setInterval(function () {
    const selectedDate = fp.selectedDates[0].getTime();
    const date = new Date().getTime();

    ms = selectedDate - date;
    const result = convertMs(ms);

    days.innerHTML = addLeadingZero(result.days);
    hours.innerHTML = addLeadingZero(result.hours);
    minutes.innerHTML = addLeadingZero(result.minutes);
    seconds.innerHTML = addLeadingZero(result.seconds);

    if (ms < 0) {
      clearInterval(timerId);
      days.innerHTML = '00';
      hours.innerHTML = '00';
      minutes.innerHTML = '00';
      seconds.innerHTML = '00';
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', timer);

// style
timerInterface.style.display = 'flex';
timerInterface.style.gap = '10px';

const timerChildren = document.querySelectorAll('.field').forEach(el => {
  el.style.fontSize = '20px';
  el.style.fontWeight = '500';
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
});

const timerNumbers = document.querySelectorAll('.value').forEach(el => {
  el.style.fontSize = '40px';
});
