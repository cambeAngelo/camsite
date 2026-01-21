import { Router } from "express";
import { register, login, getProfile, updateProfile } from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
