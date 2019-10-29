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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_api_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api/weather */ \"./src/modules/api/weather.js\");\n/* harmony import */ var _modules_api_places__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/api/places */ \"./src/modules/api/places.js\");\n/* harmony import */ var _modules_api_geolocation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/api/geolocation */ \"./src/modules/api/geolocation.js\");\n\n\n\n\nconst mainContent = document.querySelector('#content');\nconst locationHeaderElement = document.querySelector('.weather-location');\nconst mainWeatherDataElement = document.querySelectorAll('.main-weather-data');\nconst forecastDataElement = document.querySelectorAll('.forecast-card');\nconst unitCheckBox = document.querySelector('input[type=\"checkbox\"]');\nconst predictionsDataListElement = document.querySelector('#predictions');\nconst locationInput = document.querySelector('#location');\nconst spinner = document.querySelector('.card.loading');\nconst spinnerStatus = document.querySelector('.card.loading .text');\n\n\nconst populateForecastData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {\n  let { forecasts, cityName, message } = await Object(_modules_api_weather__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(info);\n\n  const locationHeader = (status = cityName) => {\n    locationHeaderElement.textContent = status;\n  };\n\n  if (message) { return locationHeader(message); }\n  const attachDataToDOM = (position, element, unitType = 'metric') => {\n    const mainForecast = forecasts[position][unitType];\n    element.forEach(({ dataset: { name } }, index) => {\n      if (name === 'weatherIcon') {\n        const iconSource = `https://openweathermap.org/img/wn/${mainForecast[name]}@2x.png`;\n        element[index].src = iconSource;\n        element[index].alt = mainForecast.weatherDescription;\n        return;\n      }\n      element[index].innerHTML = mainForecast[name];\n    });\n  };\n\n  const weatherClass = [\n    'thunderstorm-weather', 'drizzle-weather', 'snow-weather',\n    'tornado-weather', 'clear-weather', 'mist-weather',\n    'smoke-weather', 'haze-weather', 'dust-weather',\n    'fog-weather', 'sand-weather', 'ash-weather',\n    'squall-weather', 'clouds-weather', 'rain-weather',\n  ];\n  const toWeatherClass = weatherCondition => `${weatherCondition.toLowerCase()}-weather`;\n  const styleBackground = (backgroundElement, { weatherCondition }) => {\n    backgroundElement.classList.remove(...weatherClass);\n    backgroundElement.classList.add(toWeatherClass(weatherCondition));\n  };\n\n  const main = (unit, day = 0) => {\n    attachDataToDOM(day, mainWeatherDataElement, unit);\n    styleBackground(mainContent, forecasts[day][unit]);\n  };\n\n  const forecast = unit => {\n    forecastDataElement.forEach(card => {\n      const { dataset: { day } } = card;\n      const cardNodeList = card.querySelectorAll('[data-name]');\n      attachDataToDOM(day, cardNodeList, unit);\n    });\n  };\n\n  const all = (unit = 'metric') => {\n    locationHeader(cityName);\n    main(unit);\n    forecast(unit);\n  };\n\n  const toggleUnit = (unit, day) => {\n    main(unit, day);\n    forecast(unit);\n  };\n\n  const changeCity = async (newInfo, newUnit) => {\n    ({ forecasts, cityName, message } = await Object(_modules_api_weather__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(newInfo));\n    if (message) { return locationHeader(message); }\n    return all(newUnit);\n  };\n\n  return {\n    all, main, toggleUnit, changeCity,\n  };\n};\n\nconst populateAutocomplete = async input => {\n  const { status, predictionsList } = await Object(_modules_api_places__WEBPACK_IMPORTED_MODULE_1__[\"getPlaceAutocomplete\"])(input);\n  const resultHTML = (description = 'No Result Found', placeID = null) => `\n  <li class=\"prediction-list\" >\n    <button type=\"button\" class=\"prediction-list-item\" data-value=${placeID} data-type=\"predictions\">\n      ${description}\n    </button>\n  </li>\n  `;\n  if (status) {\n    predictionsDataListElement.innerHTML = resultHTML();\n    return false;\n  }\n\n  const predictionOptions = [];\n  predictionsList.forEach(prediction => {\n    const { description, placeID } = prediction;\n    predictionOptions.push(resultHTML(description, placeID));\n  });\n  predictionsDataListElement.innerHTML = predictionOptions.join('');\n  return true;\n};\n\nconst startApp = () => {\n  const metric = document.querySelector('#metric');\n  const imperial = document.querySelector('#imperial');\n  const forecastDataPromise = populateForecastData();\n  const toggleActiveForecastCard = (cards, oldCard, newCard) => {\n    if (oldCard === newCard) { return; }\n    cards[oldCard].classList.remove('active');\n    cards[newCard].classList.add('active');\n  };\n\n  let main = 0;\n\n  const getUnit = () => (unitCheckBox.checked ? 'imperical' : 'metric');\n  const handleCurrentLocation = position => {\n    if (position.status) {\n      spinnerStatus.textContent = `${position.status}, loading default location weather details`;\n      forecastDataPromise.then(obj => {\n        obj.all(getUnit());\n        setTimeout(() => spinner.classList.add('d-none'), 1000);\n      });\n    } else {\n      spinnerStatus.textContent = 'Location found, loading weather details';\n      const info = { location: position, type: 'location' };\n      forecastDataPromise.then(obj => {\n        obj.changeCity(info, getUnit());\n        setTimeout(() => spinner.classList.add('d-none'), 100);\n      });\n    }\n  };\n\n  Object(_modules_api_geolocation__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(handleCurrentLocation);\n\n  unitCheckBox\n    .addEventListener('click', ({ target: { checked } }) => {\n      forecastDataPromise.then(obj => obj.toggleUnit(getUnit(), main));\n      imperial.classList.toggle('checked', checked);\n      metric.classList.toggle('checked', !checked);\n    });\n\n  document\n    .querySelector('#get-location')\n    .addEventListener('click', () => {\n      const info = { city: locationInput.value, type: 'city' };\n      spinner.classList.remove('d-none');\n      forecastDataPromise.then(obj => {\n        obj.changeCity(info, getUnit());\n        setTimeout(() => spinner.classList.add('d-none'), 1000);\n      });\n      toggleActiveForecastCard(forecastDataElement, main, 0);\n      main = 0;\n    });\n\n  forecastDataElement.forEach((node, key) => {\n    node.addEventListener('click', () => {\n      if (main === key) { return; }\n      toggleActiveForecastCard(forecastDataElement, main, key);\n      forecastDataPromise.then(obj => obj.main(getUnit(), key));\n      main = key;\n    });\n  });\n\n  locationInput.addEventListener('keyup', ({ currentTarget: { value } }) => {\n    if (value.length > 2) {\n      populateAutocomplete(value);\n    }\n  });\n\n  predictionsDataListElement.addEventListener('click', ({ target: { dataset: { type, value } } }) => {\n    if (!type || type !== 'predictions' || value === 'null') { return; }\n    const placeID = value;\n    spinner.classList.remove('d-none');\n    Object(_modules_api_places__WEBPACK_IMPORTED_MODULE_1__[\"getPlaceDetails\"])(placeID).then(location => {\n      const info = { location, type: 'location' };\n      forecastDataPromise.then(obj => {\n        obj.changeCity(info, getUnit());\n        setTimeout(() => spinner.classList.add('d-none'), 1000);\n      });\n    });\n  });\n};\n\nstartApp();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/api/geolocation.js":
/*!****************************************!*\
  !*** ./src/modules/api/geolocation.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst getCurrentLocation = handleLocation => {\n  const getLocation = (lat, lon) => ({ lat, lon });\n  const success = position => {\n    const location = getLocation(position.coords.latitude, position.coords.longitude);\n    handleLocation(location);\n  };\n  const error = e => {\n    let status = 'Current Location not avaliable';\n    switch (e.code) {\n      case e.PERMISSION_DENIED:\n        status = 'You denied the request for Geolocation. 😞';\n        break;\n      case e.POSITION_UNAVAILABLE:\n        status = 'Location information is unavailable.';\n        break;\n      case e.TIMEOUT:\n        status = 'The request to get user location timed out.';\n        break;\n      case e.UNKNOWN_ERROR:\n        status = 'An unknown error occurred.';\n        break;\n      default:\n        break;\n    }\n    const message = { status };\n    handleLocation(message);\n  };\n  if (navigator.geolocation) {\n    navigator.geolocation.getCurrentPosition(success, error);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getCurrentLocation);\n\n\n//# sourceURL=webpack:///./src/modules/api/geolocation.js?");

/***/ }),

