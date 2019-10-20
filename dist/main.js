/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weather */ \"./src/modules/weather.js\");\n\n\nconst mainContent = document.querySelector('#content');\nconst locationHeaderElement = document.querySelector('.weather-location');\nconst mainWeatherDataElement = document.querySelectorAll('.main-weather-data');\nconst forecastDataElement = document.querySelectorAll('.forecast-card');\nconst unitCheckBox = document.querySelector('input[type=\"checkbox\"]');\n\nconst populateForecastData = async (city = 'Lagos,ng') => {\n  let { forecasts, cityName, message } = await Object(_modules_weather__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(city);\n\n  const locationHeader = (status = cityName) => {\n    locationHeaderElement.textContent = status;\n  };\n\n  if (message) { return locationHeader(message); }\n  const attachDataToDOM = (position, element, unitType = 'metric') => {\n    const mainForecast = forecasts[position][unitType];\n    element.forEach(({ dataset: { name } }, index) => {\n      if (name === 'weatherIcon') {\n        const iconSource = `https://openweathermap.org/img/wn/${mainForecast[name]}@2x.png`;\n        element[index].src = iconSource;\n        element[index].alt = mainForecast.weatherDescription;\n        return;\n      }\n      element[index].innerHTML = mainForecast[name];\n    });\n  };\n\n  const weatherClass = [\n    'thunderstorm-weather', 'drizzle-weather', 'snow-weather',\n    'tornado-weather', 'clear-weather', 'mist-weather',\n    'smoke-weather', 'haze-weather', 'dust-weather',\n    'fog-weather', 'sand-weather', 'ash-weather',\n    'squall-weather', 'clouds-weather', 'rain-weather',\n  ];\n  const toWeatherClass = weatherCondition => `${weatherCondition.toLowerCase()}-weather`;\n  const styleBackground = (backgroundElement, { weatherCondition }) => {\n    backgroundElement.classList.remove(...weatherClass);\n    backgroundElement.classList.add(toWeatherClass(weatherCondition));\n  };\n\n  const main = (unit, day = 0) => {\n    attachDataToDOM(day, mainWeatherDataElement, unit);\n    styleBackground(mainContent, forecasts[day][unit]);\n  };\n\n  const forecast = unit => {\n    forecastDataElement.forEach(card => {\n      const { dataset: { day } } = card;\n      const cardNodeList = card.querySelectorAll('[data-name]');\n      attachDataToDOM(day, cardNodeList, unit);\n    });\n  };\n\n  const all = (unit = 'metric') => {\n    locationHeader(cityName);\n    main(unit);\n    forecast(unit);\n  };\n\n  const toggleUnit = (unit, day) => {\n    main(unit, day);\n    forecast(unit);\n  };\n\n  const changeCity = async (newCity, newUnit) => {\n    ({ forecasts, cityName, message } = await Object(_modules_weather__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(newCity));\n    if (message) { return locationHeader(message); }\n    return all(newUnit);\n  };\n\n  return {\n    all, main, toggleUnit, changeCity,\n  };\n};\n\n\nconst startApp = () => {\n  const metric = document.querySelector('#metric');\n  const imperial = document.querySelector('#imperial');\n  const locationInput = document.querySelector('#location');\n  const forecastDataPromise = populateForecastData();\n  const toggleActiveForecastCard = (cards, oldCard, newCard) => {\n    if (oldCard === newCard) { return; }\n    cards[oldCard].classList.remove('active');\n    cards[newCard].classList.add('active');\n  };\n\n  let main = 0;\n\n  const getUnit = () => (unitCheckBox.checked ? 'imperical' : 'metric');\n  forecastDataPromise.then(obj => obj.all(getUnit()));\n\n  unitCheckBox\n    .addEventListener('click', ({ target: { checked } }) => {\n      forecastDataPromise.then(obj => obj.toggleUnit(getUnit(), main));\n      imperial.classList.toggle('checked', checked);\n      metric.classList.toggle('checked', !checked);\n    });\n\n  document\n    .querySelector('#get-location')\n    .addEventListener('click', () => {\n      const city = locationInput.value;\n      forecastDataPromise.then(obj => obj.changeCity(city, getUnit()));\n      toggleActiveForecastCard(forecastDataElement, main, 0);\n      main = 0;\n    });\n\n  forecastDataElement.forEach((node, key) => {\n    node.addEventListener('click', () => {\n      if (main === key) { return; }\n      toggleActiveForecastCard(forecastDataElement, main, key);\n      forecastDataPromise.then(obj => obj.main(getUnit(), key));\n      main = key;\n    });\n  });\n};\n\nstartApp();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/helpers/date.js":
/*!*************************************!*\
  !*** ./src/modules/helpers/date.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst formatDate = () => {\n  const now = new Date();\n\n  const week = [\n    'Sunday',\n    'Monday',\n    'Tuesday',\n    'Wednesday',\n    'Thursday',\n    'Friday',\n    'Saturday',\n  ];\n\n  const newDate = date => new Date(date);\n  const weekIndex = date => newDate(date).getDay();\n  const dayOfTheWeek = date => week[weekIndex(date)];\n  const isFuture = date => newDate(date) > now;\n\n  const toTime = (date = now) => {\n    const hour = newDate(date).getHours();\n    const minutes = newDate(date).getMinutes();\n    const timePeriods = hour < 12 ? 'AM' : 'PM';\n    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;\n    const formatHour = () => {\n      const newHour = hour > 12 ? hour - 12 : hour;\n      if (newHour < 12) { return `0${newHour}`; }\n      return newHour;\n    };\n    return `${formatHour()}:${formatMinutes} ${timePeriods}`;\n  };\n\n  const toFullDay = date => dayOfTheWeek(date);\n  const toShortDay = (date, take = 3) => dayOfTheWeek(date).slice(0, take);\n  const toFullDayWithTime = date => `${dayOfTheWeek(date)} (${toTime(date)})`;\n\n  return {\n    toFullDay, toShortDay, toFullDayWithTime, isFuture,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (formatDate);\n\n\n//# sourceURL=webpack:///./src/modules/helpers/date.js?");

/***/ }),

