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
    const url = new URL(`${this.apiBaseUrl}/locations/v1/cities/search`);
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('q', cityName);

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response);
    }

    return response.json();
  }

  /**
   * Returns current weather conditions for given location
   * @param {string} locationId - retuned from @getLocation API request
   */
  async getCurrentConditions(locationId) {
    const url = new URL(
      `${this.apiBaseUrl}/currentconditions/v1/${locationId}`,
    );
    url.searchParams.append('apikey', this.apiKey);

    const response = await fetch(url, {
      method: 'GET',
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
    const url = new URL(
      `${this.apiBaseUrl}/forecasts/v1/daily/1day/${locationId}`,
    );
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('metric', 'true');

    const response = await fetch(url, {
      method: 'GET',
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

    const response = fetch('http://localhost:3000/mocks/accuweather-current', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(response);
    }        
    
    return response.json();
  }

  async getDailyForecast(locationId) {
    const response = fetch('http://localhost:3000/mocks/accuweather-daily', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(response);
    }        

    return response.json();
  }

  async getLocation(cityName) {
    const response = fetch(
      'http://localhost:3000/mocks/accuweather-location',
      {
        method: 'GET'
      }
    );

    if (!response.ok) {
      throw new Error(response);
    }           
    return response.json();
  }

  getIconUrl(iconCode) {
    const fullIconCode = iconCode.toString().padStart(2, '0');
    return iconCode
      ? `https://developer.accuweather.com/sites/default/files/${fullIconCode}-s.png`
      : null;
  }
}
