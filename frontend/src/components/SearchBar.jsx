// src/components/SearchBar.jsx
import { useState } from "react";
import "../assets/style.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => onSearch(query);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search events by name or location..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
