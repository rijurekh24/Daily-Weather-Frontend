import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeatherAlerts = () => {
  const [threshold, setThreshold] = useState();

  const fetchThreshold = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/threshold");
      setThreshold(response.data.value);
    } catch (error) {
      console.error("Error fetching threshold:", error);
      toast.error("Error fetching threshold.");
    }
  };

  const updateThreshold = async (newThreshold) => {
    try {
      await axios.post("http://localhost:5000/api/threshold", {
        value: newThreshold,
      });
      setThreshold(newThreshold);
      toast.success("Threshold updated successfully.");
    } catch (error) {
      console.error("Error updating threshold:", error);
      toast.error("Error updating threshold.");
    }
  };

  const checkAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/weather");
      const alerts = response.data
        .map((data) => {
          const temp = parseFloat(data.temp);
          if (temp > threshold) {
            return `Alert: ${data.city} exceeded over ${threshold}°C! (Current: ${temp}°C)`;
          }
          return null;
        })
        .filter((alert) => alert !== null);

      if (alerts.length > 0) {
        alerts.forEach((alert) => {
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
    checkAlerts();
    const interval = setInterval(checkAlerts, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Alert</h1>
      <input
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
