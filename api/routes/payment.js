import express from "express";
import { processPayment } from '../controllers/PaymentIntent.js';

const router = express.Router();

router.post("/",processPayment );

export default router;