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
          "http://localhost:5000/api/daily-summaries"
        );
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

  const cities = [...new Set(weatherData.map((item) => item.city))];

  const colorPalette = [
    "rgba(220, 0, 0, 1)",
    "rgba(0, 0, 220, 1)",
    "rgba(220, 220, 0, 1)",
    "rgba(0, 220, 220, 1)",
    "rgba(130, 0, 130, 1)",
    "rgba(220, 110, 0, 1)",
  ];

  const datasets = cities.map((city, index) => {
    const cityData = weatherData.filter((item) => item.city === city);
    return {
      label: city,
      data: cityData.map((item) => item.averageTemp),
      borderColor: colorPalette[index % colorPalette.length],
      fill: false,
    };
  });

  const labels = weatherData.map((item) => item.date);

  const data = {
    labels: labels,
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
