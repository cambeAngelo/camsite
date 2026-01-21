import express from "express";
import { getRegisteredUsers, getUserStats } from "./admin.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";


const router = express.Router();

// Middleware to check if user is admin
const checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        message: "Access denied. Admin only.",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};

router.get("/users", protect, checkAdmin, getRegisteredUsers);
router.get("/stats", protect, checkAdmin, getUserStats);
export default router;
