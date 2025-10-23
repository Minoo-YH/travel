import  { useState, useEffect } from "react";
import axios from "axios"; 
import CountrySelect from "../Auth/CountrySelect"; 
import { useNavigate } from "react-router-dom";
import Ftr from "../../components/Ftr/Ftr";
import Nav from "@Nav";


const UpdateProfile = () => {
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState({
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = (e) => {
    setConfirmation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.password || !inputs.phoneNumber || !inputs.country) {
      alert("All fields are required.");
    } else {
      if (inputs.password !== confirmation.confirmPassword) {
        alert("Passwords don't match.");
      } else {
        try {
          const userId = sessionStorage.getItem("userId"); 
          const response = await axios.put(`http://localhost:5000/api/auth/users/${userId}`, inputs);
          setError(null);
          alert("Profile updated successfully!");
          navigate("/UserProfile");
        } catch (error) {
          console.error('Error updating profile:', error.response.data);
          setError(error.response.data.message || 'Update failed.');
        }
      }
    }
  };

  const cancelUpdate = () => {
    navigate("/UserProfile");
  };

  return (
    <div>
      <Nav />
      <div className="update-profile">
        <h1 style={{ color: "black", marginLeft: "-30px"}}>Update Profile</h1>
        <form>
          <label>Name</label>
          <input
            type="text"
            placeholder={user.name}
            name="name"
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={handleConfirm}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            placeholder={user.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            required
          />

          <label>Country</label>
          <CountrySelect selectedCountry={user.country} onChange={handleChange} />

          {error && <p className="error">{error}</p>}

          <div className="action-buttons">
            <button className="btn-action" onClick={handleClick}>Update</button>
            <button className="btn-action" onClick={cancelUpdate}>Cancel</button>
          </div>
        </form>
      </div>
      <Ftr />
    </div>
  );
};

export default UpdateProfile;



