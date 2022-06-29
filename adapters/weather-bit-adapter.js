import moment from 'moment-timezone';
import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';


export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    const res = emptyWeatherObject;
    let moment_time = null;
    let current;
    try {
      current = this.weatherBitApiService.getCurrent(cityName)

      const firstDataObject = get(current, 'data[0]');
      if (get(firstDataObject, 'ob_time') && get(firstDataObject, 'timezone')) {
        moment_time = moment.tz(firstDataObject.ob_time, firstDataObject.timezone).format()
      }
        

      res.lastObservationTime        = moment_time ? new Date(moment_time) : null,
      res.location.cityName          = get(firstDataObject, 'city_name')
      res.location.countryCode       = get(firstDataObject, 'country_code')
      res.weather.currentTemperature = get(firstDataObject, 'temp')
      res.weather.minTemperature     = null
      res.weather.maxTemperature     = null
      res.weather.units              = 'C'
      res.weather.description        = get(firstDataObject, 'weather.description')
      res.weather.iconUrl            = this.weatherBitApiService.getIconUrl(get(firstDataObject, 'weather.icon'))
  
      return res;      
      
    } catch (error) {
      return emptyWeatherObject;
    }


  }
  
}
