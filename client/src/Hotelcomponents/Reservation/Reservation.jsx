import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useValue } from "../../Middleware/context/ContextProvider";
import StripePaymentForm from "../Payment/StripePaymentForm";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./Reservation.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const ReservationForm = () => {
  const { state } = useValue();
  const navigate = useNavigate();
  const location = useLocation();
  const datePickerRef = useRef(null);

  const [formData, setFormData] = useState({
    roomId: "",
    userId: "",
    hotelId: "",
    email: "",
    price: "",
  });

  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [payNow, setPayNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCalendar, setIsModalOpenCalendar] = useState(false);

  const toggleCalendar = () => {
    setIsModalOpenCalendar((prevState) => !prevState);
  };

  useEffect(() => {
    const storedReservationData = sessionStorage.getItem("reservationData");
    const userIdFromSession = sessionStorage.getItem("userId");

    if (!userIdFromSession) {
      alert("You must be logged in to make a reservation.");
      navigate("/RegisterLogin", { state: { from: location } });
      return;
    }

    if (storedReservationData) {
      const parsedData = JSON.parse(storedReservationData);
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
        userId: userIdFromSession,
      }));
    }

    const searchParams = new URLSearchParams(location.search);
    const hotelIdFromUrl = searchParams.get("hotelId");

    if (hotelIdFromUrl) {
      setFormData((prev) => ({
        ...prev,
        hotelId: hotelIdFromUrl,
      }));
    }
  }, [state.user, location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsModalOpenCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

 
    if (!selectedRange.from || !selectedRange.to) {
      setError("Please select a valid date range.");
      setLoading(false);
      return;
    }

    const formatDate = (date) =>
      `${date.year}-${String(date.month).padStart(2, "0")}-${String(
        date.day
      ).padStart(2, "0")}`;

    try {
      const response = await axios.post(
        "https://travel-site-sa34.onrender.com/api/reservations",
        {
          ...formData,
          startDate: formatDate(selectedRange.from),
          endDate: formatDate(selectedRange.to),
        }
      );

      setReservation(response.data);
      if (payNow) {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the reservation."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    alert("Payment Successful");
    setReservation((prev) => ({
      ...prev,
      isPaid: true,
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="reservation-form-container">
      <h2 className="reservation-adds">Create a Reservation</h2>
      {!reservation ? (
        <form onSubmit={handleSubmit} className="styled-form">
          <label>Select Date Range:</label>
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaCalendarAlt
              size={24}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={toggleCalendar}
            />

            {isModalOpenCalendar && (
              <div
                ref={datePickerRef}
                style={{ position: "absolute", zIndex: 1000 }}
                className="Calendar"
              >
                <Calendar
                  value={selectedRange}
                  onChange={setSelectedRange}
                  colorPrimary="#007bff"
                  shouldHighlightWeekends
                  calendarClassName="custom-calendar"
                  minimumDate={{
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                    day: new Date().getDate(),
                  }}
                />
              </div>
            )}
          </div>

          {selectedRange.from && selectedRange.to && (
            <p>
              <strong>Selected Dates:</strong>{" "}
              {`${selectedRange.from.day}/${selectedRange.from.month}/${selectedRange.from.year}`}{" "}
              →{" "}
              {`${selectedRange.to.day}/${selectedRange.to.month}/${selectedRange.to.year}`}
            </p>
          )}

          <p>
            <strong>Price:</strong> ${formData.price}
          </p>

          <div>
            <h3 className=" Pay_Nowh3">
              Pay Now
              <label className="Pay-Now1">
                <input
                  type="checkbox"
                  checked={payNow}
                  onChange={(e) => setPayNow(e.target.checked)}
                />

              </label>
            </h3>
          </div>

          <button className="nav-buttontable" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Reservation"}
          </button>
        </form>
      ) : (
        <div className="styled-form">
          <h3>Reservation Details</h3>
          <p>Reservation ID: {reservation._id}</p>
          <p>Room Number: {reservation.roomnumber}</p>
          <p>User ID: {reservation.userId}</p>
          <p>
            Start Date: {new Date(reservation.startDate).toLocaleDateString()}
          </p>
          <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
          <p>Status: {reservation.status}</p>
          <p>Payment Status: {reservation.isPaid ? "Paid" : "Not Paid"}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        <h2>Payment</h2>
        <StripePaymentForm
          reservationId={reservation?._id}
          onPaymentSuccess={handlePaymentSuccess}
        />
        <button
          onClick={() => setIsModalOpen(false)}
          style={{ marginTop: "10px" }}
        >
          Close
        </button>
      </Modal>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ReservationForm;