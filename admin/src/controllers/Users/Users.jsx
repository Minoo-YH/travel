import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Users.scss"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId)); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
        
        <div className="user-list-container">
          <h1>User List</h1>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Age</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.age}</td>
                  <td>{user.country}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
  );
};

export default Users;
