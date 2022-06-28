import moment from 'moment-timezone';
import get from 'lodash.get';

import { emptyWeatherObject } from './empty-weather-object.js';

export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {}
}
