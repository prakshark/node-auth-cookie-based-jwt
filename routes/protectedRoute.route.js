import express from "express";
import { r1Controller } from "../controllers/protectedRoute.controller.js";

const router = express.Router();

router.get("/r1", r1Controller);

export default router;