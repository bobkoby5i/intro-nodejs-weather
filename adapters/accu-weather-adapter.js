import _ from 'lodash';


import { emptyWeatherObject } from './empty-weather-object.js';


export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {
    console.log("AccuWeatherAdapter.getWeather")
    


    
    let firstLocation;

    try {
      const location = await this.accuWeatherApiService.getLocation(cityName);
      firstLocation = location[0];

      console.log(firstLocation.Key, firstLocation.LocalizedName)


      // const currentCondition = await this.accuWeatherApiService
      //       .getCurrentConditions(firstLocation.Key)
      //       .then((conditions) => {
      //         console.log("THEN",conditions)
      //         return conditions[0]
      //       })
      //       .catch((error) => {
      //         console.log("CATCH", error)
      //         return ({})
      //       });
      // const dailyForecast = await this.accuWeatherApiService
      //      .getDailyForecast(firstLocation.Key)
      //      .catch((error) => {
      //       console.log("CATCH", error)
      //       return ({})
      //      })


      const [currentCondition, dailyForecast] = await Promise.all([
        this.accuWeatherApiService
          .getCurrentConditions(firstLocation.Key)
          .then((conditions) => conditions[0])
          .catch((error) => {
                  console.log("CATCH", error)
                  return ({})
                 }),
        this.accuWeatherApiService
          .getDailyForecast(firstLocation.Key)
          .catch((error) => {
            console.log("CATCH", error)
            return ({})
           }),
      ]);  

      const res = {
        lastObservationTime:new Date(currentCondition.LocalObservationDateTime),
        location:{
          cityName    : _.get(firstLocation, 'EnglishName'),
          countryCode : _.get(firstLocation, 'Country.ID'),
        },
        weather: {
          currentTemperature : _.get(currentCondition, 'Temperature.Metric.Value'),
          minTemperature     : _.get(dailyForecast, 'DailyForecasts[0].Temperature.Minimum.Value'),
          maxTemperature     : _.get(dailyForecast, 'DailyForecasts[0].Temperature.Maximum..Value'),
          units              : _.get(currentCondition, 'Temperature.Metric.Unit'),
          description        : _.get(currentCondition, 'WeatherText'),
          iconUrl            : this.accuWeatherApiService.getIconUrl(_.get(currentCondition, 'WeatherIcon')),
        }
      };

      return res;      

    } catch (error) {
      console.log("error", error)
      return emptyWeatherObject;
    }       





  }
}
