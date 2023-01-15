import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(event.currentTarget[0].value);
  const delayStep = Number(event.currentTarget[1].value);
  const amount = Number(event.currentTarget[2].value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + delayStep * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