/***/ "./src/modules/api/places.js":
/*!***********************************!*\
  !*** ./src/modules/api/places.js ***!
  \***********************************/
/*! exports provided: getPlaceAutocomplete, getPlaceDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlaceAutocomplete\", function() { return getPlaceAutocomplete; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlaceDetails\", function() { return getPlaceDetails; });\nconst apiKey = \"AIzaSyBU0v6zdTSXN2tCj4S7XRGfBTo_5hi2DMY\";\nconst proxyurl = 'https://cors-anywhere.herokuapp.com/';\nconst placesAutocompleteUri = input => `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`;\nconst placesDetailsUri = placeId => `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`;\n\nconst fetchPlacesApi = async input => {\n  const response = await fetch(proxyurl + input);\n  const data = await response.json();\n  return data;\n};\n\nconst fetchPlaceAutocomplete = input => fetchPlacesApi(placesAutocompleteUri(input));\n\nconst fetchPlaceDetails = input => fetchPlacesApi(placesDetailsUri(input));\n\nconst getPlaceAutocomplete = async input => {\n  const predictionsList = [];\n  const { status, predictions } = await fetchPlaceAutocomplete(input);\n  if (status === 'OK') {\n    predictions.forEach(prediction => {\n      const { description, place_id: placeID } = prediction;\n      predictionsList.push({ description, placeID });\n    });\n    return { predictionsList };\n  }\n  return { status };\n};\n\nconst getPlaceDetails = async placeID => {\n  const { status, result } = await fetchPlaceDetails(placeID);\n  if (status === 'OK') {\n    const { geometry: { location: { lat, lng: lon } } } = result;\n    return { lat, lon };\n  }\n  return { status };\n};\n\n\n//# sourceURL=webpack:///./src/modules/api/places.js?");

/***/ }),

