import formatData from '../helpers/formatUnits';

const apiKey = process.env.WEATHER_API;

const getQuery = ({ type, location, city }) => {
  if (type === 'city') {
    return `q=${city}&appid=${apiKey}&units=metric`;
  }
  const { lat, lon } = location;
  return `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
};

const fetchWeatherData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {
  const uri = `https://api.openweathermap.org/data/2.5/forecast?${getQuery(info)}`;
  const response = await fetch(uri);
  const data = await response.json();
  const { ok } = response;
  return { data, ok };
};

const getWeatherData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {
  const { data, ok } = await fetchWeatherData(info);
  if (!ok) {
    const { message } = data;
    return { message };
  }

  const {
    list = [],
    city: { name: cityName },
  } = data;

  const filtered = [];

  let day = new Date().getDay();

  for (let index = 0; index < list.length; index += 1) {
    const listDay = new Date(list[index].dt_txt).getDay();
    const listHour = new Date(list[index].dt_txt).getHours();
    if (listDay === day && listHour > 6) {
      const formatForecastData = formatData(list[index]);
      filtered.push(formatForecastData);
      day += 1;
      day %= 7;
    } else if (new Date().getDay() === day && new Date().getHours() > 20) {
      day += 1;
      day %= 7;
    }
    if (filtered.length === 5) {
      break;
    }
  }
  return { forecasts: filtered, cityName };
};

export default getWeatherData;
