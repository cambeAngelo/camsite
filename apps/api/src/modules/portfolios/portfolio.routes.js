import { Router } from "express";
import { getPortfolio, getMyPortfolio, updateMyPortfolio } from "./portfolio.controller.js";
import { protect, optional } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/:slug", optional, getPortfolio);
router.get("/", protect, getMyPortfolio);
router.put("/", protect, updateMyPortfolio);

export default router;
