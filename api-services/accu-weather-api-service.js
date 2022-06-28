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
    return response.json();
  }

  /**
   * Returns current weather conditions for given location
   * @param {string} locationId - retuned from @getLocation API request
   */
  async getCurrentConditions(locationId) {
    return response.json();
  }

  /**
   * Returns such information as minimum and maximum temperature forecast
   * @param {string} locationId - returned from @getLocation API request
   */
  async getDailyForecast(locationId) {
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
    return response.json();
  }

  async getDailyForecast(locationId) {
    return response.json();
  }

  async getLocation(cityName) {
    return response.json();
  }

  getIconUrl(iconCode) {
    const fullIconCode = iconCode.toString().padStart(2, '0');
    return iconCode
      ? `https://developer.accuweather.com/sites/default/files/${fullIconCode}-s.png`
      : null;
  }
}
