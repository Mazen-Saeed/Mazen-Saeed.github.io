import React, { useState } from "react";
import api from "../api/axios";

export default function AssignCarModal({ onClose }) {
  const [VIN, setVIN] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.patch("/dealers/assignCar", { VIN, userEmail });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Assign Car</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="VIN"
            placeholder="VIN"
            value={VIN}
            onChange={(e) => setVIN(e.target.value)}
            required
          />
          <input
            name="userEmail"
            placeholder="User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <button type="submit">Assign</button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: "0.5rem", background: "#ccc", color: "#000" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
