import { Link } from "react-router-dom";
import "../assets/style.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-card-content">
        <span className="event-category">{event.category}</span>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        {/* New details */}
        <div className="event-details">
          <span className="event-date">📅 {event.date || "TBD"}</span>
          <span className="event-location">📍 {event.location || "Online"}</span>
        </div>

        <Link to={`/events/${event.id}`} className="event-btn">
          Learn More →
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