/***/ "./src/modules/helpers/formatUnits.js":
/*!********************************************!*\
  !*** ./src/modules/helpers/formatUnits.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ \"./src/modules/helpers/date.js\");\n\n\nconst formatData = data => {\n  const getForecastData = rawData => {\n    const {\n      dt_txt: date,\n      clouds: { all: cloudiness },\n      main: {\n        humidity,\n        pressure,\n        temp,\n        temp_max: tempMax,\n        temp_min: tempMin,\n        grnd_level: groundLevel,\n        sea_level: seaLevel,\n      },\n      weather: [{\n        main: weatherCondition,\n        description: weatherDescription,\n        icon: weatherIcon,\n      }],\n      wind: {\n        deg: windDirection,\n        speed: windSpeed,\n      },\n    } = rawData;\n\n    return {\n      date,\n      cloudiness,\n      humidity,\n      pressure,\n      temp,\n      tempMax,\n      tempMin,\n      groundLevel,\n      seaLevel,\n      weatherCondition,\n      weatherDescription,\n      weatherIcon,\n      windDirection,\n      windSpeed,\n    };\n  };\n\n  const formatDataDate = ({ date }, type = 'main') => {\n    if (type === 'main') {\n      return Object(_date__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().toFullDayWithTime(date);\n    }\n    return Object(_date__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().toShortDay(date);\n  };\n\n  const concatenateUnitandValue = (value, unit) => `${value.toFixed(0)}<span class=\"unit\">${unit}</span>`;\n  const formatUnit = (param, paramUnit, obj = {}) => {\n    const value = obj[`${param}`];\n    return concatenateUnitandValue(value, paramUnit);\n  };\n\n  const convertCelsuisToFahrenheit = value => (((value * 9) / 5) + 32);\n  const convertMeterPerSecToMilesPerHour = value => (value * 2.237);\n  const convertMeterPerSecToKiloMeterPerHour = value => (value * 3.6);\n  const convertUnit = (converter, param, paramUnit, obj = {}) => {\n    const value = obj[`${param}`];\n    const convertValue = converter(value);\n    return concatenateUnitandValue(convertValue, paramUnit);\n  };\n\n  const formatMetricUnits = obj => {\n    const metricUnits = {\n      temp: formatUnit('temp', '°C', obj),\n      tempMax: formatUnit('tempMax', '°C', obj),\n      tempMin: formatUnit('tempMin', '°C', obj),\n      windSpeed: convertUnit(convertMeterPerSecToKiloMeterPerHour, 'windSpeed', ' km/h', obj),\n    };\n    return metricUnits;\n  };\n\n  const formatImpericalUnits = obj => {\n    const impericalUnits = {\n      temp: convertUnit(convertCelsuisToFahrenheit, 'temp', '°F', obj),\n      tempMax: convertUnit(convertCelsuisToFahrenheit, 'tempMax', '°F', obj),\n      tempMin: convertUnit(convertCelsuisToFahrenheit, 'tempMin', '°F', obj),\n      windSpeed: convertUnit(convertMeterPerSecToMilesPerHour, 'windSpeed', ' mph', obj),\n    };\n    return impericalUnits;\n  };\n\n  const formatAllParameters = rawData => {\n    const cleanData = getForecastData(rawData);\n    const metricUnits = formatMetricUnits(cleanData);\n    const impericalUnits = formatImpericalUnits(cleanData);\n\n    const otherUnits = {\n      date: formatDataDate(cleanData, 'main'),\n      forecastDate: formatDataDate(cleanData, 'forecast'),\n      cloudiness: formatUnit('cloudiness', '%', cleanData),\n      humidity: formatUnit('humidity', '%', cleanData),\n      pressure: formatUnit('pressure', ' hPa', cleanData),\n      groundLevel: formatUnit('groundLevel', ' hPa', cleanData),\n      seaLevel: formatUnit('seaLevel', ' hPa', cleanData),\n      windDirection: formatUnit('windDirection', '°', cleanData),\n      weatherCondition: cleanData.weatherCondition,\n      weatherDescription: cleanData.weatherDescription,\n      weatherIcon: cleanData.weatherIcon,\n    };\n\n    return {\n      metric: { ...metricUnits, ...otherUnits },\n      imperical: { ...impericalUnits, ...otherUnits },\n    };\n  };\n\n  return formatAllParameters(data);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (formatData);\n\n\n//# sourceURL=webpack:///./src/modules/helpers/formatUnits.js?");

/***/ }),

