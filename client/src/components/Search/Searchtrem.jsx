import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import "./Searchtrem.css";

function Searchtrem({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [rating, setRating] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(true);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!destination.trim()) {
      alert("Please enter a valid city.");
      return;
    }

    const priceRange = [0, maxPrice];
    console.log("Sending search data to Discover:", { destination, priceRange, rating });

    if (onSearch) {
      onSearch({ destination, priceRange, rating });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;


    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={`star-${i}`}
          className={`star ${i <= fullStars ? "full" : i === fullStars + 1 && halfStar ? "half" : "empty"}`}
          onClick={() => setRating(i)} 
        />
      );
    }

    return stars;
  };

  return (
    <div className="sidebar">
      <p onClick={() => setIsModalOpen(!isModalOpen)} className="toggle-button">
        {isModalOpen ? (
          <FaChevronUp size={20} color="black" />
        ) : (
          <FaChevronDown size={20} color="black" />
        )}
      </p>
      {isModalOpen && (
        <div className="searchtrem" ref={datePickerRef}>
          <h2>City</h2>
          <input
            type="text"
            placeholder="City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input"
          />
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="range-input"
              style={{
                background: `linear-gradient(to right, #cb5c00 ${(maxPrice / 1000) * 100}%, #ddd ${(maxPrice / 1000) * 100}%)`,
              }}
            />
            <p>{`$0 - $${maxPrice}`}</p>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
              className="number-input"
            />
          </div>

          <div className="rating-container">
            <h3>Rating</h3>
            <div className="hotel-rating">
              {renderStars(rating)} 
            </div>
            <p>{`Rating: ${rating} Stars`}</p>
          </div>

          <button className="nav-button" onClick={handleSearch}>
            <p className="nav-button-text"> Search</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Searchtrem;
