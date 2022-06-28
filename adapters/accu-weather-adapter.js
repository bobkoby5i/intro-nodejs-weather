import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';

export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {}
}
