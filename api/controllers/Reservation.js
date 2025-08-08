import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";



export const createReservation = async (req, res) => {
  const { roomId, userId, startDate, endDate, hotelId } = req.body;

  try {
 
    if (!hotelId || !roomId || !userId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

 
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj >= endDateObj) {
      return res.status(400).json({ message: "End date must be after start date." });
    }

    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

   
    const existingReservations = await Reservation.find({
      roomId,
      $or: [
        { startDate: { $lte: endDateObj, $gte: startDateObj } },
        { endDate: { $gte: startDateObj, $lte: endDateObj } }
      ]
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ message: "Room is already booked for the selected dates." });
    }


    const newReservation = new Reservation({
      HotelId: hotelId,
      roomId,
      userId,
      startDate: startDateObj,
      endDate: endDateObj,
      isPaid: false
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation", error: error.message });
  }
};

export const checkReservations = async (req, res) => {
  const { hotelId, roomId, startDate, endDate } = req.body;

  try {
 
    if (!hotelId || !roomId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj >= endDateObj) {
      return res.status(400).json({ message: "End date must be after start date." });
    }
      
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
  
    const existingReservations = await Reservation.find({
      roomId,
      $or: [
        { startDate: { $lte: endDateObj, $gte: startDateObj } },
        { endDate: { $gte: startDateObj, $lte: endDateObj } }
      ]
    });
  
    if (existingReservations.length > 0) {
      return res.json({ booked : true });
    }

  }
  catch(error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation", error: error.message });
  }
}

export const GetReservation = async (req, res, next) => {
  try {
    const { HotelId, roomId, userId, startDate, endDate, status } = req.query;

    const start = startDate ? new Date(parseInt(startDate)) : null;
    const end = endDate ? new Date(parseInt(endDate)) : null;

    const filter = {};
    if (HotelId) filter.HotelId = HotelId;
    if (roomId) filter.roomId = roomId;
    if (userId) filter.userId = userId;
    if (start) filter.startDate = { $gte: start };
    if (end) filter.endDate = { $lte: end };
    if (status) filter.status = status;
    

    const reservations = await Reservation.find(filter).limit(Number(req.query.limit) || 0);

    console.log("Reservations fetched:", reservations);
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    next(err);
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params; 
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Reservation." });
  }
};


export const GetReservationForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.find({ userId })
      .populate('HotelId', 'name address')  
      .populate('roomId', 'roomType roomNumber')
      .exec();

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this user." });
    }

    console.log("User's Reservations:", reservations);
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations for user:", err);
    next(err);
  }
};
