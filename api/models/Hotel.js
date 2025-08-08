import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  phoneNumber: {
    type: Number,
  },
  country: {
    type: String,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number, 
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Hotel = mongoose.model("Hotel", HotelSchema);

export default Hotel;
