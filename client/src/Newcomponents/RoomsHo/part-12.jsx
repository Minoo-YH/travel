import React, { useEffect, useState } from "react";

const Part12 = ({ hotelId }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      const storedHotel = localStorage.getItem("selectedHotel");
      if (storedHotel) {
        const hotelData = JSON.parse(storedHotel);
        if (hotelData.id === hotelId) {
          setHotel(hotelData);
        }
      }
    };

    fetchHotelData();
  }, [hotelId]);

  return (
    <div style={styles.container}>
 
      {hotel ? (
        <div style={styles.hotelInfo}>
          <h2 style={styles.hotelName}>
           
            {hotel.name}</h2>
         
        </div>
      ) : (
        <p>Loading hotel data...</p>
      )}
    </div>
  );
};

const styles = {
 
  container: {
    width: "100vw", 
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "white",
    justifyContent: "flex-end",
    
  },
  hotelInfo: {
    display: "flex",
    flexDirection: "row",  
    // removed duplicate -> justifyContent: "flex-start",  
    gap: "10px", 
    flexWrap: "nowrap",  
    
  },
  hotelName: {
    fontSize: "30px",  
    fontWeight: "bold", 
    fontFamily: "'Arial', sans-serif", 
    marginRight: "20px",  
  
  },
  hotelInfo1: {
    fontSize: "14px",
    fontWeight: "normal", 
    fontFamily: "'Tahoma', sans-serif", // Ø§Ø®ØªÙŠØ§Ø± Ø®Ø· Ø£Ø®Ù
    color: "black", 
    display: "flex", // Ensure the country, city, and price appear in one line
    flexDirection: "row",  // Align them horizontally
    gap: "10px",  // Space between each element
    marginTop: "2cm",
  
  },
};

export default Part12;


