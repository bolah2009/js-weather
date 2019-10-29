[![Netlify Status](https://api.netlify.com/api/v1/badges/590c5e6a-dd37-4d26-a917-523d204052e6/deploy-status)](https://app.netlify.com/sites/bolah-js-weather/deploys)

# PROJECT: Weather Forecast App

This is the fifth project of the Main JavaScript curriculum at [Microverse](https://www.microverse.org/) - @microverseinc

The objective is to create a weather forecast app using the weather API. The features of the app also include:

- Use `async/await` and `Fetch API` to get data from the [OpenWeatherMap API](https://openweathermap.org/) and populate data to the DOM
- Format unit appropriately, add `%`, `°F`, `°C`, `mph`, `km/h`, etc
- Add unit conversions from metric to imperial and vice versa
- Style background to change according to weather conditions
- Improve city search using [Google Places API](https://developers.google.com/places/web-service/intro)
- Add current location functionality using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

### [Assignment link](https://www.theodinproject.com/courses/javascript/lessons/weather-app)

### Development

- Dependencies

  - `eslint`: `^6.3.0`
  - `eslint-config-airbnb`: `^18.0.1`
  - `eslint-config-airbnb-base`: `^14.0.0`
  - `eslint-plugin-import`: `^2.18.2`
  - `stylelint`: `^11.0.0`
  - `stylelint-config-recommended`: `^3.0.0`
  - `webpack`: `^4.40.0`
  - `webpack-cli`: `^3.3.8`
  - `webpack-dev-server`: `^3.8.1`

- Clone the project

```bash
git clone https://github.com/bolah2009/js-weather.git

```

- Instal Dependencies

```bash
npm install
```

- Set up environment variables:

To use in the development environment, please, configure [`dotenv`](https://github.com/motdotla/dotenv) by renaming the `.env.sample` to `.env` and replacing `YOUR_API_KEY_HERE` to appropriate API keys.

See [OpenWeatherMap API guide](https://openweathermap.org/guide) for `WEATHER_API` and
[Places API guide](https://developers.google.com/places/web-service/intro) for `PLACES_API`.

- Run Script (Development mode)

```bash
npm run dev
```

- Run Script (Production mode)

```bash
npm run build
```

- Start server

```bash
npm run start
```

### Usage

The placeholder of the search input shows the format it accepts which is a city name `city`. e.g. `lagos`, `london`, `Abuja` and it's not case sensitive. See the demo below.

![weather_app_preview](https://user-images.githubusercontent.com/36057474/67805778-ea52af00-fa91-11e9-9398-3ccfcb1126fc.gif)

The input also generates location predictions using Google Place API, clicking on one of the suggestions gives a weather information. See the demo below.

![weather_app_predictions](https://user-images.githubusercontent.com/36057474/67806226-bfb52600-fa92-11e9-929c-aa3edab1c70d.gif)

### [Live link](https://bolah-js-weather.netlify.com/)

### Screenshots

|                                                     Small Screen                                                      |                                                     Medium Screen                                                      |
| :-------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![Small Screen](https://user-images.githubusercontent.com/36057474/67806287-d9566d80-fa92-11e9-974e-ffb15f54755d.png) | ![Medium Screen](https://user-images.githubusercontent.com/36057474/67806286-d8bdd700-fa92-11e9-94ad-a2fe0bfee6c9.png) |

### Authors

- [@bolah2009](https://github.com/bolah2009/)
