import React, { useState } from "react";
import api from "../api/axios";

export default function AddCarModal({ onClose }) {
  const [form, setForm] = useState({
    VIN: "",
    make: "",
    model: "",
    year: "",
    brand: "",
    publicKey: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Make sure you’re hitting the dealer endpoint
      await api.post("/dealers/addCar", form, { withCredentials: true });
      onClose(); // success: close modal and refresh list
    } catch (err) {
      // Grab backend message if present, otherwise fallback
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Unknown error adding car";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Car</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="VIN"
            placeholder="VIN"
            value={form.VIN}
            onChange={handleChange}
            required
          />
          <input
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            required
          />
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            placeholder="Year"
            type="number"
            value={form.year}
            onChange={handleChange}
            required
          />
          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
          <textarea
            name="publicKey"
            placeholder="Public Key"
            value={form.publicKey}
            onChange={handleChange}
            rows={4}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding…" : "Add Car"}
          </button>
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
