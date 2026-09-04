import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import { requireAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Call Database Connection
connectDB();

// Public Routes
app.use("/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Placement Management System API is Running...");
});

// Protected Routes (require a valid JWT)
app.use("/students", requireAuth, studentRoutes);
app.use("/companies", requireAuth, companyRoutes);
app.use("/placements", requireAuth, placementRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Central error handler (catches anything thrown/forwarded via next(err))
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
});

const PORT = process.env.PORT || 8000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
