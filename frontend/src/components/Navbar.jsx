import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Logout from "./logout";
import "../assets/style.css";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">EventSpark</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="navbar-user">Welcome, {user.email}</span>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
}
