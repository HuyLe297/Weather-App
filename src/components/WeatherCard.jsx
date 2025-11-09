import React from "react";
import { Droplets, Wind, Thermometer, Gauge } from "lucide-react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg transition hover:scale-[1.02] duration-300">
      <h2 className="text-3xl font-bold text-center text-white drop-shadow-md">
        {weather.name}, {weather.sys.country}
      </h2>

      {/* Icon + Nhiệt độ */}
      <div className="flex flex-col items-center justify-center mt-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="w-28 h-28 animate-pulse"
        />
        <p className="text-6xl font-extrabold text-white">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="capitalize text-gray-300 text-lg mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Thông tin chi tiết */}
      <div className="grid grid-cols-2 gap-6 mt-8 text-center text-white">
        <div className="bg-white/10 rounded-xl py-3 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Droplets size={16} /> Humidity
          </p>
          <p className="text-xl font-semibold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-xl py-3 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Wind size={16} /> Wind
          </p>
          <p className="text-xl font-semibold">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/10 rounded-xl py-3 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Gauge size={16} /> Pressure
          </p>
          <p className="text-xl font-semibold">{weather.main.pressure} hPa</p>
        </div>

        <div className="bg-white/10 rounded-xl py-3 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Thermometer size={16} /> Feels Like
          </p>
          <p className="text-xl font-semibold">
            {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
