import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { startServer } from "./database.js";
import roomRoutes from "./routes/Room.js";
import authRoutes from "./routes/Auth.js";
import hotelRoutes from "./routes/Hotel.js";
import reservationRoutes from "./routes/Reservation.js";
import GetUsers from "./routes/Auth.js";
import processPayment from "./routes/payment.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://travel-site-1-isyq.onrender.com", 
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use((req, res, next) => {
  // بعد إرسال الرد نطبع الهيدرز
  const originalSend = res.send;
  res.send = function (...args) {
    console.log("=== Response Headers ===");
    console.log("Access-Control-Allow-Origin:", res.getHeader("Access-Control-Allow-Origin"));
    console.log("Access-Control-Allow-Credentials:", res.getHeader("Access-Control-Allow-Credentials"));
    console.log("========================");
    originalSend.apply(res, args);
  };
  next();
});










// Get current directory for static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", GetUsers);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payment", processPayment);

// Start Server
startServer(app);
