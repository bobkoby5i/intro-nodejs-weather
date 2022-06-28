import express from 'express';
import { getDataFromFile } from '../utils/utils.js';

export const router = express.Router();


router.get('/weatherbit-current', async (req, res) => {
    const weatherbitCurrent = await getDataFromFile('weatherbit_current.json');
    res.json(weatherbitCurrent);
  });

router.get('/accuweather_current', async function(req, res, next) {
    const data = await getDataFromFile('accuweather_current.json');
    //console.log(data)
    res.send(data)
  });
  
router.get('/openweathermap_current', async (req, res) => {
    const data = await getDataFromFile('openweathermap_current.json');
    res.json(data);
  });  

router.get('/accuweather_daily', async (req, res) => {
    const data = await getDataFromFile('accuweather_daily.json');
    res.json(data);
});

router.get('/accuweather_location', async (req, res) => {
    const data = await getDataFromFile('accuweather_location.json');
    res.json(data);
});  





