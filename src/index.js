import getWeatherData from './modules/api/weather';
import { getPlaceAutocomplete, getPlaceDetails } from './modules/api/places';
import getCurrentLocation from './modules/api/geolocation';

const mainContent = document.querySelector('#content');
const locationHeaderElement = document.querySelector('.weather-location');
const mainWeatherDataElement = document.querySelectorAll('.main-weather-data');
const forecastDataElement = document.querySelectorAll('.forecast-card');
const unitCheckBox = document.querySelector('input[type="checkbox"]');
const predictionsDataListElement = document.querySelector('#predictions');
const locationInput = document.querySelector('#location');
const spinner = document.querySelector('.card.loading');
const spinnerStatus = document.querySelector('.card.loading .text');


const populateForecastData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {
  let { forecasts, cityName, message } = await getWeatherData(info);

  const locationHeader = (status = cityName) => {
    locationHeaderElement.textContent = status;
  };

  if (message) { return locationHeader(message); }
  const attachDataToDOM = (position, element, unitType = 'metric') => {
    const mainForecast = forecasts[position][unitType];
    element.forEach(({ dataset: { name } }, index) => {
      if (name === 'weatherIcon') {
        const iconSource = `https://openweathermap.org/img/wn/${mainForecast[name]}@2x.png`;
        element[index].src = iconSource;
        element[index].alt = mainForecast.weatherDescription;
        return;
      }
      element[index].innerHTML = mainForecast[name];
    });
  };

  const weatherClass = [
    'thunderstorm-weather', 'drizzle-weather', 'snow-weather',
    'tornado-weather', 'clear-weather', 'mist-weather',
    'smoke-weather', 'haze-weather', 'dust-weather',
    'fog-weather', 'sand-weather', 'ash-weather',
    'squall-weather', 'clouds-weather', 'rain-weather',
  ];
  const toWeatherClass = weatherCondition => `${weatherCondition.toLowerCase()}-weather`;
  const styleBackground = (backgroundElement, { weatherCondition }) => {
    backgroundElement.classList.remove(...weatherClass);
    backgroundElement.classList.add(toWeatherClass(weatherCondition));
  };

  const main = (unit, day = 0) => {
    attachDataToDOM(day, mainWeatherDataElement, unit);
    styleBackground(mainContent, forecasts[day][unit]);
  };

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

  const toggleUnit = (unit, day) => {
    main(unit, day);
    forecast(unit);
  };

  const changeCity = async (newInfo, newUnit) => {
    ({ forecasts, cityName, message } = await getWeatherData(newInfo));
    if (message) { return locationHeader(message); }
    return all(newUnit);
  };

  return {
    all, main, toggleUnit, changeCity,
  };
};

const populateAutocomplete = async input => {
  const { status, predictionsList } = await getPlaceAutocomplete(input);
  const resultHTML = (description = 'No Result Found', placeID = null) => `
  <li class="prediction-list" >
    <button type="button" class="prediction-list-item" data-value=${placeID} data-type="predictions">
      ${description}
    </button>
  </li>
  `;
  if (status) {
    predictionsDataListElement.innerHTML = resultHTML();
    return false;
  }

  const predictionOptions = [];
  predictionsList.forEach(prediction => {
    const { description, placeID } = prediction;
    predictionOptions.push(resultHTML(description, placeID));
  });
  predictionsDataListElement.innerHTML = predictionOptions.join('');
  return true;
};

const startApp = () => {
  const metric = document.querySelector('#metric');
  const imperial = document.querySelector('#imperial');
  const forecastDataPromise = populateForecastData();
  const toggleActiveForecastCard = (cards, oldCard, newCard) => {
    if (oldCard === newCard) { return; }
    cards[oldCard].classList.remove('active');
    cards[newCard].classList.add('active');
  };

  let main = 0;

  const getUnit = () => (unitCheckBox.checked ? 'imperical' : 'metric');
  const handleCurrentLocation = position => {
    if (position.status) {
      spinnerStatus.textContent = `${position.status}, loading default location weather details`;
      forecastDataPromise.then(obj => {
        obj.all(getUnit());
        setTimeout(() => spinner.classList.add('d-none'), 1000);
      });
    } else {
      spinnerStatus.textContent = 'Location found, loading weather details';
      const info = { location: position, type: 'location' };
      forecastDataPromise.then(obj => {
        obj.changeCity(info, getUnit());
        setTimeout(() => spinner.classList.add('d-none'), 100);
      });
    }
  };

  getCurrentLocation(handleCurrentLocation);

  unitCheckBox
    .addEventListener('click', ({ target: { checked } }) => {
      forecastDataPromise.then(obj => obj.toggleUnit(getUnit(), main));
      imperial.classList.toggle('checked', checked);
      metric.classList.toggle('checked', !checked);
    });

  document
    .querySelector('#get-location')
    .addEventListener('click', () => {
      const info = { city: locationInput.value, type: 'city' };
      spinner.classList.remove('d-none');
      forecastDataPromise.then(obj => {
        obj.changeCity(info, getUnit());
        setTimeout(() => spinner.classList.add('d-none'), 1000);
      });
      toggleActiveForecastCard(forecastDataElement, main, 0);
      main = 0;
    });

  forecastDataElement.forEach((node, key) => {
    node.addEventListener('click', () => {
      if (main === key) { return; }
      toggleActiveForecastCard(forecastDataElement, main, key);
      forecastDataPromise.then(obj => obj.main(getUnit(), key));
      main = key;
    });
  });

  locationInput.addEventListener('keyup', ({ currentTarget: { value } }) => {
    if (value.length > 2) {
      populateAutocomplete(value);
    }
  });

  predictionsDataListElement.addEventListener('click', ({ target: { dataset: { type, value } } }) => {
    if (!type || type !== 'predictions' || value === 'null') { return; }
    const placeID = value;
    spinner.classList.remove('d-none');
    getPlaceDetails(placeID).then(location => {
      const info = { location, type: 'location' };
      forecastDataPromise.then(obj => {
        obj.changeCity(info, getUnit());
        setTimeout(() => spinner.classList.add('d-none'), 1000);
      });
    });
  });
};

startApp();
