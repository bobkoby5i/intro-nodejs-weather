import moment from 'moment-timezone';
import _ from 'lodash';

import { emptyWeatherObject } from './empty-weather-object.js';


export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    console.log("WeatherBitAdapter.getWeather()")

    let moment_time = null;
    let current;
    try {
      current = await this.weatherBitApiService.getCurrent(cityName)
      //console.log(current.data[0])

      const firstDataObject = _.get(current, 'data[0]');
      //console.log(firstDataObject)
      //console.log("HERE",_.get(firstDataObject, "ob_time"))
      if (_.get(firstDataObject, 'ob_time') && _.get(firstDataObject, 'timezone')) {
        moment_time = moment.tz(firstDataObject.ob_time, firstDataObject.timezone).format()
      }


      const res = {
        lastObservationTime:moment_time ? new Date(moment_time) : null,
        location:{
          cityName    : _.get(firstDataObject, 'city_name'),
          countryCode : _.get(firstDataObject, 'country_code')
        },
        weather: {
          currentTemperature: _.get(firstDataObject, 'temp'),
          minTemperature     : null,
          maxTemperature     : null,
          units              : 'C',
          description        : _.get(firstDataObject, 'weather.description'),
          iconUrl            : this.weatherBitApiService.getIconUrl(_.get(firstDataObject, 'weather.icon'))
        }
      };
        
  
      return  res;    
      
    } catch (error) {
      console.log("catch", error)
      return emptyWeatherObject;
    }


  }
  
}