/***/ "./src/modules/api/weather.js":
/*!************************************!*\
  !*** ./src/modules/api/weather.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_formatUnits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/formatUnits */ \"./src/modules/helpers/formatUnits.js\");\n\n\nconst apiKey = \"ed33e3ceb71d11a88646b4199155dac1\";\n\nconst getQuery = ({ type, location, city }) => {\n  if (type === 'city') {\n    return `q=${city}&appid=${apiKey}&units=metric`;\n  }\n  const { lat, lon } = location;\n  return `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;\n};\n\nconst fetchWeatherData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {\n  const uri = `https://api.openweathermap.org/data/2.5/forecast?${getQuery(info)}`;\n  const response = await fetch(uri);\n  const data = await response.json();\n  const { ok } = response;\n  return { data, ok };\n};\n\nconst getWeatherData = async (info = { location: {}, type: 'city', city: 'Lagos,ng' }) => {\n  const { data, ok } = await fetchWeatherData(info);\n  if (!ok) {\n    const { message } = data;\n    return { message };\n  }\n\n  const { list = [], city: { name: cityName } } = data;\n\n  const filtered = [];\n\n  let day = (new Date()).getDay();\n\n  for (let index = 0; index < list.length; index += 1) {\n    const listDay = (new Date(list[index].dt_txt)).getDay();\n    const listHour = (new Date(list[index].dt_txt)).getHours();\n    if (listDay === day && listHour > 6) {\n      const formatForecastData = Object(_helpers_formatUnits__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list[index]);\n      filtered.push(formatForecastData);\n      day += 1;\n      day %= 7;\n    } else if ((new Date()).getDay() === day && (new Date()).getHours() > 20) {\n      day += 1;\n      day %= 7;\n    }\n    if (filtered.length === 5) { break; }\n  }\n  return { forecasts: filtered, cityName };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getWeatherData);\n\n\n//# sourceURL=webpack:///./src/modules/api/weather.js?");

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

/***/ })

/******/ });