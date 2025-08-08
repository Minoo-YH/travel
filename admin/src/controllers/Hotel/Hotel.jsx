import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Hotel.scss";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");

        // Commented out the room count logic
        // const hotelsWithRoomsCount = await Promise.all(
        //   response.data.map(async (hotel) => {
        //     try {
        //       const roomsResponse = await axios.get(`http://localhost:5000/api/hotels/${hotel._id}/rooms`);
        //       return { ...hotel, roomsCount: roomsResponse.data.length };
        //     } catch {
        //       return { ...hotel, roomsCount: 0 };
        //     }
        //   })
        // );

        // Use original data without room count
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to fetch hotels. Please try again.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`);
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
        alert("Hotel deleted successfully.");
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel. Please try again.");
      }
    }
  };
  
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <Sidebar />
      <div className="hotel-container">
        <h2>Hotel List</h2>

        <input
          type="text"
          placeholder="Search by hotel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hotel-search-input"
        />

        <Link to="/hotels/AddHotels">
          <button className="add-hotel-button">Add New Hotel</button>
        </Link>

        <table className="hotel-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Cheapest Price</th>
              <th>Max Price</th>
              <th>rating</th>
              {/* Commented out room count column */}
              {/* <th>Rooms Count</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.address}</td>
                <td>{hotel.phoneNumber}</td>
                <td>${hotel.cheapestPrice}</td>
                <td>${hotel.maxPrice}</td>
                <td>{hotel.rating}</td>
                {/* Commented out the room count */}
                {/* <td>{hotel.roomsCount}</td> */}
                <td>
                  <button
                    onClick={() => handleDeleteHotel(hotel._id)}
                    className="delete-hotel-button"
                  >
                    Delete
                  </button>
                  <Link to={`/hotels/edit/${hotel._id}`}>
                    <button className="edit-hotel-button">Edit Hotel</button>
                  </Link>
                  <Link to={`/hotels/${hotel._id}/add-room`}>
                    <button className="add-room-button">Add Room</button>
                  </Link>
                  <Link to={`/hotels/${hotel._id}/rooms`}>
                    <button className="view-rooms-button">View Rooms</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotel;
