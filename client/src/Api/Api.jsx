// src/api.js
import axios from "axios";

const apiUrl = "https://travel-site-sa34.onrender.com" || "http://localhost:5000";

export function fetchHotelsFilter(params) {
  return axios.get(`${apiUrl}/api/hotels/filter`, { params });
}
