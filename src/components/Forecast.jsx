import React from 'react';

function Forecast({ data }) {
  const dailyForecasts = data.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast-section">
      <h3><i className="fas fa-calendar-week"></i> 5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en', { weekday: 'short' });
          const temp = Math.round(forecast.main.temp);
          const iconCode = forecast.weather[0].icon;
          const description = forecast.weather[0].description;

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{dayName}</div>
              <div className="forecast-icon">
                <img src={`https://openweathermap.org/img/wn/${iconCode}.png`} alt={description} />
              </div>
              <div className="forecast-temp">{temp}°C</div>
              <div className="forecast-desc">{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;