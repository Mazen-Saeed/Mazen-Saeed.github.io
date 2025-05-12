import React, { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CarList from "../components/CarList";
import AddCarModal from "../components/AddCarModal";
import AssignCarModal from "../components/AssignCarModal";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  const fetchCars = async () => {
    const res = await api.get("/dealers/getAllCars");
    setCars(res.data.data.vehicles);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <Navbar name={user.name} />
      <div className="container" style={{ padding: "1rem" }}>
        <h1 style={{ margin: "1rem 0" }}>Your Vehicles</h1>

        {/* Button row with space */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={() => setShowAdd(true)}>Add Car</button>
          <button onClick={() => setShowAssign(true)}>Assign Car</button>
        </div>

        <CarList cars={cars} />

        {showAdd && (
          <AddCarModal
            onClose={() => {
              setShowAdd(false);
              fetchCars();
            }}
          />
        )}
        {showAssign && (
          <AssignCarModal
            onClose={() => {
              setShowAssign(false);
              fetchCars();
            }}
          />
        )}
      </div>
    </div>
  );
}
