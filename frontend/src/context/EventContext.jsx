import { createContext, useState, useContext } from "react";

const EventContext = createContext();

const initialEvents = [
  {
    id: 1,
    title: "React Workshop",
    category: "Tech",
    description: "Learn React from scratch and build interactive UIs.",
    image: "https://sourcebae.com/blog/wp-content/uploads/2023/08/Benefits-of-ReactJS.jpg",
    date: "April 20, 2025",
    location: "Online",
  },
  {
    id: 2,
    title: "Photography Basics",
    category: "Art",
    description: "Capture your moments better with composition and lighting.",
    image: "https://www.findbanquet.com/blog/wp-content/uploads/2024/06/photographers.jpg",
    date: "May 5, 2025",
    location: "New Delhi, India",
  },
//   {
//     id: 3,
//     title: "Startup Pitch Night",
//     category: "Business",
//     description: "Present your startup idea to investors and win funding.",
//     image: "https://cdn.prod.website-files.com/63d90fe29e8bf43980780590/64ae5b4ac93bc48ef7292f9a_641c58609c12b42920040245_austin-distel-rxpThOwuVgE-unsplash_NaNmb_11zon.jpg",
//     date: "June 12, 2025",
//     location: "Bangalore, India",
//   },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(), // More unique than prev.length + 1
    };
    setEvents((prev) => [...prev, eventWithId]);

    console.log("✅ Event added:", eventWithId); // Debug log
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
