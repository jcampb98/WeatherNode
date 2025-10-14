"use client";
import { useState } from "react";
import Header from "./components/Header";
import WeatherSearchForm from "./components/WeatherSearchForm";
import WeatherDisplay from "./components/WeatherDisplay";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async (value: string, type: 'zip' | 'city' | 'coords', lat?: number, lon?: number) => {
    let queryString = '';

    if(type === 'coords' && lat !== undefined && lon !== undefined) {
      queryString = `lat=${lat}&lon=${lon}`
    }
    else {
      queryString = `${type}=${encodeURIComponent(value)}`;
    }
    
    const res = await fetch(`/api/weather?${queryString}`);

    if(!res.ok) {
      alert("Failed to fetch weather");
      return;
    }
    const data = await res.json();

    setWeather(data);
  }

  return (
    <div>
      <Header />
      <WeatherSearchForm onSearch={fetchWeather} />

      {weather && ( 
        <WeatherDisplay weather={weather} />
      )}

      {!weather && 
        <p className="text-center text-gray-500 mt-12 text-lg">
            Start searching for a city, postcode or using your current location
        </p>
      }
    </div>
  );
}
