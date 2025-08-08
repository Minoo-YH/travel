import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Parallax } from "swiper/modules";

const RatingList = [
  { id: "1", name: "John Doe", comment: "Best hotel I've ever stayed at!", image: "https://randomuser.me/api/portraits/men/3.jpg", stars: 5 },
  { id: "2", name: "Jane Smith", comment: "Great experience, highly recommend!", image: "https://randomuser.me/api/portraits/women/4.jpg", stars: 4 },
  { id: "3", name: "Sam Wilson", comment: "The staff was amazing, very friendly.", image: "https://randomuser.me/api/portraits/men/5.jpg", stars: 5 },
  { id: "4", name: "Emily Johnson", comment: "Loved the ambience and service!", image: "https://randomuser.me/api/portraits/women/6.jpg", stars: 4 },
  { id: "5", name: "Michael Brown", comment: "Highly recommended, will visit again.", image: "https://randomuser.me/api/portraits/men/7.jpg", stars: 5 },
  { id: "6", name: "Alice Green", comment: "Amazing experience! Great location.", image: "https://randomuser.me/api/portraits/women/7.jpg", stars: 5 },
  { id: "7", name: "George Black", comment: "Would come back every time!", image: "https://randomuser.me/api/portraits/men/8.jpg", stars: 4 },
];

function Review() {
  return (
    <div style={styles.wrapper}>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={20}  // مسافة متساوية بين البطاقات
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}  
        speed={700}  
        parallax={true}
        modules={[Autoplay, Parallax]}
      >
        {RatingList.map((person) => (
          <SwiperSlide key={person.id} style={styles.slide}>
            <div style={styles.ratingItem}>
              <img src={person.image} alt={person.name} style={styles.image} />
              <div style={styles.textContainer}>
                <h3 style={styles.name}>{person.name}</h3>
                <p style={styles.comment}>{person.comment}</p>
                <div style={styles.stars}>
                  {"★".repeat(person.stars)}{"☆".repeat(5 - person.stars)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#f9f9f9",  
  },
  slide: {
    display: "flex",
    justifyContent: "center", 
  },
  ratingItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    width: "350px", 
    minHeight: "250px",
    textAlign: "center",
    border: "2px solid antiquewhite",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "5px 0",
    color: "#333",
  },
  comment: {
    fontSize: "14px",
    color: "#666",
    margin: "10px 0",
    lineHeight: "1.6",
  },
  stars: {
    fontSize: "18px",
    color: "#f39c12",
  },
};

export default Review;
