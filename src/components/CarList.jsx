import React from "react";

export default function CarList({ cars }) {
  if (!cars.length) return <p>No vehicles found.</p>;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
      }}
    >
      <thead>
        <tr>
          {["VIN", "Make", "Model", "Year"].map((heading) => (
            <th
              key={heading}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "0.5rem",
                textAlign: "center",
              }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.VIN}>
            <td
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                textAlign: "center",
              }}
            >
              {car.VIN}
            </td>
            <td
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                textAlign: "center",
              }}
            >
              {car.make}
            </td>
            <td
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                textAlign: "center",
              }}
            >
              {car.model}
            </td>
            <td
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                textAlign: "center",
              }}
            >
              {car.year}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
