import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';

export class OpenWeatherMapAdapter {
  constructor(openWeatherMapAdapter) {
    this.openWeatherMapAdapter = openWeatherMapAdapter;
  }

  async getWeather(cityName) {}
}
