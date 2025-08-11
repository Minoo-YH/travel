import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import HotelImagesModal from "./HotelImagesModal";
import "./HotelFltring.css";
import { fetchHotelsFilter } from "../../Api/Api"

const Hotels = ({ searchData }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelImages, setCurrentHotelImages] = useState([]);

  useEffect(() => {
    if (!searchData || !searchData.destination) return;

    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          city: searchData.destination.trim(),
          maxPrice: searchData.priceRange[1],
        };

        if (searchData.rating) {
          params.rating = Number(searchData.rating);
        }

        console.log("🚀 Fetching hotels with params:", params);
        const response = await fetchHotelsFilter(params);  // استدعاء API هنا
        setHotels(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchData]);

  const handleOpenModal = (hotelImages) => {
    setCurrentHotelImages(hotelImages ?? []);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!searchData || !searchData.destination)
    return <p>Please enter search criteria to find hotels.</p>;
  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={i <= rating ? "star full" : "star empty"} />
      );
    }
    return stars;
  };

  return (
    <div className="hotels-container">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img
              src={
                hotel.photos?.length
                  ? `https://travel-site-sa34.onrender.com${hotel.photos[0].replace(/\\/g, "/")}`
                  : "/default-image.jpg"
              }
              alt={hotel.name}
              className="hotel-img"
              onClick={() => handleOpenModal(hotel.photos)}
            />
            <div className="hotel-info">
              <div className="hotel-rating">{renderStars(hotel.rating)}</div>
              <h2 className="hotel-name">{hotel.name}</h2>
              <div className="location">
                <FaMapMarkerAlt className="location-icon" />
                <span>
                  {hotel.country} / {hotel.city}
                </span>
              </div>
              <p className="hotel-price">
                Price: <span className="min-price">${hotel.cheapestPrice}</span>
                <span className="separator"> to </span>
                <span className="max-price">${hotel.maxPrice}</span>
              </p>
              <p className="hotel-description">
                {hotel.description ||
                  "Experience comfort and luxury at our hotel, featuring top-notch services and spacious rooms."}
              </p>

              <Link className="card-btn" to={`/Discover/${hotel._id}/Rooms`}>
                <button className="card-btn">ROOMS</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels were found for this search.</p>
      )}

      <HotelImagesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={currentHotelImages ?? []}
      />
    </div>
  );
};

export default Hotels;
