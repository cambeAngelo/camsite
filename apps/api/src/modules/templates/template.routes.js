import { Router } from "express";
import * as templateController from "./template.controller.js";

const router = Router();

// GET /api/templates - Get all templates
router.get("/", templateController.getTemplates);

// GET /api/templates/:id - Get template by ID
router.get("/:id", templateController.getTemplate);

// GET /api/templates/slug/:slug - Get template by slug
router.get("/slug/:slug", templateController.getTemplateBySlug);

export default router;
