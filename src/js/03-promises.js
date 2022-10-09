import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const inputs = {
  delay: 0,
  step: 0,
  amount: 0,
};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', handleInput);

function handleInput(evt) {
  inputs[evt.target.name] = Number(evt.target.value);
}
console.log(inputs);

function onFormSubmit(evt) {
  evt.preventDefault();

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };
      setTimeout(() => {
        if (shouldResolve) {
          resolve(result);
        } else {
          reject(result);
        }
      }, delay);
    });
  }

  let newDelay = inputs.delay;

  for (let i = 1; i <= inputs.amount; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += inputs.step;
  }
  evt.currentTarget.reset();
}
