import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import RoomModals from "./RoomModals";
import "./rrooms.css";

const Rooms = () => {
  const { hotelId } = useParams();
  console.log("🔹 hotelId from URL params:", hotelId);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentRoomImages, setCurrentRoomImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      console.log("🔹 Fetching rooms for hotelId:", hotelId);

      try {
        const response = await axios.get(
          `https://travel-site-sa34.onrender.com/api/hotels/${hotelId}/rooms`
        );
        console.log("✅ API response data:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("❌ Unexpected response format: not an array");
        }

        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchRooms();
    } else {
      console.error("❌ Missing hotelId in URL params");
      setError("Hotel ID is missing.");
      setLoading(false);
    }
  }, [hotelId]);

  const openImageModal = (roomImages) => {
    console.log("🖼️ Opening image modal with images:", roomImages);
    setCurrentRoomImages(roomImages);
    setCurrentImageIndex(0);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    console.log("❌ Closing image modal");
    setIsImageModalOpen(false);
  };

  const handleRoomSelection = (room) => {
    console.log("🏨 Selected Room:", room);

    if (!room || !room._id) {
      console.error("❌ Room data is incomplete!");
      return;
    }

    // Ensure price is stored as a number
    const price = room.price ? parseFloat(room.price) : 0; // Default to 0 if no price

    const reservationData = {
      hotelId,
      roomId: room._id,
      price: price, // Store price as a number
      startDate: "",
      endDate: "2",
      email: "",
      userId: "",
    };

    sessionStorage.setItem("reservationData", JSON.stringify(reservationData));
    console.log("✅ Reservation data saved:", reservationData);
  };

  if (loading) {
    console.log("⏳ Loading rooms...");
    return <p>Loading rooms...</p>;
  }

  if (error) {
    console.log("🚨 Error:", error);
    return <p>{error}</p>;
  }

  return (
    <div className="rooms-container">
      {rooms.length === 0 && <p>⚠️ No rooms available</p>}
      {rooms.map((room, index) => {
        console.log(`📌 Rendering room #${index + 1}:`, room);

        if (!room._id) {
          console.error(`❌ Room at index ${index} is missing _id`);
          return null;
        }

        const bookingLink = `/Discover/reservation/${hotelId}/${room._id}`;
        console.log("🔗 Booking Link:", bookingLink);

        return (
          <div key={room._id} className="room-card">
            <div>
              {room.img?.length > 0 ? (
                <img
                  src={`https://travel-site-sa34.onrender.com/${room.img[0].replace(
                    /\\/g,
                    "/"
                  )}`}
                />
              ) : (
                <img
                  src="default-image.jpg"
                  alt={room.title || "Room Image"}
                  onClick={() => openImageModal([room.img])}
                />
              )}
            </div>
            <div className="details">
              <h3>{room.title || "No title"}</h3>
              <p>{room.details || "No details available"}</p>
              <p className="price">${room.price ?? "N/A"}</p>
              <p className="room-number">
                <strong>Room Number:</strong> {room.roomNumber || "Unknown"}
              </p>
              <Link to={bookingLink}>
                <button
                  className="nav-button"
                  onClick={() => handleRoomSelection(room)}
                >
                  Book now
                </button>
              </Link>
            </div>
          </div>
        );
      })}
      <RoomModals
        isImageModalOpen={isImageModalOpen}
        closeImageModal={closeImageModal}
        currentRoomImages={currentRoomImages}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </div>
  );
};

export default Rooms;
