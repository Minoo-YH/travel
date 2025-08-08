import express from 'express';
import { createReservation,  GetReservation,deleteReservation,GetReservationForUser,checkReservations   } from '../controllers/Reservation.js';

const router = express.Router();

router.post('/', createReservation);

router.get('/all', GetReservation);
router.get('/user/:userId', GetReservationForUser);
router.get('', checkReservations);
router.delete('/:id', deleteReservation);

export default router;