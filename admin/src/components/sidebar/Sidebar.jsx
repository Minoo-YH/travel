import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HotelIcon from '@mui/icons-material/Hotel';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">travel-site</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>         
          </Link>
          
          <p className="title">LISTS</p>
          <Link to="/Users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/Hotel" style={{ textDecoration: "none" }}>
            <li>
              <HotelIcon className="icon" />
              <span>Hotel</span>
            </li>
          </Link>
          <Link to="/hotels/AddHotels" style={{ textDecoration: "none" }}>
            <li>
              <AddHomeWorkIcon className="icon" />
              <span>Add_Hotel</span>
            </li>
          </Link>
          <Link to="/Reservation" style={{ textDecoration: "none" }}>
            <li>
              <BookOnlineIcon className="icon" />
              <span>Reservation</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Sidebar;
