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

// إنشاء مجلد "uploads" إذا لم يكن موجوداً
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://travel-site-1-isyq.onrender.com"],

  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get the current directory in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files for uploads
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
