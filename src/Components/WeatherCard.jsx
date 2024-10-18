import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Thermometer, ThermometerSun, Wind } from "lucide-react";

export default function WeatherCard({
  city,
  avgTemp,
  currentTemp,
  maxTemp,
  minTemp,
  condition,
  feelsLike,
  avgwind,
  avghumi,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-3xl font-bold">{currentTemp}°C</div>
            <div className="text text-gray-500">Average: {avgTemp}°C</div>
            <div className="text text-gray-500">Feels Like: {feelsLike}°C</div>
            <div className="text text-gray-500">{condition}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm">Max: {maxTemp}°C</span>
          </div>
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-blue-700 mr-2" />
            <span className="text-sm">Min: {minTemp}°C</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <ThermometerSun className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm">Avg Humidity: {avghumi}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm">
              Avg Wind: {(avgwind * 3.6).toFixed(2)} km/h
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
