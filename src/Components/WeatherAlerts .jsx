import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeatherAlerts = () => {
  const [threshold, setThreshold] = useState(35);

  const fetchThreshold = async () => {
    try {
      // const response = await axios.get("http://localhost:5000/api/threshold");
      const response = await axios.get(
        "https://daily-weather-backend.onrender.com/api/threshold"
      );
      setThreshold(response.data.value);
      await checkAlerts();
    } catch (error) {
      console.error("Error fetching threshold:", error);
      toast.error("Error fetching threshold.");
    }
  };

  const updateThreshold = async (newThreshold) => {
    try {
      // await axios.post("http://localhost:5000/api/threshold", {
      //   value: newThreshold,
      // });
      await axios.post(
        "https://daily-weather-backend.onrender.com/api/threshold",
        {
          value: newThreshold,
        }
      );
      setThreshold(newThreshold);
      toast.success("Threshold updated successfully.");
      await checkAlerts();
    } catch (error) {
      console.error("Error updating threshold:", error);
      toast.error("Error updating threshold.");
    }
  };

  const checkAlerts = async () => {
    try {
      const response = await axios.get(
        "https://daily-weather-backend.onrender.com/api/weather"
        // "http://localhost:5000/api/weather"
      );
      const { weatherData, alerts } = response.data;

      if (alerts && alerts.length > 0) {
        alerts.forEach((alert) => {
          console.error(alert);
          toast.error(alert, {
            style: { backgroundColor: "white", color: "#CA0B00" },
          });
        });
      } else {
        toast.success("No alerts at this moment.", {
          style: { backgroundColor: "green", color: "white" },
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Error fetching weather data.");
    }
  };

  useEffect(() => {
    fetchThreshold();
    const interval = setInterval(checkAlerts, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Alert</h1>
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        placeholder="Set Temperature Threshold"
        className="border p-2 mr-2"
      />
      <button
        onClick={() => updateThreshold(threshold)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Update Threshold
      </button>
      <button
        onClick={checkAlerts}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        Check Alerts Now
      </button>
    </div>
  );
};

export default WeatherAlerts;
