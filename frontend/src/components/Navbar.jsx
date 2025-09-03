import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Logout from "./logout";
import "../assets/style.css";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* <img className="logo" height = "80px" width="80px" src="../../public/logo_v2-new.png" alt="" /> */}
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
          <div className="profile-container" ref={dropdownRef}>
            <img
              src={"/avatar.png"}
              alt="Profile"
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-email">{user.email}</div>
                <div
                  className="dropdown-link"
                  onClick={() => {
                    navigate("/my-events");
                    setDropdownOpen(false);
                  }}
                >
                  My Events
                </div>
                <Logout />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
