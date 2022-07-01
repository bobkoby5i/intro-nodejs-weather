import fetch from 'node-fetch';

export class WeatherBitApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getCurrent(cityName) {

    const url = new URL(`${this.apiBaseUrl}/current`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('city', cityName);   

    console.log("WeatherBitApiService.getCurrent")
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
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}.png` : null;
  }
}

export class WeatherBitMockService {
  async getCurrent(cityName) {
    console.log("WeatherBitMockService.getCurrent")

    const urlMock = 'http://localhost:3000/mocks/weatherbit-current'

    const response = await  fetch(urlMock, {
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
      ? `https://weatherbit.io/static/img/icons/${iconCode}.png`
      : null;
  }
}
