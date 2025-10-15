import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  HotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

