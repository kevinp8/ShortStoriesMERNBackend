import express from "express";
import auth from "../controllers/authController.js";
const router = express.Router();

// /auth/register
router.post("/register", auth.register);

// /auth/login
router.post("/login", auth.login);

export default router;
