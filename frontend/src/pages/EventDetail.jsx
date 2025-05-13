import { useParams } from "react-router-dom";
import "../assets/style.css";

// Import or access your events list here
// import { allEvents } from "./Home"; 
import { allEvents } from "./Home";

export default function EventDetail() {
  const { id } = useParams();
  const event = allEvents.find((ev) => ev.id === parseInt(id));

  if (!event) {
    return <h2>Event not found!</h2>;
  }

  return (
    <div className="event-detail-container">
      <img src={event.image} alt={event.title} className="event-detail-image" />
      <div className="event-detail-content">
        <h2>{event.title}</h2>
        <span className="event-detail-category">{event.category}</span>
        <p>{event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
      </div>
    </div>
  );
}
