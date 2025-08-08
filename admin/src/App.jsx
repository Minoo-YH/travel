import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./controllers/Users/Users";
import Hotel from "./controllers/Hotel/Hotel";
import Rooms from "./controllers/Rooms/Rooms";
import AddHotels from "./controllers/Add/AddHotel/AddHotel";
import AddRooms from "./controllers/Add/AddRoom/AddRooms";
import EditRoom from "./controllers/Edit/EditRoom/EditRoom";
import EditHotel from "./controllers/Edit/EditHotel/EditHotel";
import Reservation from "./controllers/Reservation/Reservation";


const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Hotel" element={<Hotel />} />
        <Route path="/hotels/:hotelId/rooms" element={<Rooms />} />
        <Route path="/hotels/AddHotels" element={<AddHotels />} />
        <Route path="/hotels/:hotelId/add-room" element={<AddRooms />} />
        <Route path="/hotels/:hotelId/rooms/:roomId/edit" element={<EditRoom />} />
        <Route path="/hotels/edit/:hotelId" element={<EditHotel />} />
        <Route path="/Reservation" element={<Reservation />} />
      </Routes>
    </div>
  );
};

export default App;
