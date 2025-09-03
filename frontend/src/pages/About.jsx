// src/pages/About.jsx
import "../assets/style.css";

export default function About() {
  return (
    <div className="about-container">
      <h2>About EventSpark</h2>
      <p className="about-intro">
        EventSpark is your go-to platform for discovering, exploring, and attending amazing events across various categories — from tech workshops and art classes to yoga retreats and sports leagues.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h3>🎯 Our Mission</h3>
          <p>
            We aim to connect passionate people with events that inspire, educate, and energize. Whether you're a creator or an attendee, EventSpark helps you make the most of every moment.
          </p>
        </div>
        <div className="about-box">
          <h3>✨ What We Offer</h3>
          <ul>
            <li>🔥 Curated events across 6+ categories</li>
            <li>🎟 Easy registration & updates</li>
            <li>🌎 Local & virtual events</li>
            <li>🚀 Tools for event creators</li>
          </ul>
        </div>
        <div className="about-box">
          <h3>🌐 Join the Spark</h3>
          <p>
            Thousands of users trust EventSpark to explore their interests, network with like-minded individuals, and learn something new every day.
            <br />Let’s spark something extraordinary — together.
          </p>
        </div>
      </div>
    </div>
  );
}
