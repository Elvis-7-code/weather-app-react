// 🔴 REPLACE WITH YOUR ACTUAL API KEY
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY_HERE';

export const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('City not found');
  }
  
  return response.json();
};

export const fetchForecastData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Forecast data not available');
  }
  
  return response.json();
};