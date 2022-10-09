import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const start = document.querySelector('button[data-start]');
start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};

const dataPickr = new flatpickr('#datetime-picker', options);

start.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  const id = setInterval(() => {
    const currentDate = new Date();

    let result = dataPickr.selectedDates[0].getTime() - currentDate.getTime();
    if (result < 1000) {
      clearInterval(id);
      start.disabled = true;
    }
    let leftTime = convertMs(result);
    daysEl.textContent = addLeadingZero(leftTime.days);
    hoursEl.textContent = addLeadingZero(leftTime.hours);
    minutesEl.textContent = addLeadingZero(leftTime.minutes);
    secondsEl.textContent = addLeadingZero(leftTime.seconds);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
