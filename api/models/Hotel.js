import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },                   // hotel, apartment, ...
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String },
  title: { type: String },
  desc: { type: String },
  cheapestPrice: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
  featured: { type: Boolean, default: false },
  photos: [{ type: String }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
}, { timestamps: true });

export default mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
