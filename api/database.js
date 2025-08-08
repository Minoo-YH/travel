import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const connectDatabases = async () => {
  try {
    const roomsDB = mongoose.createConnection(`${process.env.MONGO_URL}/rooms`, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    const authDB = mongoose.createConnection(`${process.env.MONGO_URL}/user`, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    const hotelDB = mongoose.createConnection(`${process.env.MONGO_URL}/hotels`, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    const reservationDB = mongoose.createConnection(`${process.env.MONGO_URL}/reservations`, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });


    console.log("Connected to Rooms, Auth, and Hotelm, Reservation databases");
    return { roomsDB, authDB, hotelDB, reservationDB};
  } catch (error) {
    console.error("Failed to connect to MongoDB databases:", error);
    throw error;
  }
};


export const startServer = async (app) => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log("Connected to Main MongoDB");

    await connectDatabases();

    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
