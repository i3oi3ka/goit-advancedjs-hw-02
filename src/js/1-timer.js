// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = Date.now();

const timer = {
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    buttonStart: document.querySelector('[data-start]'),
    inputDatetime: document.querySelector('#datetime-picker'),
  },

  intervalId: null,

  start() {
    this.refs.buttonStart.disabled = true;
    this.refs.inputDatetime.disabled = true;
    this.intervalId = setInterval(() => {
      const diff = userSelectedDate - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }

      const timeComponents = this.getTimeComponents(diff);

      this.refs.days.textContent = this.pad(timeComponents.days);
      this.refs.hours.textContent = this.pad(timeComponents.hours);
      this.refs.minutes.textContent = this.pad(timeComponents.minutes);
      this.refs.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.refs.inputDatetime.disabled = false;
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: 'rgba(255, 255, 255, 1)',
        titleColor: 'rgba(255, 255, 255, 1)',
        position: 'topRight',
        icon: '<symbol id="icon-close-outline" viewBox="0 0 20 20"><path d="M2.93 17.070c-1.884-1.821-3.053-4.37-3.053-7.193 0-5.523 4.477-10 10-10 2.823 0 5.372 1.169 7.19 3.050l0.003 0.003c1.737 1.796 2.807 4.247 2.807 6.947 0 5.523-4.477 10-10 10-2.7 0-5.151-1.070-6.95-2.81l0.003 0.003zM4.34 15.66c1.449 1.449 3.45 2.344 5.66 2.344 4.421 0 8.004-3.584 8.004-8.004 0-2.21-0.896-4.211-2.344-5.66v0c-1.449-1.449-3.45-2.344-5.66-2.344-4.421 0-8.004 3.584-8.004 8.004 0 2.21 0.896 4.211 2.344 5.66v0zM14.24 7.17l-2.83 2.83 2.83 2.83-1.41 1.41-2.83-2.83-2.83 2.83-1.41-1.41 2.83-2.83-2.83-2.83 1.41-1.41 2.83 2.83 2.83-2.83 1.41 1.41z"></path></symbol>',
        iconColor: 'rgba(255, 255, 255, 1)',
      });
      timer.refs.buttonStart.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    timer.refs.buttonStart.disabled = false;
  },
};

timer.refs.buttonStart.disabled = true;
timer.refs.buttonStart.addEventListener('click', () => timer.start());
flatpickr('#datetime-picker', options);
