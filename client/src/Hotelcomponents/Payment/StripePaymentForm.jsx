import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./stripePaymentForm.css"; 

const StripePaymentForm = ({
  reservationId,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [additionalPrice, setAdditionalPrice] = useState(0);

  useEffect(() => {
    const reservationData = JSON.parse(sessionStorage.getItem("reservationData")) || {};
    const addsData = JSON.parse(sessionStorage.getItem("addsData")) || {};

    const roomPrice = parseFloat(reservationData.price) || 0;
    setAmount(roomPrice);

    const additionalPrice =
      (addsData.wifiPrice || 0) +
      (addsData.parkingPrice || 0) +
      (addsData.roomServicePrice || 0) +
      (addsData.breakfastPrice || 0);

    setAdditionalPrice(additionalPrice);
    setTotalPrice(roomPrice + additionalPrice);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe is not ready yet.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("https://travel-site-sa34.onrender.com/api/payment", {
        amount: totalPrice * 100,
        email,
        reservationId,
      });

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { email },
          },
        }
      );

      if (error) {
        onPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      setMessage(`An unexpected error occurred: ${error.message}`);
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Stripe Payment Form</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount (USD):</label>
          <p>{amount.toFixed(2)}</p>
        </div>
        <div className="form-group">
          <label>Additional Charges (USD):</label>
          <p>{additionalPrice.toFixed(2)}</p>
        </div>
        <div className="form-group">
          <label>Total Price (USD):</label>
          <p>{totalPrice.toFixed(2)}</p>
        </div>
        <div className="form-group">
          <label htmlFor="card-element">Card Details</label>
          <CardElement id="card-element" />
        </div>
        <button type="submit" disabled={loading || !stripe} className="pay-button">
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default StripePaymentForm;
