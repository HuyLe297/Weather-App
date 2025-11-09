// src/App.jsx
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ChartView from "./components/ChartView";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // ← MỚI: State cho dự báo 5 ngày
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"; // ← MỚI: API dự báo

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      // Gọi API hiện tại
      const weatherUrl = `${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const weatherRes = await axios.get(weatherUrl);
      setWeather(weatherRes.data);

      // Gọi API dự báo 5 ngày (chỉ khi có weather thành công)
      const forecastUrl = `${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const forecastRes = await axios.get(forecastUrl);
      setForecast(forecastRes.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Try again!");
      } else {
        setError("Something went wrong. Please try later.");
      }
      setWeather(null);
      setForecast(null); // ← MỚI: Reset forecast nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white px-6 py-10 relative">
        
        {/* CARD CHÍNH */}
        <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          
          <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide text-blue-400 drop-shadow-lg">
            Weather App
          </h1>

          <SearchBar fetchWeather={fetchWeather} />

          {loading && (
            <p className="text-center mt-6 animate-pulse text-gray-300">
              Loading weather...
            </p>
          )}

          {error && (
            <p className="text-center text-red-400 font-medium mt-6">
              {error}
            </p>
          )}

          {weather && <WeatherCard weather={weather} />}

          {/* NÚT MŨI TÊN PHẢI */}
          {weather && !showChart && (
            <button
              onClick={() => setShowChart(true)}
              className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition transform hover:scale-110"
              aria-label="View Charts"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* MODAL CHART */}
      {showChart && weather && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-lg">
            
           

            {/* CHARTVIEW – TRUYỀN THÊM FORECAST */}
            <ChartView weather={weather} forecast={forecast} />

            {/* NÚT MŨI TÊN TRÁI */}
            <button
              onClick={() => setShowChart(false)}
              className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition transform hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;