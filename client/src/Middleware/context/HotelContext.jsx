import React, { createContext, useState, useContext } from 'react';

// Create the context
const HotelContext = createContext();

// Custom hook to use the context
export const useHotel = () => {
  return useContext(HotelContext);
};

// Context provider component
export const HotelProvider = ({ children }) => {
  const [hotelId, setHotelId] = useState(null);

  // Function to set hotelId (you can call this when hotelId is retrieved)
  const setHotel = (id) => {
    setHotelId(id);
  };

  return (
    <HotelContext.Provider value={{ hotelId, setHotel }}>
      {children}
    </HotelContext.Provider>
  );
};



