// OpenWeatherMap API configuration
const API_KEY = '7f31d539757c2fbf884152680e291ad4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fetch current weather data
export const fetchWeatherData = async (city) => {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  console.log('Fetching weather for:', city);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${city}" not found`);
    } else if (response.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('Weather data received:', data.name);
  
  return data;
};

// Fetch 5-day forecast data
export const fetchForecastData = async (city) => {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  console.log('Fetching forecast for:', city);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Forecast for "${city}" not available`);
  }
  
  const data = await response.json();
  console.log('Forecast data received');
  
  return data;
};