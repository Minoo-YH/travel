import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  try {
    const { rooms, ...hotelData } = req.body;
    const photos = req.files ? req.files.map((file) => file.path) : [];

    const newHotel = new Hotel({
      ...hotelData,
      photos: photos,
    });

    const savedHotel = await newHotel.save();

    res.status(200).json({ message: "Hotel added successfully", savedHotel });
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};


export const filterHotelsByCityAndPrice = async (req, res, next) => {

  const { city, maxPrice, rating } = req.query;

  if (!city || maxPrice === undefined) {
    return res.status(400).json({ message: "City and maxPrice are required." });
  }
  
  const cityCleaned = city.trim(); 
  const parsedMaxPrice = Number(maxPrice);
  if (isNaN(parsedMaxPrice)) {
    return res.status(400).json({ message: "Invalid maxPrice value." });
  }
  
  let parsedRating;
  if (rating !== undefined) {
    parsedRating = Number(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      return res.status(400).json({ message: "Invalid rating value. Rating must be between 0 and 5." });
    }
  }
  
  const query = {
    city: cityCleaned, 
    cheapestPrice: { $lte: parsedMaxPrice },
  };
  
  if (parsedRating !== undefined) {
    query.rating = { $gte: parsedRating };
  }
  
  const hotels = await Hotel.find(query);
  
  if (hotels.length === 0) {
    return res.status(404).json({ message: "No hotels found for the given filters." });
  }
  
  res.status(200).json(hotels);
  
}

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};




export const map = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }

    const trimmedQuery = query.trim().toLowerCase();

    const hotels = await Hotel.find({
      $or: [
        { city: { $regex: new RegExp(trimmedQuery, "i") } },
        { country: { $regex: new RegExp(trimmedQuery, "i") } },
      ],
    });

    if (hotels.length === 0) {
      return res
        .status(404)
        .json({ message: "No hotels found for the given search criteria." });
    }

    res.status(200).json(hotels);
  } catch (err) {
    console.error("Error fetching hotels:", err);
    next(err);
  }
};