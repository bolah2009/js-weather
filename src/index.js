import getWeatherData from './modules/weather';

const locationHeaderElement = document.querySelector('.weather-location');
const mainWeatherDataElement = document.querySelectorAll('.main-weather-data');
const forecastDataElement = document.querySelectorAll('.forecast-card');
const unitCheckBox = document.querySelector('input[type="checkbox"]');

const populateForecastData = async (city = 'Lagos,ng') => {
  let { forecasts, cityName, message } = await getWeatherData(city);

  const locationHeader = (status = cityName) => {
    locationHeaderElement.textContent = status;
  };

  if (message) { return locationHeader(message); }

  const attachDataToDOM = (position, element, unitType = 'metric') => {
    const mainForecast = forecasts[position][`${unitType}`];
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

  const main = (unit, day = 0) => attachDataToDOM(day, mainWeatherDataElement, unit);

  const forecast = unit => {
    forecastDataElement.forEach(card => {
      const { dataset: { day } } = card;
      const cardNodeList = card.querySelectorAll('[data-name]');
      attachDataToDOM(day, cardNodeList, unit);
    });
  };

  const all = (unit = 'metric') => {
    locationHeader(cityName);
    main(unit);
    forecast(unit);
  };

  const toggleUnit = unit => {
    main(unit);
    forecast(unit);
  };

  const changeCity = async (newCity, newUnit) => {
    ({ forecasts, cityName, message } = await getWeatherData(newCity));
    if (message) { return locationHeader(message); }
    return all(newUnit);
  };

  return {
    all, main, toggleUnit, changeCity,
  };
};


const startApp = () => {
  const metric = document.querySelector('#metric');
  const imperial = document.querySelector('#imperial');
  const locationInput = document.querySelector('#location');
  const forecastDataPromise = populateForecastData();

  const getUnit = () => (unitCheckBox.checked ? 'imperical' : 'metric');
  forecastDataPromise.then(obj => obj.all(getUnit()));

  unitCheckBox
    .addEventListener('click', ({ target: { checked } }) => {
      forecastDataPromise.then(obj => obj.toggleUnit(getUnit()));
      imperial.classList.toggle('checked', checked);
      metric.classList.toggle('checked', !checked);
    });

  document
    .querySelector('#get-location')
    .addEventListener('click', () => {
      const city = locationInput.value;
      forecastDataPromise.then(obj => obj.changeCity(city, getUnit()));
    });
};

startApp();