/***/ "./src/modules/weather.js":
/*!********************************!*\
  !*** ./src/modules/weather.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_formatUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/formatUnits */ \"./src/modules/helpers/formatUnits.js\");\n\n\nconst apiKey = \"ed33e3ceb71d11a88646b4199155dac1\";\n\nconst fetchWeatherData = async city => {\n  const uri = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;\n  const response = await fetch(uri);\n  const data = await response.json();\n  const { ok } = response;\n  return { data, ok };\n};\n\nconst getWeatherData = async location => {\n  const { data, ok } = await fetchWeatherData(location);\n  if (!ok) {\n    const { message } = data;\n    return { message };\n  }\n\n  const { list = [], city: { name: cityName } } = data;\n\n  const filtered = [];\n\n  let day = (new Date()).getDay();\n\n  for (let index = 0; index < list.length; index += 1) {\n    const listDay = (new Date(list[index].dt_txt)).getDay();\n    const listHour = (new Date(list[index].dt_txt)).getHours();\n    if (listDay === day && listHour > 6) {\n      const formatForecastData = Object(_helpers_formatUnits__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list[index]);\n      filtered.push(formatForecastData);\n      day += 1;\n      day %= 7;\n    }\n    if (filtered.length === 5) { break; }\n  }\n\n  return { forecasts: filtered, cityName };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getWeatherData);\n\n\n//# sourceURL=webpack:///./src/modules/weather.js?");

/***/ })

/******/ });