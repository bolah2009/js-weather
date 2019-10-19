/** *** */ (function (modules) { // webpackBootstrap
/** *** */ 	// The module cache
/** *** */ 	const installedModules = {};
  /** *** */
  /** *** */ 	// The require function
  /** *** */ 	function __webpack_require__(moduleId) {
    /** *** */
    /** *** */ 		// Check if module is in cache
    /** *** */ 		if (installedModules[moduleId]) {
      /** *** */ 			return installedModules[moduleId].exports;
      /** *** */ 		}
    /** *** */ 		// Create a new module (and put it into the cache)
    /** *** */ 		const module = installedModules[moduleId] = {
      /** *** */ 			i: moduleId,
      /** *** */ 			l: false,
      /** *** */ 			exports: {},
      /** *** */ 		};
    /** *** */
    /** *** */ 		// Execute the module function
    /** *** */ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /** *** */
    /** *** */ 		// Flag the module as loaded
    /** *** */ 		module.l = true;
    /** *** */
    /** *** */ 		// Return the exports of the module
    /** *** */ 		return module.exports;
    /** *** */ 	}
  /** *** */
  /** *** */
  /** *** */ 	// expose the modules object (__webpack_modules__)
  /** *** */ 	__webpack_require__.m = modules;
  /** *** */
  /** *** */ 	// expose the module cache
  /** *** */ 	__webpack_require__.c = installedModules;
  /** *** */
  /** *** */ 	// define getter function for harmony exports
  /** *** */ 	__webpack_require__.d = function (exports, name, getter) {
    /** *** */ 		if (!__webpack_require__.o(exports, name)) {
      /** *** */ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /** *** */ 		}
    /** *** */ 	};
  /** *** */
  /** *** */ 	// define __esModule on exports
  /** *** */ 	__webpack_require__.r = function (exports) {
    /** *** */ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /** *** */ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /** *** */ 		}
    /** *** */ 		Object.defineProperty(exports, '__esModule', { value: true });
    /** *** */ 	};
  /** *** */
  /** *** */ 	// create a fake namespace object
  /** *** */ 	// mode & 1: value is a module id, require it
  /** *** */ 	// mode & 2: merge all properties of value into the ns
  /** *** */ 	// mode & 4: return value when already ns object
  /** *** */ 	// mode & 8|1: behave like require
  /** *** */ 	__webpack_require__.t = function (value, mode) {
    /** *** */ 		if (mode & 1) value = __webpack_require__(value);
    /** *** */ 		if (mode & 8) return value;
    /** *** */ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /** *** */ 		const ns = Object.create(null);
    /** *** */ 		__webpack_require__.r(ns);
    /** *** */ 		Object.defineProperty(ns, 'default', { enumerable: true, value });
    /** *** */ 		if (mode & 2 && typeof value !== 'string') for (const key in value) __webpack_require__.d(ns, key, ((key) => value[key]).bind(null, key));
    /** *** */ 		return ns;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// getDefaultExport function for compatibility with non-harmony modules
  /** *** */ 	__webpack_require__.n = function (module) {
    /** *** */ 		const getter = module && module.__esModule
    /** *** */ 			? function getDefault() { return module.default; }
    /** *** */ 			: function getModuleExports() { return module; };
    /** *** */ 		__webpack_require__.d(getter, 'a', getter);
    /** *** */ 		return getter;
    /** *** */ 	};
  /** *** */
  /** *** */ 	// Object.prototype.hasOwnProperty.call
  /** *** */ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /** *** */
  /** *** */ 	// __webpack_public_path__
  /** *** */ 	__webpack_require__.p = '';
  /** *** */
  /** *** */
  /** *** */ 	// Load entry module and return exports
  /** *** */ 	return __webpack_require__(__webpack_require__.s = './src/index.js');
/** *** */ }({

  /** */ './src/index.js':
  /*! **********************!*\
  !*** ./src/index.js ***!
  \********************* */
  /*! no exports provided */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weather */ \"./src/modules/weather.js\");\n\n\n\nconst locationHeaderElement = document.querySelector('.weather-location');\nconst mainWeatherDataElement = document.querySelectorAll('.main-weather-data');\nconst forecastDataElement = document.querySelectorAll('.forecast-card');\n\n\nconst populateForecastData = async (city = 'Lagos,ng') => {\n  const { forecasts, cityName } = await Object(_modules_weather__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(city);\n\n  const locationHeader = () => {\n    locationHeaderElement.textContent = cityName;\n  };\n\n  const attachDataToDOM = (position, element) => {\n    const mainForecast = forecasts[position];\n    element.forEach(({ dataset: { name } }, index) => {\n      if (name === 'weatherIcon') {\n        const iconSource = `http://openweathermap.org/img/wn/${mainForecast[`${name}`]}@2x.png`;\n        element[index].src = iconSource;\n        element[index].alt = mainForecast.weatherDescription;\n        return;\n      }\n      element[index].textContent = mainForecast[`${name}`];\n    });\n  };\n\n  const main = (day = 0) => {\n    attachDataToDOM(day, mainWeatherDataElement);\n  };\n\n  const forecast = () => {\n    forecastDataElement.forEach((card) => {\n      const { dataset: { day } } = card;\n      const cardNodeList = card.querySelectorAll('[data-name]');\n      attachDataToDOM(day, cardNodeList);\n    });\n  };\n\n  const all = () => {\n    locationHeader();\n    main();\n    forecast();\n  };\n\n  return { all, main };\n};\n\n\nconst startApp = () => {\n  const metric = document.querySelector('#metric');\n  const imperial = document.querySelector('#imperial');\n  const locationInput = document.querySelector('#location');\n\n  populateForecastData().then((obj) => obj.all());\n\n\n  document\n    .querySelector('input[type=\"checkbox\"]')\n    .addEventListener('click', ({ target: { checked } }) => {\n      imperial.classList.toggle('checked', checked);\n      metric.classList.toggle('checked', !checked);\n    });\n\n  document\n    .querySelector('#get-location')\n    .addEventListener('click', () => {\n      const city = locationInput.value;\n      populateForecastData(city).then((obj) => obj.all());\n    });\n};\n\nstartApp();\n\n\n//# sourceURL=webpack:///./src/index.js?");
    /** */ }),

  /** */ './src/modules/weather.js':
  /*! ********************************!*\
  !*** ./src/modules/weather.js ***!
  \******************************* */
  /*! exports provided: default */
  /** */ (function (module, __webpack_exports__, __webpack_require__) {
    eval('__webpack_require__.r(__webpack_exports__);\nconst apiKey = "ed33e3ceb71d11a88646b4199155dac1";\n\nconst getWeatherData = async (location) => {\n  const uri = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;\n  const response = await fetch(uri);\n  const { list, city: { name: cityName } } = await response.json();\n\n  const getForcastData = (data) => {\n    const {\n      dt_txt: date,\n      clouds: { all: cloudiness },\n      main: {\n        humidity,\n        pressure,\n        temp,\n        temp_max: tempMax,\n        temp_min: tempMin,\n        grnd_level: groundLevel,\n        sea_level: seaLevel,\n      },\n      weather: [{\n        main: weatherCondition,\n        description: weatherDescription,\n        icon: weatherIcon,\n      }],\n      wind: {\n        deg: windDirection,\n        speed: windSpeed,\n      },\n    } = data;\n\n    return {\n      date,\n      cloudiness,\n      humidity,\n      pressure,\n      temp,\n      tempMax,\n      tempMin,\n      groundLevel,\n      seaLevel,\n      weatherCondition,\n      weatherDescription,\n      weatherIcon,\n      windDirection,\n      windSpeed,\n    };\n  };\n\n  const filtered = [];\n\n  let day = (new Date()).getDay();\n\n  for (let index = 0; index < list.length; index += 1) {\n    const listDay = (new Date(list[index].dt_txt)).getDay();\n    if (listDay === day) {\n      filtered.push(getForcastData(list[index]));\n      day += 1;\n      day %= 7;\n    }\n    if (filtered.length === 5) { break; }\n  }\n  return { forecasts: filtered, cityName };\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (getWeatherData);\n\n\n//# sourceURL=webpack:///./src/modules/weather.js?');
    /** */ }),

/** *** */ }));
