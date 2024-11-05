const API_URL = 'https://api.open-meteo.com/v1/forecast';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @typedef {Object} Forecast
 * @property {string} time
 * @property {number} temperature
 * @property {number} precipitation
 * @property {string} description
 * @property {number} windSpeed
 */

const weatherCodeDescriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

const weatherCodeIcons = {
  0: '/vedurtakn/xqjxmmx8.png', // Clear sky
  1: '/vedurtakn/d9hxxay9.png', // Mainly clear
  2: '/vedurtakn/4pt8h2pr.png', // Partly cloudy
  3: '/vedurtakn/azdavqrh.png', // Overcast
  45: '/vedurtakn/nrcuu2cc.png', // Fog
  48: '/vedurtakn/nrcuu2cc.png', // Depositing rime fog
  51: '/vedurtakn/nmjhcwid.png', // Light drizzle
  53: '/vedurtakn/nmjhcwid.png', // Moderate drizzle
  55: '/vedurtakn/nmjhcwid.png', // Dense drizzle
  56: '/vedurtakn/r2aeqe3m.png', // Light freezing drizzle
  57: '/vedurtakn/r2aeqe3m.png', // Dense freezing drizzle
  61: '/vedurtakn/7f3rxum6.png', // Slight rain
  63: '/vedurtakn/hnrqk944.png', // Moderate rain
  65: '/vedurtakn/hnrqk944.png', // Heavy rain
  66: '/vedurtakn/r2aeqe3m.png', // Light freezing rain
  67: '/vedurtakn/r2aeqe3m.png', // Heavy freezing rain
  71: '/vedurtakn/mgzhcaap.png', // Slight snowfall
  73: '/vedurtakn/mgzhcaap.png', // Moderate snowfall
  75: '/vedurtakn/mgzhcaap.png', // Heavy snowfall
  77: '/vedurtakn/mgzhcaap.png', // Snow grains
  80: '/vedurtakn/24wvnrvw.png', // Slight rain showers
  81: '/vedurtakn/24wvnrvw.png', // Moderate rain showers
  82: '/vedurtakn/24wvnrvw.png', // Violent rain showers
  85: '/vedurtakn/pfwxwgw9.png', // Slight snow showers
  86: '/vedurtakn/pfwxwgw9.png', // Heavy snow showers
  95: '/vedurtakn/kkj26ft8.png', // Thunderstorm
  96: '/vedurtakn/kkj26ft8.png', // Thunderstorm with slight hail
  99: '/vedurtakn/kkj26ft8.png', // Thunderstorm with heavy hail
};

/**
 * Tekur við gögnum frá Open Meteo og skilar fylki af spám í formi Forecast.
 * @param {unknown} data Gögn frá Open Meteo.
 * @returns {Array<Forecast>}
 */
function parseResponse(data) {
  // Extract hourly data from the API response
  const times = data.hourly.time;
  const temperatures = data.hourly.temperature_2m;
  const precipitations = data.hourly.precipitation;
  const weatherCodes = data.hourly.weathercode;
  const windSpeeds = data.hourly.wind_speed_10m;

  const forecasts = [];

  // Combine the data into an array of Forecast objects
  for (let i = 0; i < times.length; i++) {
    const date = new Date(times[i]);
    const formattedTime = date.toLocaleString('en-GB', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

    forecasts.push({
      time: formattedTime,
      temperature: temperatures[i],
      precipitation: precipitations[i],
      description: weatherCodeDescriptions[weatherCodes[i]] || 'Unknown',
      windSpeed: `${windSpeeds[i]} m/s`,
      icon: weatherCodeIcons[weatherCodes[i]] || '/media/vedurtakn/unknown.png',
    });
  }

  return forecasts;
}

/**
 * Framkvæmir leit að veðurspám fyrir gefna staðsetningu.
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<Array<Forecast>>} Fylki af spám fyrir staðsetningu.
 */
export async function weatherSearch(lat, lng) {
  await sleep(1000);

  // Build the URL with query parameters
  const url = new URL(API_URL);
  const querystring = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    hourly: 'temperature_2m,precipitation,weathercode,wind_speed_10m',
    wind_speed_unit: "ms",
    timezone: 'GMT',
    forecast_days: '1',
  });
  url.search = querystring.toString();

  const response = await fetch(url.href);

  if (response.ok) {
    const data = await response.json();
    return parseResponse(data);
  } else {
    throw new Error('Ekki tókst að sækja veðurspá');
  }
}
