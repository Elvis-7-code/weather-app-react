import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from './utils/weatherAPI';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Nairobi');

  useEffect(() => {
    loadWeatherData();
  }, [city]);

  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity) => {
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
          </div>
        )}
        
        {!loading && !error && weatherData && forecastData && (
          <>
            <WeatherCard data={weatherData} />
            <Forecast data={forecastData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;