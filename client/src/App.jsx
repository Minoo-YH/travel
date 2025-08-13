import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import RegisterLogin from "./pages/Auth/Register-Login";
import Home from "./pages/Home";
import HotelFltring from "./Hotelcomponents/filter/HotelFltring";
import Rooms from "./Hotelcomponents/room/Rooms";
import ReservationForm from "./Hotelcomponents/Reservation/Reservation";
import PaymentForm from "./Hotelcomponents/Payment/Payment";
import UserProfile from "./pages/user/UserProfile";
import UserReservation from "./pages/user/UserReservation";
import UpdateProfile from "./pages/user/UpdateProfile";
import Map from "./pages/Map/Map";
import Contact from "./components/contact/Contact";

import GlobalStyles from "./Style/GlobalStyles";

const stripePromise = loadStripe(
  "pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX"
);
import Searchtrem from "./components/Search/Searchtrem";


import Discover from "./Newcomponents/Discover/Discover";
import HotelEachRooms from "./Newcomponents/RoomsHo/HotelEachRooms";
import Reservationgrid from "./Newcomponents/Reservation/Reservationgrid"
function App() {
  
  return (
    <div>
      <div className="container">
        <GlobalStyles />
        <Elements stripe={stripePromise}>
          <Routes>

          <Route path="/Searchtrem" element={<Searchtrem />} />
     

            <Route path="/" element={<Home />} />

            <Route path="/RegisterLogin" element={<RegisterLogin />} />
            <Route path="/map" element={<Map />} />

            <Route path="/hotels/:hotelId/rooms" element={<Rooms />} />
              
            <Route
              path="/reservation/:roomId/:hotelId"
              element={<ReservationForm />}
            />
            <Route path="/HotelFltring" element={<HotelFltring />} />
            <Route path="/UserReservation" element={<UserReservation />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/payment/:reservationId" element={<PaymentForm />} />
            <Route path="/Contact" element={<Contact />} />




            <Route path="/Discover" element={<Discover />} />
            <Route path="/Discover/:hotelId/rooms" element={<HotelEachRooms />} />
            <Route path="/Discover/reservation/:hotelId/:roomId" element={<Reservationgrid />} />



         

          
          
          </Routes>
        </Elements>
      </div>
    </div>
  );
}


export default App;
