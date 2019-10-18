const startApp = () => {
  const metric = document.querySelector('#metric');
  const imperial = document.querySelector('#imperial');

  document
    .querySelector('input[type="checkbox"]')
    .addEventListener('click', ({ target: { checked } }) => {
      imperial.classList.toggle('checked', checked);
      metric.classList.toggle('checked', !checked);
    });
};

startApp();
