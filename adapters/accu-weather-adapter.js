import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';


export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {


    const res = emptyWeatherObject;

    let currentCondition;
    let dailyForecast;
    let firstLocation;

    try {
      const location = await this.accuWeatherApiService.getLocation(cityName);
      firstLocation = location[0];

      [currentCondition, dailyForecast] = await Promise.all([
        this.accuWeatherApiService
          .getCurrentConditions(firstLocation.Key)
          .then((conditions) => conditions[0])
          .catch(() => ({})),
        this.accuWeatherApiService
          .getDailyForecast(firstLocation.Key)
          .catch(() => ({})),
      ]);  

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

    } catch (error) {
      return emptyWeatherObject;
    }       





  }
}
