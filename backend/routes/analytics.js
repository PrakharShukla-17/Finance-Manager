import express from "express";
import { verifyToken } from "../middlewares/authentication.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", verifyToken, getAnalytics);

export default router;
