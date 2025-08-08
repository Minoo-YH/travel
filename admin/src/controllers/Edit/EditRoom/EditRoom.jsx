import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";

const EditRoom = () => {
  const { hotelId, roomId } = useParams(); 
  const navigate = useNavigate(); 
  const [room, setRoom] = useState({
    title: "",
    details: "",
    img: "",
    price: "",
    roomNumber: "",
  });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`
        );
        setRoom(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Failed to fetch room data, please try again.");
        setLoading(false); 
      }
    };

    fetchRoom();
  }, [hotelId, roomId]); 

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`,
        room
      );
      setSuccess(true); 
      setTimeout(() => {
        navigate(`/Hotel`); 
      }, 1500); 
    } catch (error) {
      console.error("Error updating room:", error);
      setError("Failed to update room, please try again.");
    }
  };

  if (loading) return <p>Loading room data...</p>; 
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <h2>Edit Room</h2>

      {success && <p style={{ color: "green" }}>Room updated successfully!</p>}

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={room.title || ""}
        onChange={handleChange}
      />

      <label>Details:</label>
      <input
        type="text"
        name="details"
        value={room.details || ""}
        onChange={handleChange}
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={room.price || ""}
        onChange={handleChange}
      />

      <label>Room Number:</label>
      <input
        type="text"
        name="roomNumber"
        value={room.roomNumber || ""}
        onChange={handleChange}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRoom;
