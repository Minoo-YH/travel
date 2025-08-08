
import express from 'express';
import upload from "../Middleware/upload.js";
import { createRoom, getHotelRooms, getRooms, UpdateRooms, DeleteRoom } from "../controllers/Room.js";

const router = express.Router();




//GET
router.get('/:hotelId/rooms', getHotelRooms);
router.get('/:hotelId/rooms/:roomid', getRooms);

//PUT
router.put('/:hotelId/rooms/:roomid', UpdateRooms);

//POST
router.post('/:hotelId/rooms', upload.array('images', 10), createRoom);


//DELETE
router.delete('/:hotelId/rooms/:roomid', DeleteRoom);




export default router;