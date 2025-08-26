import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import applicationrouter from './routes/application.route.js'
import userrouter from './routes/user.route.js'
import jobrouter from './routes/job.route.js'
import fileUpload from "express-fileupload";
import fs from 'fs';
import { newsLetterCron } from './automation/newsLetterCorns.js';
console.log("CWD:", process.cwd());
console.log(".env exists:", fs.existsSync('.env')); 
console.log("fileUpload:", fileUpload);

dotenv.config();
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 
    "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"],
}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use('/api',userrouter)
app.use('/api',jobrouter)
app.use('/api',applicationrouter)
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statuscode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error('Error:', err);
  // Close server & exit process
  process.exit(1);
});

newsLetterCron();

const mongoUrl = process.env.MONGO_URL;
const dbName = "Job_Portal_Automation";

mongoose.connect(mongoUrl, {
  dbName: dbName
})
.then(() => console.log(`MongoDB connected: ${dbName}`)) // ✅ fixed undefined variable
.catch((err) => console.error("MongoDB connection failed:", err));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
