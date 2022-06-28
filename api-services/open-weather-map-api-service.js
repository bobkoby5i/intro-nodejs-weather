import fetch from 'node-fetch';

export class OpenWeatherMapApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getWeather(cityName) {

    const url = new URL(`${this.apiBaseUrl}/weather`);
    url.searchParams.append('appid', this.apiKey);
    url.searchParams.append('q', cityName);
    url.searchParams.append('units', 'metric');


    const response = fetch(url, {
      method: 'GET',
      //body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response);
    }    

    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}@2x.png` : null;
  }
}

export class OpenWeatherMapMockService {
  async getWeather(cityName) {

    const urlMock = 'http://localhost:3000/mocks/openweathermap_current'

    const response = fetch(urlMock, {
      method: 'GET',
      //body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response);
    }    

    return response.json();    

  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : null;
  }
}
