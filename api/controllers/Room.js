import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { title, details, price, roomNumber } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newRoom = new Room({
      title,
      details,
      img: images,
      price,
      roomNumber,
      hotel: req.params.hotelId,
    });

    await newRoom.save();

    res.status(201).json({
      message: "Room added successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    res
      .status(500)
      .json({ message: "Failed to add room", error: error.message });
  }
};

export const getHotelRooms = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    const rooms = await Room.find({ hotel: hotelId });
    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found for this hotel" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching hotel rooms:", error);
    res.status(500).json({ message: "Error fetching hotel rooms" });
  }
};

export const getRooms = async (req, res) => {
  const { hotelId, roomid } = req.params;
  try {
    const room = await Room.findOne({ hotel: hotelId, _id: roomid });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const UpdateRooms = async (req, res) => {
  const { roomid } = req.params;
  const updatedData = req.body;

  try {
    const sanitizedRoomId = roomid.trim();

    const room = await Room.findByIdAndUpdate(sanitizedRoomId, updatedData, {
      new: true,
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Error updating room" });
  }
};

export const DeleteRoom = async (req, res) => {
  const { roomid } = req.params;

  try {
    const sanitizedRoomId = roomid.trim();
    console.log("Deleting room with ID:", sanitizedRoomId);

    const room = await Room.findByIdAndDelete(sanitizedRoomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room" });
  }
};
