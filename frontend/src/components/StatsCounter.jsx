// src/components/StatsCounter.jsx
import "../assets/style.css";

export default function StatsCounter() {
  const stats = [
    { label: "Events Hosted", value: 1200 },
    { label: "Users", value: 8700 },
    { label: "Cities", value: 45 }
  ];

  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div className="stat-box" key={i}>
          <h3>{s.value.toLocaleString()}</h3>
          <p>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
