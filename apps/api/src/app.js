import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

// Import routes
import authRoutes from "./modules/auth/auth.routes.js";
import portfolioRoutes from "./modules/portfolios/portfolio.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";
import templateRoutes from "./modules/templates/template.routes.js";
import skillRoutes from "./modules/skills/skill.routes.js";
import experienceRoutes from "./modules/experiences/experience.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/health", (req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  // API Routes
  const api = express.Router();
  api.use("/auth", authRoutes);
  api.use("/portfolios", portfolioRoutes);
  api.use("/projects", projectRoutes);
  api.use("/templates", templateRoutes);
  api.use("/skills", skillRoutes);
  api.use("/experiences", experienceRoutes);
  api.use("/admin", adminRoutes);

  app.use("/api", api);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
