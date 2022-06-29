import get from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';


export class OpenWeatherMapAdapter {
  constructor(openWeatherMapAdapter) {
    this.openWeatherMapAdapter = openWeatherMapAdapter;
  }

  async getWeather(cityName) {


    const res = emptyWeatherObject;

    let currentCondition;
  

    try {
      currentCondition = await this.openWeatherMapAdapter.getWeather(cityName);
      res.location.cityName          = get(currentCondition, 'name')
      res.location.countryCode       = get(currentCondition, 'sys.country')
      res.lastObservationTime        = new Date(1000 * currentCondition.dt),
      res.weather.currentTemperature = get(currentCondition, 'main.temp')
      res.weather.minTemperature     = get(currentCondition, 'main.temp_min')
      res.weather.maxTemperature     = get(currentCondition, 'main.temp_max')
      res.weather.units              = "C"
      res.weather.description        = get(currentCondition, 'weather[0].description')
      res.weather.iconUrl            = this.openWeatherMapAdapter.getIconUrl(get(currentCondition, 'weather[0].icon'))
  
      return res;      
    } catch (error) {
      return emptyWeatherObject;
    }    
    




  }
}
