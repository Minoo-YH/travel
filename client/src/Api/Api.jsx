// src/api.js
import axios from "axios";

// Use the deployed API by default, fallback to local
const apiUrl = "https://travel-site-sa34.onrender.com" || "http://localhost:5000";

// Hotels filter
export function fetchHotelsFilter(params) {
  return axios.get(`${apiUrl}/api/hotels/filter`, { params });
}

// Hotel rooms
export function fetchHotelRooms(hotelId) {
  return axios.get(`${apiUrl}/api/hotels/${hotelId}/rooms`);
}

// Helper to build image URL
export function getImageUrl(path) {
  return `${apiUrl}/${path.replace(/\\/g, "/")}`;
}

export function createReservation(data) {
  return axios.post(`${apiUrl}/api/reservations`, data);
}


