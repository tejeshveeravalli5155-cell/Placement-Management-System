import express from "express";
import {
  register,
  login,
  getMe,
  changePassword,
} from "../controllers/authControllers.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// ======================
// Public Routes
// ======================

// Student registration
router.post("/register", register);

// Login
router.post("/login", login);

// ======================
// Protected Routes
// ======================

// Get current logged-in user
router.get("/me", requireAuth, getMe);

// Change password
router.put("/change-password", requireAuth, changePassword);

export default router;
