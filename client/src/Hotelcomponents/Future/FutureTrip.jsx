import React from "react";
import futureTripCSS from "./FutureTrip.module.css";
import TravelAnimation from "./TravelAnimation";
import image3 from "@assets/newyork.jpg";
import image2 from "@assets/paris.jpg";
import image1 from "@assets/ski.jpg";
import image4 from "@assets/island.jpg";
import image5 from "@assets/boat.jpg";
import image6 from "@assets/fingirl.jpg";

function FutureTrip() {
  return (

    <div>
  
    <div className={`${futureTripCSS.FutureTrip_Wrapper} section`} id="inspiration">
      <div className={futureTripCSS.FutureTripCards}>
        {[{ image: image1, title: "10 European Ski Resorts You Should Visit This Winter", date: "Jan-06-2024" },
          { image: image2, title: "Visiting Best Locations With Us?", date: "Jan-14-2024" },
          { image: image3, title: "Where Can I Go? 5 Amazing Countries That Are Open Right Now!", date: "Jan-06-2024" },
          { image: image4, title: "Discover Hidden Gems in Canary Island", date: "Feb-20-2024" },
          { image: image5, title: "Explore the Mystical Beauty of Brazil", date: "Mar-01-2024" },
          { image: image6, title: "Relax in the Finnish breathtaking northern forest", date: "Apr-15-2024" }
        ].map((trip, index) => (
          <div key={index} className={futureTripCSS.FutureTripCard}>
            <div className={futureTripCSS.FutureTripCardImage}>
              <img src={trip.image} alt={trip.title} className={futureTripCSS.FadeIn} />
            </div>
            <h3>{trip.title}</h3>
            <p>{trip.date}</p>
          </div>
        ))}
      </div>
      </div>
    
    </div>
  );
}

export default FutureTrip;
