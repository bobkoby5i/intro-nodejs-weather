import fetch from 'node-fetch';

export class AccuWeatherApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Returns location information for given city search
   * @param {string} cityName
   */
  async getLocation(cityName) {
    console.log(`AccuWeatherApiService.getLocation(${cityName})`)

    const url = new URL(`${this.apiBaseUrl}/locations/v1/cities/search`);
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('q', cityName);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log("NOT OK")
      throw new Error(response);
    }

    return response.json();
  }

  /**
   * Returns current weather conditions for given location
   * @param {string} locationId - retuned from @getLocation API request
   */
  async getCurrentConditions(locationId) {
    console.log("AccuWeatherApiService.getCurrentConditions()")
    const url = new URL(
      `${this.apiBaseUrl}/currentconditions/v1/${locationId}`,
    );
    url.searchParams.append('apikey', this.apiKey);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response);
    }    
    return response.json();
  }

  /**
   * Returns such information as minimum and maximum temperature forecast
   * @param {string} locationId - returned from @getLocation API request
   */
  async getDailyForecast(locationId) {
    console.log("AccuWeatherApiService.getDailyForecast()")
    const url = new URL(
      `${this.apiBaseUrl}/forecasts/v1/daily/1day/${locationId}`,
    );
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('metric', 'true');

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response);
    }    
    return response.json();
  }

  getIconUrl(iconCode) {
    if (!iconCode) {
      return null;
    }

    const fullIconCode = iconCode.toString().padStart(2, '0');
    return `${this.iconsBaseUrl}/${fullIconCode}-s.png`;
  }
}

export class AccuWeatherMockService {
  async getCurrentConditions(locationId) {
    console.log(`AccuWeatherMockService.getCurrentConditions(${locationId})`)

    const response = await fetch('http://localhost:3000/mocks/accuweather_current', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    });

    //console.log("RESPONSE getCurrentConditions",response)

    if (!response.ok) {
      console.log("NOT OK")
      throw new Error(response);
    }   
    console.log("OK")     
    //console.log(response.json())
    return response.json();
  }

  async getDailyForecast(locationId) {
    console.log(`AccuWeatherMockService.getDailyForecast(${locationId})`)
    const response = await fetch('http://localhost:3000/mocks/accuweather_daily', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log("getDailyForecast GEt ERROR")
      throw new Error(response);
    }        

    return response.json();
  }

  async getLocation(cityName) {
    console.log(`AccuWeatherMockService.getLocation(${cityName})`)
    const response = await fetch(
      'http://localhost:3000/mocks/accuweather_location',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      
    );

    //console.log("AccuWeatherMockService RESPONSE",response)
    if (!response.ok) {
      throw new Error(response);
    }           
    //console.log("AccuWeatherMockService getLocation",response.json())
    return response.json();
  }

  getIconUrl(iconCode) {
    console.log(iconCode)
    const fullIconCode = iconCode.toString().padStart(2, '0');
    return iconCode
      ? `https://developer.accuweather.com/sites/default/files/${fullIconCode}-s.png`
      : null;
  }
}
