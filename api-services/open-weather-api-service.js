import fetch from 'node-fetch';

export class OpenWeatherApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getWeather(cityName) {
    console.log("OpenWeatherApiService.getWeather()")

    const url = new URL(`${this.apiBaseUrl}/weather`);
    url.searchParams.append('appid', this.apiKey);
    url.searchParams.append('q', cityName);
    url.searchParams.append('units', 'metric');


    const response = await fetch(url, {
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

export class OpenWeatherMockService {
  async getWeather(cityName) {
    console.log("OpenWeatherMockService.getWeather()")

    const urlMock = 'http://localhost:3000/mocks/openweathermap_current'


    const response = await fetch(urlMock, {
      method: 'GET',
      //body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response);
    }    

    //console.log(response)
    return response.json();    

  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      : null;
  }
}
