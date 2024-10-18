import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cloud, Sun, Thermometer } from "lucide-react";

export default function WeatherCard({
  city,
  avgTemp,
  currentTemp,
  maxTemp,
  minTemp,
  condition,
}) {
  const getConditionIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy":
        return <Cloud className="h-6 w-6 text-blue-500" />;
      default:
        return <Thermometer className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-md rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-4xl font-bold">{currentTemp}°C</div>
            <div className="text-lg text-gray-500">Average: {avgTemp}°C</div>
          </div>
          {/* {getConditionIcon(condition)} */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm">Max: {maxTemp}°C</span>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm">Min: {minTemp}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
