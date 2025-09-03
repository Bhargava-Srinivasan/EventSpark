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
        const found = res.data.find(e => e._id === id);
        setEvent(found);
        const userEmail = localStorage.getItem("userEmail");
        setIsCreator(userEmail && found?.creatorEmail === userEmail);
      });
  }, [id]);

  const handleDelete = () => {
    const email = localStorage.getItem("userEmail");
    axios.delete(`/api/events/${id}`, { data: { email } })
      .then(() => navigate("/"))
      .catch(err => alert(err.response.data.error));
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-detail-container">
      <img src={event.image} alt={event.title} />
      <h2>{event.title}</h2>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Capacity:</strong> {event.capacity}</p>

      {isCreator ? (
        <>
          <button onClick={() => navigate(`/update-event/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <button>Register</button>
      )}
    </div>
  );
}
