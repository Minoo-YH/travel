import React from "react";
import { Link } from "react-router-dom";
import "./ftr.css"; 

const Ftr = () => {
  const color = 'antiquewhite';
  const stopOverflow = {
    overflowX: "hidden",
    overflowY: "hidden",
  };
  

  return (
    <div style={stopOverflow}>
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links_div">
     
          <div className="socialmedia">
  
            <Link className="fab fa-linkedin-in" alt="LinkedIn"></Link>
          </div>
        </div>


   
        <hr style={{ borderColor: color }} />
       

        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>© {new Date().getFullYear()} Traveler. All rights reserved.</p>
          </div>
          <div className="sb__footer-below-links">
            <p>Terms & Conditions</p>
            <p>Privacy</p>
            <p>Security</p>
            <p>Cookie Declaration</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Ftr;
