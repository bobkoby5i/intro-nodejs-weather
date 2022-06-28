import axios from 'axios';
import fetch from 'node-fetch';
import https from 'https';
import moment from 'moment-timezone';



// const axios = require('axios');
// const https = require('https');
// const fetch = require('node-fetch');


//set WEATHERBIT_API_KEY=09890890890
// powershell 
// dir env:
// $env:WEATHERBIT_API_KEY
// $env:OPEN_WATHER_API_KEY
// 
// $env:WEATHER_BIT_API_KEY  = '345345345'
// $env:WEATHER_OPEN_API_KEY = '345345345'
// $env:WEATHER_ACCU_API_KEY = '345345345'
const WEATHER_BIT_API_KEY  = process.env.WEATHER_BIT_API_KEY;
const WEATHER_OPEN_API_KEY = process.env.WEATHER_OPEN_API_KEY;
const WEATHER_ACCU_API_KEY = process.env.WEATHER_ACCU_API_KEY;


const city    = "warsaw"
const city2   = "warsaw,PL"
const cityKey = '2696858';
const metric  = true;

const server_weather_bit = 'api.weatherbit.io'
const url_weather_bit   = `http://api.weatherbit.io/v2.0/current?key=${WEATHER_BIT_API_KEY}&city=${city}`;
//const url_weather_open  = `https://api.openweathermap.org/data/2.5/forecast?lat=33.44&lon=-94.04&appid=${WEATHER_OPEN_API_KEY}&units=metric`;
const url_weather_open  = `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${WEATHER_OPEN_API_KEY}&units=metric`;
const url_weather_accu1 = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${WEATHER_ACCU_API_KEY}&metric=${metric}`;
const url_weather_accu2 = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${WEATHER_ACCU_API_KEY}`;


console.log("API KEY WEATHER BIT  : ", WEATHER_BIT_API_KEY)
console.log("API KEY OPEN WEATHER : ", WEATHER_OPEN_API_KEY)
console.log("API KEY WATHER ACCU  : ", WEATHER_ACCU_API_KEY)

console.log("URL WEATHER BIT  : ", url_weather_bit)
console.log("URL OPEN WEATHER : ", url_weather_open)
console.log("URL WATHER ACCU1 : ", url_weather_accu1)
console.log("URL WATHER ACCU2 : ", url_weather_accu2)


console.log("CITY   :", city)

// ***************************************************************
// Option 1 Axios:

 function get_temerature_with_axios_then(url) {
    console.log("Example 1: GET with AXIOS THEN")
    axios.get(url_weather_bit)
    .then(res => {
      console.log(`Example 1: statusCode: ${res.status}`);
      console.log('Example 1: Temperature = ', res.data.data[0].temp)
      return resolve(res);
    })
    .catch(error => {
      console.error(error);
    })    
    
}


async function get_temerature_with_axios_try_cath() {
    console.log("Example 2: GET with AXIOS TRY AWAIT")
    try {
        console.log("wait for axios")
        const res = await axios.get(url_weather_bit);
        console.log(`Example 2: statusCode: ${res.status}`);
        //console.log("res = ", res)
        console.log('Example 2: Temperature = ', res.data.data[0].temp)
        return res
    } catch (error) {
        console.log("wystapil error:")
        console.log(error)
    }
    
}


function httpGet(typeOfFilter) {
    return new Promise(((resolve, reject) => {
        const options = {
            hostname: server_weather_bit,
            port: 443,
            path: `/v2.0/current?key=${WEATHER_BIT_API_KEY}&city=${city}`,
            method: 'GET',
        };
  
      const request = https.request(options, (response) => {
        response.setEncoding('utf8');
        let returnData = '';
  
        response.on('data', (chunk) => {
          returnData += chunk;
        });
  
        response.on('end', () => {
              resolve(JSON.parse(returnData));
        });
  
        response.on('error', (error) => {
            throw error;
        });
      });
      
      request.end();
    }));
}


async function get_temerature_with_https(handlerInput) {
    console.log("Example 3: GET with https GET")
    const response = await httpGet();
    console.log('Example 3: Temperature = ', response.data[0].temp)
}

function get_temerature_with_node_fetch(url) {
    console.log("Example 4: GET with node fetch")
    //const body = { a: 1 };
    
    fetch(url, {
      method: 'get',
      //body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.json())
      .then((json) => {
        //console.log(json)
        console.log('Example 4: Temperature = ', json.data[0].temp)
      });
}


/***************  functions to get   *************************** */

function get_with_node_fetch(url) {
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.json())
      .then((json) => {
        return(json)
      });
}

async function get_with_axios_try_cath(url) {
    let data = undefined;
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    try {
        let res = await axios.get(url, { httpsAgent: agent });
        data = res.data
    } catch (error) {
        console.log("wystapil error:")
        console.log(error)
    }
    return data;
}

// get_temerature_with_axios_then()
//console.log(res)

// const res = await get_temerature_with_axios_try_cath();
// console.log(res)

//get_temerature_with_https();
// get_temerature_with_node_fetch(url_weather_bit);


let moment_time;


const res1 = await get_with_axios_try_cath(url_weather_bit);
const wb = res1.data[0]


console.log("--- weather bit ---")
//console.log("ob_time  = ", wb);
console.log("ob_time  = ", wb.ob_time);
console.log("timezone = ", wb.timezone);
console.log("ts       = ", wb.ts);
console.log("temp     = ", wb.temp);
moment_time = moment.tz(wb.ob_time, wb.timezone).format()
console.log("moment   = ", moment_time);
const wb_date = new Date(moment_time);
console.log("Date     = ", wb_date);




console.log("--- open weather ---")
const res2 = await get_with_axios_try_cath(url_weather_open);
const ow = res2

// console.log("dt       = ", ow);
console.log("dt       = ", ow.dt);
console.log("temp     = ", ow.main.temp);
const ow_date = new Date(1000 * ow.dt);
console.log("Date     = ", ow_date);


console.log("--- accu weather ---")
const res3 = await get_with_axios_try_cath(url_weather_accu1);
const aw = res3
// console.log("dt       = ", aw);
console.log("EffDate  = ", aw.Headline.EffectiveDate);
console.log("Temp     = ", aw.DailyForecasts[0].Temperature.Maximum.Value);
console.log("ob_time  = ", ow.main.temp);
const aw_date = new Date(aw.Headline.EffectiveDate);
console.log("Date     = ", aw_date);


const apiBaseUrl="https://google.com"

const apiKey   = "1234"
const cityName = "warsaw"

const url = new URL(`${apiBaseUrl}/locations/v1/cities/search`);
url.searchParams.append('apikey', apiKey);
url.searchParams.append('q', cityName);
console.log(url);
