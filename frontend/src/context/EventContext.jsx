// import { createContext, useState, useContext } from "react";

// const EventContext = createContext();

// const initialEvents = [
//   {
//     id: 1,
//     title: "React Workshop",
//     category: "Tech",
//     description: "Learn React from scratch and build interactive UIs.",
//     image: "https://sourcebae.com/blog/wp-content/uploads/2023/08/Benefits-of-ReactJS.jpg",
//     date: "April 20, 2025",
//     location: "Online",
//   },
//   {
//     id: 2,
//     title: "Photography Basics",
//     category: "Art",
//     description: "Capture your moments better with composition and lighting.",
//     image: "https://www.findbanquet.com/blog/wp-content/uploads/2024/06/photographers.jpg",
//     date: "May 5, 2025",
//     location: "New Delhi, India",
//   },
// //   {
// //     id: 3,
// //     title: "Startup Pitch Night",
// //     category: "Business",
// //     description: "Present your startup idea to investors and win funding.",
// //     image: "https://cdn.prod.website-files.com/63d90fe29e8bf43980780590/64ae5b4ac93bc48ef7292f9a_641c58609c12b42920040245_austin-distel-rxpThOwuVgE-unsplash_NaNmb_11zon.jpg",
// //     date: "June 12, 2025",
// //     location: "Bangalore, India",
// //   },
// ];

// export function EventProvider({ children }) {
//   const [events, setEvents] = useState(initialEvents);

//   const addEvent = (newEvent) => {
//     const eventWithId = {
//       ...newEvent,
//       id: Date.now(), // More unique than prev.length + 1
//     };
//     setEvents((prev) => [...prev, eventWithId]);

//     console.log("✅ Event added:", eventWithId); // Debug log
//   };

//   return (
//     <EventContext.Provider value={{ events, addEvent }}>
//       {children}
//     </EventContext.Provider>
//   );
// }

// export function useEvents() {
//   return useContext(EventContext);
// }

// ======================================================================================

// context/EventContext.jsx
import { createContext, useState, useContext } from "react";
import axios from "axios";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);

      const userEmail = localStorage.getItem("userEmail");
      const myEvents = res.data.filter(event => event.creatorEmail === userEmail);
      setCreatedEvents(myEvents);
      console.log("✅ Events fetched from backend:", res.data);
    } catch (err) {
      console.error("❌ Error fetching events:", err);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const res = await axios.post("http://localhost:5000/api/events", newEvent);
      setEvents((prev) => [...prev, res.data]);
      setCreatedEvents((prev) => [...prev, newEvent]);
      console.log("✅ Event added to backend:", res.data);
    } catch (err) {
      console.error("❌ Error adding event:", err);
    }
  };

  const updateEvent = (id, updatedData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === id ? { ...event, ...updatedData } : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, fetchEvents, addEvent, updateEvent, createdEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}

// ==========================================================================

// import axios from "axios";
// import { createContext, useContext, useState, useEffect } from "react";

// const EventContext = createContext();

// export function useEvents() {
//   return useContext(EventContext);
// }

// export function EventProvider({ children }) {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/events")
//       .then((res) => setEvents(res.data))
//       .catch((err) => console.error("Error fetching events:", err));
//   }, []);

//   const addEvent = async (event) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/events", event);
//       setEvents((prev) => [...prev, response.data]); // Add new event to context
//     } catch (err) {
//       console.error("Error adding event:", err);
//       alert("Failed to publish event. Check the console.");
//     }
//   };

//   return (
//     <EventContext.Provider value={{ events, addEvent }}>
//       {children}
//     </EventContext.Provider>
//   );
// }
