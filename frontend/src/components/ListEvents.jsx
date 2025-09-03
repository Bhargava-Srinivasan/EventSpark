// // components/ListEvents.jsx
// import { useEvents } from "../context/EventContext";
// import "../assets/listevents.css"; 

// export default function ListEvents() {
//   const { createdEvents } = useEvents();

//   return (
//     <div className="list-events-page">
//       <h2>My Created Events</h2>
//       {createdEvents.length === 0 ? (
//         <p>No events created yet.</p>
//       ) : (
//         <div className="event-list">
//           {createdEvents.map((event, index) => (
//             <div className="event-row" key={index}>
//               <span className="event-col">{event.title}</span>
//               <span className="event-col">{event.category}</span>
//               <span className="event-col">Capacity: {event.capacity}</span>
//               <span className="event-col">Registrations: 0</span> {/* Placeholder for registered users */}
//               <button className="event-btn">View Registrations</button>
//               <button className="event-btn">Update</button>
//               <button className="event-btn">Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// components/ListEvents.jsx
import { useState } from "react";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import "../assets/listevents.css";
import axios from "axios";

export default function ListEvents() {
  const { events } = useEvents(); 
  const { createdEvents, fetchEvents } = useEvents();
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const navigate = useNavigate();

  const handleViewRegistrations = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    if (event && event.attendees && event.attendees.length > 0) {
      setSelectedAttendees(event.attendees);
    } else {
      setSelectedAttendees([]);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const email = localStorage.getItem("userEmail");
    try {
      await axios.delete(`/api/events/${id}`, { data: { email } });
      console.log(`✅ Event with ID ${id} deleted`);
      fetchEvents(); // Refresh the event list
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting event");
    }
  };

  return (
    <div className="list-events-page">
      <h2>My Created Events</h2>
      {createdEvents.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="event-list">
          {createdEvents.map((event, index) => (
            <div className="event-row" key={index}>
              <span className="event-col">{event.title}</span>
              <span className="event-col">{event.category}</span>
              <span className="event-col">Capacity: {event.capacity}</span>
              <span className="event-col">Registrations: {event.attendees?.length || 0}</span>

              <button
                className="event-btn"
                onClick={() => handleViewRegistrations(event._id)}
              >
                View Registrations
              </button>

              <button
                className="event-btn"
                onClick={() => navigate(`/update-event/${event._id}`)}
              >
                Update
              </button>

              <button
                className="event-btn"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Attendees</h3>
            {selectedAttendees.length === 0 ? (
              <p>No attendees yet.</p>
            ) : (
              <ul>
                {selectedAttendees.map((email, idx) => (
                  <li key={idx}>{email}</li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

