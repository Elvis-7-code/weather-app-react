// ============================================
// OPENWEATHERMAP API CONFIGURATION
// ============================================

// 🔴🔴🔴 IMPORTANT: Replace with your actual API key
// Get it from: https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE'; // <-- CHANGE THIS

// Base URLs for API calls
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ============================================
// FETCH CURRENT WEATHER DATA
// ============================================
export const fetchWeatherData = async (city) => {
  // Check if API key is set
  if (API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
    console.error('❌ API key not configured! Get one from openweathermap.org');
    throw new Error('API key missing. Please add your OpenWeatherMap API key');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  console.log('Fetching weather for:', city); // Debug log
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    console.log('✅ Weather data received:', data.name);
    return data;
    
  } catch (error) {
    console.error('❌ Weather fetch error:', error.message);
    throw error;
  }
};

// ============================================
// FETCH 5-DAY FORECAST DATA
// ============================================
export const fetchForecastData = async (city) => {
  // Check if API key is set
  if (API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
    throw new Error('API key missing. Please add your OpenWeatherMap API key');
  }

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Forecast for "${city}" not available`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    console.log('✅ Forecast data received');
    return data;
    
  } catch (error) {
    console.error('❌ Forecast fetch error:', error.message);
    throw error;
  }
};