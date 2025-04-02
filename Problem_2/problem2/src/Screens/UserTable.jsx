import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(savedRecords);
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const addRecord = async () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    try {
      const response = await axios.get(`https://swapi.dev/api/people/${randomId}/`);
      const newRecord = { id: Date.now(), ...response.data };
      setRecords(prevRecords => [...prevRecords, newRecord]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const deleteRecord = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", padding: "20px", overflowX: "auto" }}>
      <h2>User Details</h2>
      <button onClick={addRecord} style={{ marginBottom: "20px", padding: "10px" }}>Add Record</button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <table border="1" style={{ minWidth: "1200px", textAlign: "left", fontSize: "16px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
              <th>Skin Color</th>
              <th>Eye Color</th>
              <th>Birth Year</th>
              <th>Gender</th>
              <th>Homeworld</th>
              <th>Films</th>
              <th>Vehicles</th>
              <th>Starships</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td style={{ padding: "10px" }}>{record.name}</td>
                <td>{record.height}</td>
                <td>{record.mass}</td>
                <td>{record.hair_color}</td>
                <td>{record.skin_color}</td>
                <td>{record.eye_color}</td>
                <td>{record.birth_year}</td>
                <td>{record.gender}</td>
                <td><a href={record.homeworld} target="_blank" rel="noopener noreferrer">Homeworld</a></td>
                <td>{record.films.length > 0 ? record.films.map((film, i) => <a key={i} href={film} target="_blank">Film {i+1}</a>) : "N/A"}</td>
                <td>{record.vehicles.length > 0 ? record.vehicles.join(", ") : "N/A"}</td>
                <td>{record.starships.length > 0 ? record.starships.join(", ") : "N/A"}</td>
                <td><button onClick={() => deleteRecord(record.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
