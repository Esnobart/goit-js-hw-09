import Notiflix from "notiflix";

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function delayPromise(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function submitForm(event) {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    alert('Please enter valid numeric values.');
    return;
  }

  let i = 1;

  function processPromise() {
    if (i <= amount) {
      createPromise(i, delay + (i - 1) * step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        })
        .finally(() => {
          i++;
          if (i <= amount) {
            delayPromise(step).then(processPromise);
          }
        });
    }
  }

  delayPromise(delay).then(processPromise);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
