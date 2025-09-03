// pages/MyEvents.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function MyEvents({ user }) {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios.get(`/api/events/user/${user._id}`).then(res => {
        setMyEvents(res.data);
      });
    }
  }, [user]);

  const deleteEvent = async (id) => {
    await axios.delete(`/api/events/${id}`);
    setMyEvents(myEvents.filter(e => e._id !== id));
  };

  return (
    <div className="event-section">
      <h2 className="text-xl font-bold mb-4">My Created Events</h2>
      <div className="event-grid">
        {myEvents.map(event => (
          <div key={event._id}>
            <EventCard event={event} />
            <button onClick={() => deleteEvent(event._id)}>Delete</button>
            {/* Add Edit functionality as a modal or separate page */}
          </div>
        ))}
      </div>
    </div>
  );
}
