// import { Link } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";
// import Logout from "./logout";
// import "../assets/style.css";

// export default function Navbar() {
//   const [user] = useAuthState(auth);

//   return (
//     <nav className="navbar">
//       <h1 className="navbar-title">EventSpark</h1>
//       <div className="navbar-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>

//         {!user ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </>
//         ) : (
//           <>
//             <span className="navbar-user">Welcome, {user.email}</span>
//             <Logout />
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Logout from "./logout";
import "../assets/style.css";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown if clicking outside
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
              // src={user.photoURL || "../../public/avatar.png"}
              src={"/avatar.png"}
              alt="Profile"
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-email">{user.email}</div>
                <Logout />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
