import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from './utils/weatherAPI'; // ✅ Fixed import
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Nairobi');

  // Load weather when city changes
  useEffect(() => {
    if (city) {
      loadWeatherData();
    }
  }, [city]);

  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Loading weather for:', city);
      
      const weather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city); // ✅ Fixed — was missing 'fetchForecastData'
      
      setWeatherData(weather);
      setForecastData(forecast);
      
      console.log('✅ Data loaded successfully');
      
    } catch (err) {
      console.error('❌ Failed to load:', err.message);
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity) => {
    console.log('🔍 Searching for:', newCity);
    setCity(newCity);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>⚛️ React Weather App</h1>
          <p>Built by Elvis Wachira | Full-Stack Developer</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{error}</p>
            <small>Try searching for "London", "Nairobi", or "New York"</small>
          </div>
        )}
        
        {!loading && !error && weatherData && forecastData && (
          <>
            <WeatherCard data={weatherData} />
            <Forecast data={forecastData} />
          </>
        )}

        {/* Debug info - remove after testing */}
        {!loading && !error && !weatherData && !forecastData && (
          <div className="error-message">
            <i className="fas fa-info-circle"></i>
            <p>Waiting for search...</p>
            <small>Type a city name and press Search</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;