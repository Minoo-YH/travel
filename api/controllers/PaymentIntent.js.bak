import Stripe from "stripe";
import Reservation from "../models/Reservation.js";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe("sk_test_51QFvkhLAzYW8YRzj0TEpJ9Y1OOQJCYy7K7JvOaplWmDZpI1UcUX3V5mxA37NOrTpXHk96gT6VkaYR91HHBKfnHYZ002HzPfgrG");


export const processPayment = async (req, res) => {
  const { amount, email, reservationId } = req.body;

  if (!amount || !email || !reservationId) {
    return res.status(400).send({ error: "Amount, email, and reservationId are required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      receipt_email: email,
    });

    
    await Reservation.findByIdAndUpdate(reservationId, { isPaid: true });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).send({ error: error.message });
  }
};
