import getWeatherData from './modules/weather';


const locationHeaderElement = document.querySelector('.weather-location');
const mainWeatherDataElement = document.querySelectorAll('.main-weather-data');
const forecastDataElement = document.querySelectorAll('.forecast-card');


const populateForecastData = async (city = 'Lagos,ng') => {
  const { forecasts, cityName } = await getWeatherData(city);

  const locationHeader = () => {
    locationHeaderElement.textContent = cityName;
  };

  const attachDataToDOM = (position, element) => {
    const mainForecast = forecasts[position];
    element.forEach(({ dataset: { name } }, index) => {
      if (name === 'weatherIcon') {
        const iconSource = `https://openweathermap.org/img/wn/${mainForecast[`${name}`]}@2x.png`;
        element[index].src = iconSource;
        element[index].alt = mainForecast.weatherDescription;
        return;
      }
      element[index].textContent = mainForecast[`${name}`];
    });
  };

  const main = (day = 0) => {
    attachDataToDOM(day, mainWeatherDataElement);
  };

  const forecast = () => {
    forecastDataElement.forEach((card) => {
      const { dataset: { day } } = card;
      const cardNodeList = card.querySelectorAll('[data-name]');
      attachDataToDOM(day, cardNodeList);
    });
  };

  const all = () => {
    locationHeader();
    main();
    forecast();
  };

  return { all, main };
};


const startApp = () => {
  const metric = document.querySelector('#metric');
  const imperial = document.querySelector('#imperial');
  const locationInput = document.querySelector('#location');

  populateForecastData().then((obj) => obj.all());


  document
    .querySelector('input[type="checkbox"]')
    .addEventListener('click', ({ target: { checked } }) => {
      imperial.classList.toggle('checked', checked);
      metric.classList.toggle('checked', !checked);
    });

  document
    .querySelector('#get-location')
    .addEventListener('click', () => {
      const city = locationInput.value;
      populateForecastData(city).then((obj) => obj.all());
    });
};

startApp();
