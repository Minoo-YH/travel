import React from "react";

const RatingList = [
  {
    id: "1",
    name: "John Doe",
    comment: "Best hotel I've ever stayed at!",

    stars: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    comment: "Great experience, highly recommend!",

    stars: 4,
  },
  {
    id: "3",
    name: "Sam Wilson",
    comment: "The staff was amazing, very friendly.",

    stars: 5,
  },
  {
    id: "3",
    name: "Sam Wilson",
    comment: "The staff was amazing, very friendly.",

    stars: 5,
  },
  {
    id: "3",
    name: "Sam Wilson",
    comment: "The staff was amazing, very friendly.",

    stars: 5,
  },
];

const Part13 = () => {
  return (
    <div className="rating" style={styles.ratingContainer}>
      {RatingList.map((person) => (
        <div key={person.id} style={styles.ratingItem}>
          <div style={styles.textContainer}>
            <h3 style={styles.name}>{person.name}</h3>
            <p style={styles.comment}>{person.comment}</p>
            <div style={styles.stars}>
              {"â˜…".repeat(person.stars)} {"â˜†".repeat(5 - person.stars)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "5px",
    height: "100%",
    width: "100%",
    overflowX: "auto",
    writingMode: "horizontal-tb",
    // removed duplicate -> justifyContent: "space-between",
    backgroundColor: "white",
    border: "none",
  },
  ratingItem: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    width: "100%",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    // removed duplicate -> justifyContent: "center",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
  },
  comment: {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  },
  stars: {
    fontSize: "14px",
    color: "#f39c12",
  },
};

export default Part13;



