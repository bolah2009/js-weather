import formatDate from './date';

const formatData = data => {
  const getForecastData = rawData => {
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
    } = rawData;

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

  const formatDataDate = ({ date }, type = 'main') => {
    if (type === 'main') {
      return formatDate().toFullDayWithTime(date);
    }
    return formatDate().toShortDay(date);
  };

  const concatenateUnitandValue = (value, unit) => `${value.toFixed(0)}<span class="unit">${unit}</span>`;
  const formatUnit = (param, paramUnit, obj = {}) => {
    const value = obj[`${param}`];
    return concatenateUnitandValue(value, paramUnit);
  };

  const convertCelsuisToFahrenheit = value => (((value * 9) / 5) + 32);
  const convertMeterPerSecToMilesPerHour = value => (value * 2.237);
  const convertMeterPerSecToKiloMeterPerHour = value => (value * 3.6);
  const convertUnit = (converter, param, paramUnit, obj = {}) => {
    const value = obj[`${param}`];
    const convertValue = converter(value);
    return concatenateUnitandValue(convertValue, paramUnit);
  };

  const formatMetricUnits = obj => {
    const metricUnits = {
      temp: formatUnit('temp', '°C', obj),
      tempMax: formatUnit('tempMax', '°C', obj),
      tempMin: formatUnit('tempMin', '°C', obj),
      windSpeed: convertUnit(convertMeterPerSecToKiloMeterPerHour, 'windSpeed', ' km/h', obj),
    };
    return metricUnits;
  };

  const formatImpericalUnits = obj => {
    const impericalUnits = {
      temp: convertUnit(convertCelsuisToFahrenheit, 'temp', '°F', obj),
      tempMax: convertUnit(convertCelsuisToFahrenheit, 'tempMax', '°F', obj),
      tempMin: convertUnit(convertCelsuisToFahrenheit, 'tempMin', '°F', obj),
      windSpeed: convertUnit(convertMeterPerSecToMilesPerHour, 'windSpeed', ' mph', obj),
    };
    return impericalUnits;
  };

  const formatAllParameters = rawData => {
    const cleanData = getForecastData(rawData);
    const metricUnits = formatMetricUnits(cleanData);
    const impericalUnits = formatImpericalUnits(cleanData);

    const otherUnits = {
      date: formatDataDate(cleanData, 'main'),
      forecastDate: formatDataDate(cleanData, 'forecast'),
      cloudiness: formatUnit('cloudiness', '%', cleanData),
      humidity: formatUnit('humidity', '%', cleanData),
      pressure: formatUnit('pressure', ' hPa', cleanData),
      groundLevel: formatUnit('groundLevel', ' hPa', cleanData),
      seaLevel: formatUnit('seaLevel', ' hPa', cleanData),
      windDirection: formatUnit('windDirection', '°', cleanData),
      weatherCondition: cleanData.weatherCondition,
      weatherDescription: cleanData.weatherDescription,
      weatherIcon: cleanData.weatherIcon,
    };

    return {
      metric: { ...metricUnits, ...otherUnits },
      imperical: { ...impericalUnits, ...otherUnits },
    };
  };

  return formatAllParameters(data);
};

export default formatData;
