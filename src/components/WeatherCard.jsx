import React from 'react';

function WeatherCard({ data }) {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed }
  } = data;

  const weatherCondition = weather[0].main;
  const description = weather[0].description;
  const iconCode = weather[0].icon;

  const getWeatherGradient = () => {
    const gradients = {
      Clear: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
      Clouds: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
      Rain: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
      Snow: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)',
      Thunderstorm: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
    };
    return gradients[weatherCondition] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div className="weather-card" style={{ background: getWeatherGradient() }}>
      <div className="city-info">
        <h2>{name}, {country}</h2>
      </div>

      <div className="current-weather">
        <div className="weather-icon">
          <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={description} />
        </div>
        <div className="temperature">
          <span className="temp-value">{Math.round(temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-description">
          <p>{description}</p>
        </div>
      </div>

      <div className="weather-stats">
        <div className="stat">
          <i className="fas fa-thermometer-half"></i>
          <div>
            <small>Feels Like</small>
            <strong>{Math.round(feels_like)}°C</strong>
          </div>
        </div>
        <div className="stat">
          <i className="fas fa-tint"></i>
          <div>
            <small>Humidity</small>
            <strong>{humidity}%</strong>
          </div>
        </div>
        <div className="stat">
          <i className="fas fa-wind"></i>
          <div>
            <small>Wind Speed</small>
            <strong>{Math.round(speed * 3.6)} km/h</strong>
          </div>
        </div>
        <div className="stat">
          <i className="fas fa-tachometer-alt"></i>
          <div>
            <small>Pressure</small>
            <strong>{pressure} hPa</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;