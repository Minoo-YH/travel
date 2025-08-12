import React, { useRef } from "react";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./roomModel.css";

const customStyles = {
  content: {
    backgroundColor: "transparent",
    padding: "0",
    border: "none",
    position: "relative",
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

const RoomModals = ({
  isImageModalOpen,
  closeImageModal,
  currentRoomImages,
}) => {
  const swiperRef = useRef(null);

  const handlePreviousImage = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextImage = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
        style={customStyles}
        contentLabel="Room Images Modal"
        className="Room-images-modal"
      >
        <div className="ModalContent">
          {currentRoomImages && currentRoomImages.length > 0 ? (
            <>
              <Swiper
                ref={swiperRef}
                className="image-swiper"
                loop={true}
                navigation={false}
                modules={[Navigation]}
              >
                {currentRoomImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`https://travel-site-sa34.onrender.com${image.replace(/\\/g, "/")}`}
                      alt={`Room Image ${index + 1}`}
                      className="gallery-image"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                        margin: "0 auto",
                        display: "block",
                        marginTop: "10rem",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <p>No images available for this room.</p>
          )}
          <div className="container-btn">
            <button onClick={handlePreviousImage} className="nav-button">
              <FaArrowLeft />
            </button>
            <button onClick={closeImageModal} className="nav-button">
              <FaTimes size={20} />
            </button>
            <button onClick={handleNextImage} className="nav-button">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoomModals;
