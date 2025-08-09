// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ConnectDb from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import listingRouter from './routes/listingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // ✅ Corrected upload route
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Support for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express app
const app = express(); // ✅ Initialization before usage

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:5173', // Local dev
    'https://real-estate-frontend-phi-six.vercel.app' // Vercel production
  ],
  credentials: true
}));


// Middleware to parse JSON
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// ✅ Serve uploaded files from "upload" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
ConnectDb();

// ✅ Define API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);
app.use('/api/upload', uploadRoutes); 


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
