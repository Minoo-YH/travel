import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  HotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
  },
  isPaid: { 
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);
