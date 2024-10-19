import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://daily-weather-backend.onrender.com/api/daily-summaries"
        );
        // const response = await axios.get(
        //   "http://localhost:5000/api/daily-summaries"
        // );
        setWeatherData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!weatherData || weatherData.length === 0) {
    return <div className="text-center text-xl">No data available</div>;
  }

  const uniqueDates = [...new Set(weatherData.map((item) => item.date))];
  const cities = [...new Set(weatherData.map((item) => item.city))];

  const today = new Date();
  const upcomingDates = [];
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    upcomingDates.push(nextDate.toISOString().split("T")[0]);
  }

  const completeDates = [...new Set([...uniqueDates, ...upcomingDates])];

  const colorPalette = [
    "rgba(220, 0, 0, 1)",
    "rgba(0, 0, 220, 1)",
    "rgba(220, 220, 0, 1)",
    "rgba(0, 220, 220, 1)",
    "rgba(130, 0, 130, 1)",
    "rgba(220, 110, 0, 1)",
  ];

  const datasets = cities.map((city, index) => {
    const cityData = completeDates.map((date) => {
      const dailyData = weatherData.find(
        (item) => item.city === city && item.date === date
      );
      return dailyData ? dailyData.averageTemp : null;
    });

    return {
      label: city,
      data: cityData,
      borderColor: colorPalette[index % colorPalette.length],
      fill: false,
    };
  });

  const data = {
    labels: completeDates,
    datasets: datasets,
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Daily Average Temperatures
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Line data={data} />
      </div>
    </div>
  );
};

export default WeatherChart;
