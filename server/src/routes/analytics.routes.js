import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getDashboardAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardAnalytics);

export default router;