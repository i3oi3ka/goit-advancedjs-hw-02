// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

const handleForm = event => {
  event.preventDefault();
  const formData = {
    delay: event.target.elements.delay.value,
    state: event.target.elements.state.value,
  };
  const promise = new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (formData.state == 'fulfilled') {
        resolve(formData.delay);
      } else {
        rejected(formData.delay);
      }
    }, formData.delay);
  });
  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${formData.delay}ms`,
        messageColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'green',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${formData.delay}ms`,
        messageColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'red',
        position: 'topRight',
      });
    });

  event.target.reset();
};

refs.form.addEventListener('submit', handleForm);
