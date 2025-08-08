import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./EditHotel.scss";


// dose not work *************************

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    cheapestPrice: 0,
    featured: false,
  });
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
        setHotel(response.data);  
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel({
      ...hotel,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", hotel.name);
    formData.append("type", hotel.type);
    formData.append("city", hotel.city);
    formData.append("address", hotel.address);
    formData.append("title", hotel.title);
    formData.append("desc", hotel.desc);
    formData.append("rating", hotel.rating);
    formData.append("cheapestPrice", hotel.cheapestPrice);
    formData.append("featured", hotel.featured);

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => formData.append("photos", file));  
    }

    try {
      await axios.put(`http://localhost:5000/api/hotels/${hotelId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/Hotel`);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <h2>Edit Hotel</h2>

      <div className="col-md-6">
        <label className="form-label">Hotel Name</label>
        <input
          type="text"
          name="name"
          value={hotel.name || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Type</label>
        <input
          type="text"
          name="type"
          value={hotel.type || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          value={hotel.city || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          value={hotel.address || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-12">
        <label className="form-label">Photos</label>
        <input
          type="file"
          name="photos"
          onChange={handleFileChange}
          className="form-control"
          multiple
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={hotel.title || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="desc"
          value={hotel.desc || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Rating</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          value={hotel.rating || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Cheapest Price</label>
        <input
          type="number"
          name="cheapestPrice"
          value={hotel.cheapestPrice || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={hotel.featured}
          onChange={handleChange}
          className="form-check-input"
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};


export default EditHotel;