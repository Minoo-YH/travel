import React from "react";
import Header from "../components/header/Header";
import Review from "./Review";
import Nav from "@Nav";
import Ftr from "../components/Ftr/Ftr";
import FutureTrip from "../Hotelcomponents/Future/FutureTrip";
import "../index.css";
import "../Middleware/mood/Light-Dark.css";

const Home = () => {

  const stopOverflow = {
    overflowX: "hidden",
  };

  const dividerStyle = {
    margin: "20px 0",
    borderTop: "1px solid #ccc"
  };

  return (
    <div style={stopOverflow}>
      <Nav />

      <Header />

      <div style={dividerStyle} />


      <FutureTrip />

     

      <div style={dividerStyle} />
      <Review />

      <div style={dividerStyle} />

      

      <Ftr />
    </div>
  );
};

export default Home;
