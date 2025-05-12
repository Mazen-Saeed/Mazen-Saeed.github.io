import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ name }) {
  const { logout } = useContext(AuthContext);
  return (
    <nav style={{ background: "#007bff", padding: "1rem", color: "white" }}>
      <span>Welcome, {name}</span>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>
    </nav>
  );
}
