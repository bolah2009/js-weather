const path = require('path');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEATHER_API': JSON.stringify(process.env.WEATHER_API),
      'process.env.PLACES_API': JSON.stringify(process.env.PLACES_API),
      'process.env.GEOLOCATION_API': JSON.stringify(process.env.GEOLOCATION_API),
    }),
  ],
};
