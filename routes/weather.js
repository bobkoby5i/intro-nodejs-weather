import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { OpenWeatherMapAdapter } from '../adapters/open-weather-map-adapter.js';
import { WeatherBitAdapter } from '../adapters/weather-bit-adapter.js';
import { AccuWeatherAdapter } from '../adapters/accu-weather-adapter.js';

import {
  OpenWeatherApiService,
  OpenWeatherMockService,
} from '../api-services/open-weather-api-service.js';
import {
  WeatherBitApiService,
  WeatherBitMockService,
} from '../api-services/weather-bit-api-service.js';
import {
  AccuWeatherApiService,
  AccuWeatherMockService,
} from '../api-services/accu-weather-api-service.js';

export const router = express.Router();

// === APPLICATION BOOTSTRAP

/*
 By default all APIs will respond with hardcoded json mock data. Set each API to false in order to use real endpoint. 
 Beware of requet number limits per day.
 */

const openWeatherService =
  process.env.OPEN_WEATHER_MAP_MOCK === 'true'
    ? new OpenWeatherMockService()
    : new OpenWeatherApiService(
        process.env.OPEN_WEATHER_MAP_ICON_BASE_URL,
        process.env.OPEN_WEATHER_MAP_API_BASE_URL,
        process.env.OPEN_WEATHER_MAP_API_KEY,
      );

const weatherBitService =
  process.env.WEATHER_BIT_MOCK === 'true'
    ? new WeatherBitMockService()
    : new WeatherBitApiService(
        process.env.WEATHER_BIT_ICON_BASE_URL,
        process.env.WEATHER_BIT_API_BASE_URL,
        process.env.WEATHER_BIT_API_KEY,
      );

const accuWeatherService =
  process.env.ACCU_WEATHER_MOCK === 'true'
    ? new AccuWeatherMockService()
    : new AccuWeatherApiService(
        process.env.ACCU_WEATHER_ICON_BASE_URL,
        process.env.ACCU_WEATHER_API_BASE_URL,
        process.env.ACCU_WEATHER_API_KEY,
      );

// console.log(openWeatherService)      
// console.log(weatherBitService)      
// console.log(accuWeatherService)      

const openWeatherMapAdapter = new OpenWeatherMapAdapter(openWeatherService);
const weatherBitAdapter = new WeatherBitAdapter(weatherBitService);
const accuWeatherAdapter = new AccuWeatherAdapter(accuWeatherService);

router.get('/', async (req, res) => {
  //const locationSearch = 'Warszawa'; // take it from request params
  const locationSearch = req.query.city
  const responses = []

  const [openWeatherMap, weatherBit, accuWeather] = await Promise.all([
    openWeatherMapAdapter.getWeather(locationSearch),
    weatherBitAdapter.getWeather(locationSearch),
    accuWeatherAdapter.getWeather(locationSearch),
  ]);

  const openWeatherMap2 = await openWeatherMapAdapter.getWeather(locationSearch);
  const weatherBit2     = await weatherBitAdapter.getWeather(locationSearch);
  const accuWeather2    = await accuWeatherAdapter.getWeather(locationSearch);

  console.log("openWeatherMap2",openWeatherMap2)
  console.log("weatherBit2",weatherBit2)
  console.log("accuWeather2",accuWeather2)

  res.json({ openWeatherMap:openWeatherMap2, weatherBit:weatherBit2, accuWeather:accuWeather2 });
});
