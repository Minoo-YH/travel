import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./AddHotel.scss"

const AddHotels = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    photos: [],
    title: "",
    desc: "",
    rating: "",
    phoneNumber: "",
    cheapestPrice: "",
    maxPrice: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      setFormData({
        ...formData,
        photos: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("city", formData.city);
    data.append("country", formData.country);
    data.append("address", formData.address);
    data.append("latitude", parseFloat(formData.latitude));
    data.append("longitude", parseFloat(formData.longitude));
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("rating", parseFloat(formData.rating));
    data.append("phoneNumber", formData.phoneNumber);
    data.append("cheapestPrice", formData.cheapestPrice);
    data.append("maxPrice", formData.maxPrice);
    data.append("featured", formData.featured);

    Array.from(formData.photos).forEach((file) => data.append("photos", file));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotels",
        data
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Failed to add hotel. Please try again.");
    }
  };

  return (
    <div className="home">
     <div className="Sidebar"> <Sidebar /></div>
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Latitude:</label>
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Longitude:</label>
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Description:</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Images:</label>
        <input type="file" name="photos" onChange={handleChange} multiple />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>phoneNumber:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Cheapest Price:</label>
        <input
          type="number"
          name="cheapestPrice"
          value={formData.cheapestPrice}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>maxPrice Price:</label>
        <input
          type="number"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Featured:</label>
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
        />
      </div>

      <button type="submit">Add Hotel</button>
    </form>
    </div>
  );
};

export default AddHotels;
