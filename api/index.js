import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mailRouter from './routes/mailTest.js';
import { startServer } from './database.js';

import authRoutes from './routes/Auth.js';
import hotelRoutes from './routes/Hotel.js';
import roomRoutes from './routes/Room.js';
import reservationRoutes from './routes/Reservation.js';
import paymentRoutes from './routes/payment.js';

const app = express();

// پوشه آپلود
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || '')
.split(",")
  .map(s => s.trim())
  .filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (!allowedOrigins.length || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// فایل‌های استاتیک uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// روت‌ها
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotels', roomRoutes);          // rooms زیرمجموعه hotels
app.use('/api/reservations', reservationRoutes);
app.use('/api/payment', paymentRoutes);

// health
app.get('/health', (_, res) => res.json({ ok: true }));

// استارت
startServer(app);

app.use('/api/mail', mailRouter);
