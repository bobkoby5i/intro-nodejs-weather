import _ from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';


export class OpenWeatherMapAdapter {
  constructor(openWeatherService) {
    this.openWeatherService = openWeatherService;
  }

  async getWeather(cityName) {
    console.log("OpenWeatherMapAdapter class")



    let currentCondition;
  

    try {
      currentCondition = await this.openWeatherService.getWeather(cityName);

  


      const res = {
        lastObservationTime:new Date(1000 * currentCondition.dt),
        location:{
          cityName    : _.get(currentCondition, 'name'),
          countryCode : _.get(currentCondition, 'sys.country')
        },
        weather: {
          currentTemperature : _.get(currentCondition, 'main.temp'),
          minTemperature     : _.get(currentCondition, 'main.temp_min'),
          maxTemperature     : _.get(currentCondition, 'main.temp_max'),
          units              : 'C',
          description        : _.get(currentCondition, 'weather[0].description'),
          iconUrl            : this.openWeatherService.getIconUrl(_.get(currentCondition, 'weather[0].icon')),
        }
      };


      return res;      
    } catch (error) {
      console.log(error)
      return emptyWeatherObject;
    }    
    




  }
}
