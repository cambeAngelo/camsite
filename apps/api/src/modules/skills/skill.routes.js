import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import * as skillController from "./skill.controller.js";

const router = Router();

// All skill routes require authentication
router.use(protect);

// GET /api/skills - Get my skills
router.get("/", skillController.getMySkills);

// POST /api/skills - Create new skill
router.post("/", skillController.createSkill);

// PUT /api/skills/:skillId - Update skill
router.put("/:skillId", skillController.updateSkill);

// DELETE /api/skills/:skillId - Delete skill
router.delete("/:skillId", skillController.deleteSkill);

export default router;
