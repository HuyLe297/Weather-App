import React, { useState } from "react";
import { Search } from "lucide-react"; // icon gọn nhẹ, hiện đại

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full max-w-md mx-auto mt-6"
    >
      <input
        type="text"
        placeholder="🔍 Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-3 bg-white/10 text-white placeholder-gray-300 rounded-l-2xl border border-gray-500 outline-none focus:border-blue-400 transition"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-2xl flex items-center gap-2 transition"
      >
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
