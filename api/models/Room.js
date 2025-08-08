import mongoose from 'mongoose';


const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: [Number],
    required: true,
    unique: true 
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;