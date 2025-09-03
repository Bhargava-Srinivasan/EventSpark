import { useState } from "react";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import "../assets/createevent.css";

export default function CreateEvent() {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Music");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail"); // set this on login

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // reader.result is the base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt for image generation.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.image) {
        setImage(data.image);
      } else {
        alert("Image generation failed.");
      }
    } catch (error) {
      console.error("AI Image generation error:", error);
      alert("Something went wrong while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    if (!image || !title || !startDate || !description || !location) {
      alert("Please fill all fields.");
      return;
    }

    const formattedDate = `${startDate}${endDate ? ` - ${endDate}` : ""}`;

    const newEvent = {
      title,
      category,
      description,
      image,
      date: formattedDate,
      location,
      capacity,
      creatorEmail: email
    };

    addEvent(newEvent);
    navigate("/");
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        {/* Left Section */}
        <div className="event-left">
          <div
            className="image-upload-box"
            style={{ borderStyle: image ? "solid" : "dashed" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {image ? (
              <img src={image} alt="Event" className="event-image" />
            ) : (
              <span className="upload-placeholder">Click to upload image (max 200 MB)</span>
            )}
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageUpload}
              className="hidden-file-input"
            />
          </div>

          <div className="ai-image-generator">
            <input
              type="text"
              placeholder="Describe the image to generate"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input-field"
            />
            <button className="ai-generate-btn" onClick={handleGenerateImage} disabled={loading}>
              {loading ? "Generating..." : "🎨 Generate Image with AI"}
            </button>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Art">Art</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="event-right">
          <input
            type="text"
            placeholder="Event Name"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="date-picker">
            <label>
              Start Date:
              <input
                type="date"
                className="input-field"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                className="input-field"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>

          <textarea
            placeholder="Event Description"
            className="input-field textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="text"
            placeholder="Event Location"
            className="input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="radio-label">
            <input type="radio" checked readOnly />
            Free Event
          </label>

          <input
            type="number"
            placeholder="Capacity"
            className="input-field"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />

          <button className="publish-btn" onClick={handlePublish}>
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}
