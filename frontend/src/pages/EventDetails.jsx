import { useParams } from "react-router-dom";
import "../assets/style.css";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div className="event-details">
      <img
        src={`https://source.unsplash.com/800x400/?event,${id}`}
        alt="Event"
      />
      <h2>Event Title #{id}</h2>
      <p>Date: May 20, 2025</p>
      <p>Location: San Francisco, CA</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae egestas erat. Integer quis nulla id dolor laoreet hendrerit.
      </p>
    </div>
  );
}
