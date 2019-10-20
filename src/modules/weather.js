import formatData from './helpers/formatUnits';

const apiKey = process.env.WEATHER_API;

const fetchWeatherData = async city => {
  const uri = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(uri);
  const data = await response.json();
  const { ok } = response;
  return { data, ok };
};

const getWeatherData = async location => {
  const { data, ok } = await fetchWeatherData(location);
  if (!ok) {
    const { message } = data;
    return { message };
  }

  const { list = [], city: { name: cityName } } = data;

  const filtered = [];

  let day = (new Date()).getDay();

  for (let index = 0; index < list.length; index += 1) {
    const listDay = (new Date(list[index].dt_txt)).getDay();
    const listHour = (new Date(list[index].dt_txt)).getHours();
    if (listDay === day && listHour > 6) {
      const formatForecastData = formatData(list[index]);
      filtered.push(formatForecastData);
      day += 1;
      day %= 7;
    }
    if (filtered.length === 5) { break; }
  }

  return { forecasts: filtered, cityName };
};

export default getWeatherData;
