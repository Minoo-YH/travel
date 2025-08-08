import React, { useState } from "react";
import "./AddRooms.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";

const AddRooms = () => {
  const { hotelId } = useParams();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [images, setImages] = useState([]);  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("roomNumber", roomNumber);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/hotels/${hotelId}/rooms`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to add room. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="add-rooms-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="form-container">
        <h2>Create New Room for Hotel {hotelId}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Details:</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Room Number:</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Images:</label>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              required
            />
          </div>
          <button type="submit">Add Room</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AddRooms;
