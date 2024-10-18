import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DailyWeatherSummary from "./Components/DailyWeatherSummary ";
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DailyWeatherSummary />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 text-center p-1">
          <p>&copy; {new Date().getFullYear()} Weather App</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
