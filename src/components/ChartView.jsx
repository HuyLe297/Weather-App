// src/components/ChartView.jsx
import React from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line, CartesianGrid
} from "recharts";
import { Droplets, Thermometer, Wind, Gauge, Sun, CloudRain } from "lucide-react";

const ChartView = ({ weather, forecast }) => {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const pressure = weather.main.pressure;

  const humidityData = [
    { name: "Humidity", value: humidity },
    { name: "Dry", value: 100 - humidity },
  ];
  const COLORS = ["#3B82F6", "#1F2937"];

  const tempData = [
    { name: "Actual", value: temp },
    { name: "Feels Like", value: feelsLike },
  ];

  // Xử lý dự báo 5 ngày
  const dailyForecast = React.useMemo(() => {
    if (!forecast?.list) return [];

    const days = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      if (!days[dayKey] || (date.getHours() >= 9 && date.getHours() <= 15)) {
        days[dayKey] = {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          feelsLike: Math.round(item.main.feels_like),
          icon: item.weather[0].icon,
        };
      }
    });

    return Object.values(days).slice(0, 5);
  }, [forecast]);

  const forecastChartData = dailyForecast.map(day => ({
    day: day.day,
    temp: day.temp,
    feelsLike: day.feelsLike,
  }));

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8">
      
      {/* THÊM CUỘN TẠI ĐÂY */}
      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6 text-white custom-scrollbar">
        
        {/* DONUT CHART */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm shadow-inner border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Droplets className="text-blue-400" size={18} />
            <span className="text-sm font-medium text-gray-300">Humidity</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={humidityData} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={65} stroke="none">
                {humidityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1F2937", borderRadius: "12px", border: "1px solid #374151" }} />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-3xl font-bold mt-2 text-center">{humidity}%</p>
        </div>

        {/* BAR CHART */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm shadow-inner border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Thermometer className="text-red-400" size={18} />
            <span className="text-sm font-medium text-gray-300">Temperature</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={tempData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#1F2937", borderRadius: "12px", border: "1px solid #374151" }} />
              <Bar dataKey="value" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-md border border-white/20">
            <Wind className="mx-auto mb-1 text-teal-400" size={18} />
            <p className="text-xs text-gray-400">Wind Speed</p>
            <p className="font-bold text-lg">{wind} m/s</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-md border border-white/20">
            <Gauge className="mx-auto mb-1 text-purple-400" size={18} />
            <p className="text-xs text-gray-400">Pressure</p>
            <p className="font-bold text-lg">{pressure} hPa</p>
          </div>
        </div>

        {/* GỢI Ý */}
        <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl text-center text-sm border border-white/20">
          {temp > 30 ? (
            <p className="flex items-center justify-center gap-2">
              <Sun className="text-yellow-400" size={16} /> Nóng! Uống nhiều nước!
            </p>
          ) : temp < 18 ? (
            <p className="flex items-center justify-center gap-2">
              <CloudRain className="text-blue-300" size={16} /> Mát mẻ, mặc áo ấm!
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2">
              <Sun className="text-orange-400" size={16} /> Thời tiết dễ chịu!
            </p>
          )}
        </div>

        {/* DỰ BÁO 5 NGÀY */}
        {dailyForecast.length > 0 ? (
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm shadow-inner border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Thermometer className="text-orange-400" size={20} />
              <span className="text-sm font-medium text-gray-300">5-Day Forecast</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#1F2937", borderRadius: "12px", border: "1px solid #374151" }} />
                <Line type="monotone" dataKey="temp" stroke="#EF4444" strokeWidth={3} dot={{ fill: "#EF4444" }} name="Temp" />
                <Line type="monotone" dataKey="feelsLike" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#3B82F6" }} name="Feels Like" />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              {dailyForecast.map((day, i) => (
                <div key={i} className="p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">{day.day}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.day}
                    className="w-8 h-8 mx-auto"
                  />
                  <p className="text-sm font-bold">{day.temp}°C</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-400 text-sm">
            Đang tải dự báo...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartView;