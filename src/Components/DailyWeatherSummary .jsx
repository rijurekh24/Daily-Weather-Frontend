import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart ";
import WeatherAlerts from "./WeatherAlerts ";

const DailyWeatherSummary = () => {
  const [summaries, setSummaries] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/daily-summaries"
        );
        setSummaries(response.data);
      } catch (error) {
        console.error("Error fetching daily summaries:", error);
      }
    };

    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/weather");

        if (response.data.weatherData) {
          setCurrentWeather(response.data.weatherData);
        } else {
          console.error("No weather data found in response.");
          setCurrentWeather([]);
        }
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };

    fetchSummaries();
    fetchCurrentWeather();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Daily Weather Summaries
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summaries.map((summary) => {
              const currentData = currentWeather.find(
                (data) => data.city.toLowerCase() === summary.city.toLowerCase()
              );

              return (
                <WeatherCard
                  key={`${summary.city}-${summary.date}`}
                  city={summary.city}
                  avgTemp={summary.averageTemp}
                  currentTemp={
                    currentData ? parseFloat(currentData.temp) : null
                  }
                  maxTemp={summary.maxTemp}
                  minTemp={summary.minTemp}
                  condition={currentData?.condition}
                  feelsLike={currentData?.feelsLike}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-1 p-4">
          <WeatherChart />
        </div>
      </div>
      <WeatherAlerts />
    </>
  );
};

export default DailyWeatherSummary;
