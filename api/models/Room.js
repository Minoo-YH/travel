import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  title: { type: String, required: true },        // مثلا Deluxe Room
  price: { type: Number, required: true },
  maxPeople: { type: Number, default: 1 },
  desc: { type: String },
  images: [{ type: String }],
  roomNumbers: [{
    number: Number,
    unavailableDates: [Date]
  }]
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model('Room', roomSchema);
