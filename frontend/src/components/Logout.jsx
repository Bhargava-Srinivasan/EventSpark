import { auth, signOut } from "../firebase";
import "../assets/style.css";

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
