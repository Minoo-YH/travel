// api/database.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// گزینه‌های مشترک اتصال
const opts = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
};

// از MONGO_URL فعلی (که شبیه .../travel?retryWrites=true&w=majority&appName=Cluster0 هست)
// بخش دیتابیس و کوئری را جدا می‌کنیم تا بتوانیم DB های دیگر را بدون خراب کردن query string بسازیم
const [baseWithDb, query = ""] = (process.env.MONGO_URL || "").split("?");
const queryStr = query ? `?${query}` : "";

// baseWithDb مثل "...mongodb.net/travel" است. نام DB پایانی را حذف می‌کنیم:
const baseWithoutDb = baseWithDb.replace(/\/[^/]+$/, "");

/** ساخت URI برای نام دیتابیس دلخواه با حفظ پارامترهای query */
const uriFor = (dbName) => `${baseWithoutDb}/${dbName}${queryStr}`;

const connectDatabases = async () => {
  try {
    // به هیچ وجه `${process.env.MONGO_URL}/rooms` نزن! چون query خراب می‌شود.
    const roomsDB       = mongoose.createConnection(uriFor("rooms"), opts);
    const authDB        = mongoose.createConnection(uriFor("user"), opts);
    const hotelDB       = mongoose.createConnection(uriFor("hotels"), opts);
    const reservationDB = mongoose.createConnection(uriFor("reservations"), opts);

    console.log("Connected to Rooms, Auth, Hotel, Reservation databases");
    return { roomsDB, authDB, hotelDB, reservationDB };
  } catch (error) {
    console.error("Failed to connect to MongoDB databases:", error);
    throw error;
  }
};

const port = Number(process.env.PORT || 5000);

export const startServer = async (app) => {
  try {
    // اتصال اصلی به DB پایه‌ای که در MONGO_URL ست شده (مثلا travel)
    await mongoose.connect(process.env.MONGO_URL, opts);
    console.log("Connected to Main MongoDB");

    await connectDatabases();

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on  http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};


