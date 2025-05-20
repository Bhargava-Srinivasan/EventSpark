import HeroBanner from "../components/HeroBanner";
import EventCategoryTabs from "../components/EventCategoryTabs";
import EventCard from "../components/EventCard";
import Testimonials from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";
import SearchBar from "../components/SearchBar";
import { useEvents } from "../context/EventContext";
import "../assets/style.css";
import { useState } from "react";

export const allEvents = [
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
  {
    id: 3,
    title: "Startup Pitch Night",
    category: "Business",
    description: "Present your startup idea to investors and win funding.",
    image: "https://cdn.prod.website-files.com/63d90fe29e8bf43980780590/64ae5b4ac93bc48ef7292f9a_641c58609c12b42920040245_austin-distel-rxpThOwuVgE-unsplash_NaNmb_11zon.jpg",
    date: "June 12, 2025",
    location: "Bangalore, India",
  },
  {
    id: 4,
    title: "Yoga for Beginners",
    category: "Health",
    description: "Find your balance and inner peace through yoga.",
    image: "https://images.squarespace-cdn.com/content/v1/61f7e7b2a3feff07fcdb6e0c/7f5eeaed-ff23-4c43-9367-69073ca654fd/JPCY22_asana-48.jpg",
    date: "April 25, 2025",
    location: "Hyderabad, India",
  },
  {
    id: 5,
    title: "Intro to AI",
    category: "Tech",
    description: "Explore the basics of Artificial Intelligence and ML.",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQEh_sMxJAgP6Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1701859130483?e=2147483647&v=beta&t=aFxAGcy8EMMTISysYNRT6Jz9IypwJC63FA4lBQWsBPk",
    date: "May 15, 2025",
    location: "Online",
  },
  {
    id: 6,
    title: "Guitar Jam Night",
    category: "Music",
    description: "Bring your guitar and jam with fellow musicians.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_S1EaRQBeV8J0fBy4mHvfhJuItlb7LsrFw&s",
    date: "June 1, 2025",
    location: "Mumbai, India",
  },
  {
    id: 7,
    title: "Mindfulness Meditation",
    category: "Lifestyle",
    description: "Unplug and recharge with guided mindfulness sessions.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97yuGNyekBdrY6yrqXziuVRR-8ZoFoieFXQ&s",
    date: "April 28, 2025",
    location: "Pune, India",
  },
  {
    id: 8,
    title: "Digital Marketing 101",
    category: "Business",
    description: "Master SEO, social media, and paid ads in this bootcamp.",
    image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg",
    date: "May 20, 2025",
    location: "Chennai, India",
  },
  {
    id: 9,
    title: "Sketching for Beginners",
    category: "Art",
    description: "Learn the basics of pencil sketching with live demos.",
    image: "https://img-c.udemycdn.com/course/750x422/5387582_f621_3.jpg",
    date: "May 10, 2025",
    location: "Kolkata, India",
  },
  {
    id: 10,
    title: "Career Planning Seminar",
    category: "Education",
    description: "Set clear goals and strategies for your dream career.",
    image: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=",
    date: "June 8, 2025",
    location: "Ahmedabad, India",
  },
  {
    id: 11,
    title: "Beginner's Cricket Camp",
    category: "Sports",
    description: "Learn the fundamentals of batting, bowling, and fielding in a fun and friendly environment.",
    image: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/2516/live/45988f20-cc0a-11ef-9fd6-0be88a764111.jpg",
    date: "May 18, 2025",
    location: "Delhi, India",
  },
  {
    id: 12,
    title: "Weekend Football League",
    category: "Sports",
    description: "Join our weekend league and play competitive 5-a-side football with other local teams.",
    image: "https://images.indianexpress.com/2018/07/football-reuters-m.jpg",
    date: "May 25, 2025",
    location: "Goa, India",
  },
];

export default function Home() {
  
  const { events } = useEvents();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesSearch =
      !searchQuery || event.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeroBanner />
      <SearchBar onSearch={setSearchQuery} />
      <EventCategoryTabs
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="event-section">
        <div className="event-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <StatsCounter />
      <Testimonials />
    </>
  );
}
