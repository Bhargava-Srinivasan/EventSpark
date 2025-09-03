import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import axios from "axios";
import "../assets/createevent.css";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  const existingEvent = events.find((e) => e._id === id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setCategory(existingEvent.category);
      setDescription(existingEvent.description);
      setLocation(existingEvent.location);
      setCapacity(existingEvent.capacity);
      setImage(existingEvent.image);

      const [start, end] = existingEvent.date.split(" - ");
      setStartDate(start || "");
      setEndDate(end || "");
    }
  }, [existingEvent]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    const updatedEvent = {
      title,
      category,
      description,
      location,
      capacity,
      image,
      date: `${startDate}${endDate ? ` - ${endDate}` : ""}`,
    };

    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent); // Backend API call
      updateEvent(id, updatedEvent); // Update in context
      alert("Event updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Failed to update event.");
    }
  };

  return (
  <div className="create-event-container">
    <div className="create-event-card">
      

      <div className="event-left">
        <label htmlFor="image-upload" className="image-upload-box">
          {image ? (
            <img src={image} alt="Event" className="event-image" />
          ) : (
            <div className="upload-placeholder">
              Click to upload image
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            className="hidden-file-input"
            onChange={handleImageUpload}
          />
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field category-select"
        >
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Food">Food</option>
        </select>
      </div>

      <div className="event-right">
        <h2>Update Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />

        

        <div className="date-picker">
          <label>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field textarea"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field"
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="input-field"
        />

        <button className="publish-btn" onClick={handleUpdate}>
          Update Event
        </button>
      </div>
    </div>
  </div>
);


}
