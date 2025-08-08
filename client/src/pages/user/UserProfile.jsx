import React, { useState, useEffect } from "react";
import Nav from "@Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Ftr from "../../components/Ftr/Ftr";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/auth/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const deleteProfile = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const userId = localStorage.getItem("userId");
        await axios.delete(`http://localhost:5000/api/auth/users/${userId}`);
        alert("User deleted");
        navigate("/");
      } catch (error) {
        setError("Error removing user data");
        console.error(error);
      }
    } else {
      console.log("User not deleted");
    }
  };

  const updateProfile = () => {
    navigate("/UpdateProfile");
  };

  const userReservation = () => {
    navigate("/UserReservation");
  };

  return (
    <div>
        
      <Nav />
    
        <div className="user-profile">
          <h1 style={{ color: "black", marginLeft: "-5px"}} >User Profile</h1>

          <table className="user-info-table">
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td>
                  <strong>Country:</strong>
                </td>
                <td>{user.country}</td>
              </tr>
            </tbody>
          </table>

          <div className="bottom-buttons">
            <button className="nav-button" onClick={updateProfile}>
              Edit
            </button>
            <button className="nav-button" onClick={deleteProfile}>
              Delete
            </button>
            <button className="nav-button" onClick={userReservation}>
              Reservation
            </button>
          </div>
        </div>
        <Ftr />
      </div>

  );
};

export default UserProfile;
