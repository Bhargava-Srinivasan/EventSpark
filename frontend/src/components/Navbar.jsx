import { Link } from "react-router-dom";
import "../assets/style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">EventSpark</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {/* <Link to="/create" className="btn-primary">Create Event</Link> */}
      </div>
    </nav>
  );
}
