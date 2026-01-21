import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import * as experienceController from "./experience.controller.js";

const router = Router();

// All experience routes require authentication
router.use(protect);

// GET /api/experiences - Get my experiences
router.get("/", experienceController.getMyExperiences);

// POST /api/experiences - Create new experience
router.post("/", experienceController.createExperience);

// PUT /api/experiences/:experienceId - Update experience
router.put("/:experienceId", experienceController.updateExperience);

// DELETE /api/experiences/:experienceId - Delete experience
router.delete("/:experienceId", experienceController.deleteExperience);

export default router;
