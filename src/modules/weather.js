const apiKey = process.env.WEATHER_API;

const getWeatherData = async (location) => {
  const uri = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  const response = await fetch(uri);
  const { list, city: { name: cityName } } = await response.json();

  const getForcastData = (data) => {
    const {
      dt_txt: date,
      clouds: { all: cloudiness },
      main: {
        humidity,
        pressure,
        temp,
        temp_max: tempMax,
        temp_min: tempMin,
        grnd_level: groundLevel,
        sea_level: seaLevel,
      },
      weather: [{
        main: weatherCondition,
        description: weatherDescription,
        icon: weatherIcon,
      }],
      wind: {
        deg: windDirection,
        speed: windSpeed,
      },
    } = data;

    return {
      date,
      cloudiness,
      humidity,
      pressure,
      temp,
      tempMax,
      tempMin,
      groundLevel,
      seaLevel,
      weatherCondition,
      weatherDescription,
      weatherIcon,
      windDirection,
      windSpeed,
    };
  };

  const filtered = [];

  let day = (new Date()).getDay();

  for (let index = 0; index < list.length; index += 1) {
    const listDay = (new Date(list[index].dt_txt)).getDay();
    if (listDay === day) {
      filtered.push(getForcastData(list[index]));
      day += 1;
      day %= 7;
    }
    if (filtered.length === 5) { break; }
  }
  return { forecasts: filtered, cityName };
};

export default getWeatherData;
