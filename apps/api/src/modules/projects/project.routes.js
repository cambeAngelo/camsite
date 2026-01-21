import { Router } from "express";
import { getProjects, getMyProjects, createNewProject, updateExistingProject, deleteExistingProject } from "./project.controller.js";
import { protect, optional } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/portfolio/:portfolioId", optional, getProjects);
router.get("/my-projects", protect, getMyProjects);
router.post("/", protect, createNewProject);
router.put("/:projectId", protect, updateExistingProject);
router.delete("/:projectId", protect, deleteExistingProject);

export default router;
