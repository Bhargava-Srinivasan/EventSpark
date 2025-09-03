import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/eventdetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/events`)
      .then(res => {
        console.log("✅ Events from API:", res.data); // Should be an array
        const found = res.data.find(e => e._id.toString() === id.toString());
        setEvent(found);
        const userEmail = localStorage.getItem("userEmail");
        console.log("🔍 userEmail:", userEmail);
        console.log("🔍 event.creatorEmail:", found?.creatorEmail);
        console.log("🔍 Match:", userEmail === found?.creatorEmail);
        setIsCreator(userEmail && found?.creatorEmail === userEmail);
      })
      .catch(err => {
        console.error("❌ Error fetching events:", err);
      });
  }, [id]);

  const handleDelete = () => {
    const email = localStorage.getItem("userEmail");
    axios.delete(`/api/events/${id}`, { data: { email } })
      .then(() => navigate("/"))
      .catch(err => alert(err.response.data.error));
  };

  const handleRegister = async (eventId) => {
    console.log("🔁 Register clicked for event:", eventId);

    const email = localStorage.getItem("userEmail");
    if (!email) return alert("You must be logged in to register.");

    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/register`, { email });
      console.log("✅ Registered via API");
      alert("✅ Registered successfully!");
      // await fetchEvents();
      return;
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.response?.data?.error || "❌ Error registering.");
    }
  };


  if (!event) return <div>Loading...</div>;

  // return (
  //   <div className="event-detail-container">
  //     <img src={event.image} alt={event.title} />
  //     <h2>{event.title}</h2>
  //     <p><strong>Category:</strong> {event.category}</p>
  //     <p><strong>Date:</strong> {event.date}</p>
  //     <p><strong>Location:</strong> {event.location}</p>
  //     <p><strong>Description:</strong> {event.description}</p>
  //     <p><strong>Capacity:</strong> {event.capacity}</p>

  //     {isCreator ? (
  //       <>
  //         <button onClick={() => navigate(`/update-event/${id}`)}>Edit</button>
  //         <button onClick={handleDelete}>Delete</button>
  //       </>
  //     ) : (
  //       <button
  //         onClick={() => handleRegister(event._id)}
  //       >
  //         Register
  //       </button>
  //     )}
  //   </div>
  // );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        <img src={event.image} alt={event.title} />
        <h2>{event.title}</h2>

        <div className="event-meta">
          <div>
            <strong>📅 Event Duration:</strong>
            <span>{event.date || "N/A"}</span>
          </div>
          <div>
            <strong>📍 Location:</strong>
            <span>{event.location || "N/A"}</span>
          </div>
        </div>

        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>

        {isCreator ? (
          <div className="creator-actions">
            <button className="btn-edit" onClick={() => navigate(`/update-event/${id}`)}>Edit</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <button className="btn-register" onClick={() => handleRegister(event._id)}>
            Register
          </button>
        )}
      </div>
    </div>
  );

}
