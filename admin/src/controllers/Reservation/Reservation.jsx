import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations/all");
        setReservations(response.data);
        setFilteredReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query === "") {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter(
        (reservation) =>
          reservation.userId.toLowerCase().includes(query) ||
          reservation.hotelId.toLowerCase().includes(query)
      );
      setFilteredReservations(filtered);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations(reservations.filter((reservation) => reservation._id !== reservationId));
      setFilteredReservations(filteredReservations.filter((reservation) => reservation._id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div>
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <div className="reservation-list-container">
        <h1>Reservation List</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by user ID or hotel ID"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>userId</th>
              <th>hotelId</th>
              <th>roomId</th>
              <th>startDate</th>
              <th>endDate</th>
              <th>isPaid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.userId}</td>
                <td>{reservation.hotelId}</td>
                <td>{reservation.roomId}</td>
                <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.endDate).toLocaleDateString()}</td>          
                <td>{reservation.isPaid ? "Yes" : "No"}</td>

                <td>
                  <button onClick={() => deleteReservation(reservation._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
