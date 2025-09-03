import { useState } from "react";
import axios from "axios";
import "../assets/auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();  // Prevents the form from refreshing the page

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
      });
      alert(response.data.message);  // Display server response message
      window.location.href = "/login";
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
