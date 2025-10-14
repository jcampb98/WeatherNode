"use client";
import { useState } from "react";
import Header from "./components/Header";
import WeatherSearchForm from "./components/WeatherSearchForm";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async (userInput: string, type: 'zip' | 'city') => {
    const res = await fetch(`/api/weather?${type}=${userInput}`);

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
        <div>{JSON.stringify(weather, null, 2)}</div> // Placeholder for now until proper UI is defined
      )}
    </div>
  );
}
