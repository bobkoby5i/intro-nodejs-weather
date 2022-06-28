import fetch from 'node-fetch';

export class WeatherBitApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getCurrent(cityName) {
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}.png` : null;
  }
}

export class WeatherBitMockService {
  async getCurrent(cityName) {
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://weatherbit.io/static/img/icons/${iconCode}.png`
      : null;
  }
}
