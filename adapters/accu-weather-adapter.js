import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';
import { AccuWeatherMockService } from '../api-services/accu-weather-api-service.js';

export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {

    const accuWeatherMockService = new AccuWeatherMockService();
    const res = emptyWeatherObject;

    let currentCondition;
    let dailyForecast;
    let firstLocation;

    try {
      const location = await this.accuWeatherApiService.getLocation(cityName);
      const firstLocation = location[0];

      const [currentCondition, dailyForecast] = await Promise.all([
        this.accuWeatherApiService
          .getCurrentConditions(firstLocation.Key)
          .then((conditions) => conditions[0])
          .catch(() => ({})),
        this.accuWeatherApiService
          .getDailyForecast(firstLocation.Key)
          .catch(() => ({})),
      ]);      

    } catch (error) {
      current = accuWeatherMockService.getLocation(cityName)
      firstLocation     = await accuWeatherMockService.getLocation(cityName)
      currentCondition  = await accuWeatherMockService.getCurrentConditions(firstLocation.Key)
      dailyForecast     = await accuWeatherMockService.getDailyForecast(firstLocation.Key)
    }       


    res.location.cityName          = get(firstLocation, 'EnglishName')
    res.location.countryCode       = get(firstLocation, 'Country.ID')
    res.lastObservationTime        = new Date(currentCondition.LocalObservationDateTime),
    res.weather.currentTemperature = get(currentCondition, 'Temperature.Metric.Value')
    res.weather.minTemperature     = get(dailyForecast, 'DailyForecasts[0].Temperature.Minimum.Value')
    res.weather.maxTemperature     = get(dailyForecast, 'DailyForecasts[0].Temperature.Maximum..Value')
    res.weather.units              = get(currentCondition, 'Temperature.Metric.Unit')
    res.weather.description        = get(currentCondition, 'WeatherText')
    res.weather.iconUrl            = this.accuWeatherApiService.getIconUrl(get(currentCondition, 'WeatherIcon'))

    return res;


  }
}
