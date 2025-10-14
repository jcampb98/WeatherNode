import React from 'react';

interface WeatherData {
  current: {
    name: string;
    weather: { description: string; icon: string }[];
    main: { temp: number; feels_like: number };
    wind: { speed: number };
  };
  forecast: {
    list: {
      dt: number;
      dt_txt: string;
      main: { temp: number };
      weather: { icon: string }[];
    }[];
  };
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

// Utility to get the day name from a date string (e.g., "Mon")
const getDayName = (dt_txt: string) => {
  const date = new Date(dt_txt);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Utility to filter the 3-hour forecast list down to 5 daily entries
const getDailyForecasts = (list: WeatherData['forecast']['list']) => {
  // Filter for unique days, taking the entry closest to 12:00:00 (midday)
  const dailyData = list.filter((item) => item.dt_txt.includes("12:00:00"));

  // Take the next 5 days worth of data
  return dailyData.slice(0, 5);
};


const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather || !weather.current) {
    return <p className="text-center text-gray-500">No weather data available.</p>;
  }

  const { current } = weather;
  const currentTemp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const windSpeed = current.wind.speed.toFixed(1);

  const dailyForecasts = getDailyForecasts(weather.forecast.list);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
      
      {/* Current Weather Section */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-1">
          {current.name}
        </h1>
        <p className="text-xl text-gray-500 capitalize">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        
        {/* Main Temperature Display */}
        <div className="flex items-center space-x-4">
          <span className="text-7xl font-light text-gray-900">
            {currentTemp}&deg;C
          </span>
        </div>

        {/* Details (Wind/Feels Like) */}
        <div className="text-right mt-4 md:mt-0 space-y-2">
            <div className="text-lg text-gray-700">
                <span className="font-semibold">Feels Like: </span>
                {Math.round(current.main.feels_like)}&deg;C
            </div>
            <div className="text-lg text-gray-700">
                <span className="font-semibold">Wind Speed: </span>
                {windSpeed} m/s
            </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <h2 className="text-2xl font-semibold text-gray-800 border-t pt-6 mb-4">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {dailyForecasts.map((day) => (
          <div 
            key={day.dt} 
            className="p-4 text-center bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-150"
          >
            <p className="text-sm font-medium text-gray-600 mb-2">
              {getDayName(day.dt_txt)}
            </p>
            <p className="text-xl font-bold text-gray-800 mt-2">
              {Math.round(day.main.temp)}&deg;C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;