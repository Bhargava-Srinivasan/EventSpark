// src/components/EventCategoryTabs.jsx
import { useState } from "react";
import "../assets/style.css";

const categories = ["All", "Music", "Tech", "Sports", "Business", "Art"];

export default function EventCategoryTabs({ selected, onSelect }) {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={`tab-btn ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
