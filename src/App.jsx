import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const res = await axios.get(url);
      setWeather(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("❌ City not found. Try again!");
      } else {
        setError("⚠️ Something went wrong. Please try later.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 
                 text-white px-6 py-10 transition-all duration-700"
    >
      <div
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl 
                   p-8 rounded-3xl shadow-2xl border border-white/20"
      >
        <h1
          className="text-4xl font-extrabold text-center mb-8 
                     tracking-wide text-blue-400 drop-shadow-lg"
        >
          🌙 Weather App
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
      </div>
    </div>
  );
}

export default App;
