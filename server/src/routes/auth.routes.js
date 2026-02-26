import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Initiate Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login?error=auth_failed" }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        // Send token and username back to client via redirect query
        const userName = encodeURIComponent(req.user.name || "User");
        res.redirect(`http://localhost:5173/login?token=${token}&userName=${userName}`);
    }
);

export default router;