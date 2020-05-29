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

## 🌐 [Live link](https://bolah-js-weather.netlify.com/)

## 🖼️ Screenshots

|    Small Screen     |  Medium Screen   |
| :-----------------: | :--------------: |
| ![Small Screen](https://user-images.githubusercontent.com/36057474/67806287-d9566d80-fa92-11e9-974e-ffb15f54755d.png) | ![Medium Screen](https://user-images.githubusercontent.com/36057474/67806286-d8bdd700-fa92-11e9-94ad-a2fe0bfee6c9.png) |

## 🛠️ Development

- Clone the project

```bash
git clone https://github.com/bolah2009/js-weather.git
```

- Install Dependencies

```bash
yarn install
```

- Run linter (eslint and stylelint)

```bash
yarn lint:check
```

- Run Prettier

```bash
yarn format:check
```

- Set up environment variables:

To use in the development environment, please, configure [`dotenv`](https://github.com/motdotla/dotenv) by running the command below to copy `.env.sample` into `.env`:

```sh
cp .env.sample .env
```

and replacing `YOUR_API_KEY_HERE` to appropriate API keys.

See [OpenWeatherMap API guide](https://openweathermap.org/guide) for `WEATHER_API` and
[Places API guide](https://developers.google.com/places/web-service/intro) for `PLACES_API`.

- Start server (Development mode)

```bash
yarn start
```

## 🧾 TODO

- Improve UI/UX

## 👨🏽‍🏫 Usage

The placeholder of the search input shows the format it accepts which is a city name `city`. e.g. `lagos`, `london`, `Abuja` and it's not case sensitive. See the demo below.

![weather_app_preview](https://user-images.githubusercontent.com/36057474/67805778-ea52af00-fa91-11e9-9398-3ccfcb1126fc.gif)

The input also generates location predictions using Google Place API, clicking on one of the suggestions gives a weather information. See the demo below.

![weather_app_predictions](https://user-images.githubusercontent.com/36057474/67806226-bfb52600-fa92-11e9-929c-aa3edab1c70d.gif)

## 🤝🏾 Contributing

- Contributions, issues and feature requests are welcome!

- Feel free to check the [issues page](../../issues).

## ⭐️ Show your support

- Give a ⭐️ if you like this project!

## 🙏🏾 Acknowledgments

- Microverse Team
- [The Odin Project](https://www.theodinproject.com/courses/javascript/lessons/weather-app)

## 👨🏽‍💻 Author

- [@bolah2009](https://github.com/bolah2009/)

## 📝 License

- [MIT licensed](./LICENSE).
