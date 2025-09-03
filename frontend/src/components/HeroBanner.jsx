import { Link } from "react-router-dom";
import "../assets/style.css";

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Discover & Host Amazing Events</h1>
        <p>From concerts to conferences, find or create events that matter to you.</p>
        {/* <a href="/create" className="btn-primary">Create an Event</a> */}
        <Link to="/create" className="btn-primary">Create an Event</Link>
      </div>

      
      {/* <div className="wave-wrapper">
        <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,80 L0,80 Z"
            fill="#4f46e5"
          />
        </svg>
      </div> */}
    </div>
  );
}
