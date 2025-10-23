import React from "react";
import Nav from "@Nav";
import "./rreservation.css";
import Add from "./add";
import ReservationForm from "../../Hotelcomponents/Reservation/Reservation";
import Ftr from "../../components/Ftr/Ftr";
const Reservationgrid = () => {
  return (
    <div className="All-Parts20">
      <div className="part-21">
        <Nav />
      </div>

      <div className="part-22">
        <div className="part-22.4">
          <ReservationForm />
        </div>
        <div className="part-22.9">
          <Add />
        </div>
      </div>
      <footer className="part-23">
      <Ftr />
        
      </footer>
    </div>
  );
};

export default Reservationgrid;


