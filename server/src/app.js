import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import passport from "./config/passport.js";

// Security Middleware
import helmet from "helmet";
import rateLimit from "express-rate-limit";
const app = express();

app.use(cors());
app.use(express.json());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again in 15 minutes!"
});
app.use("/api", limiter);


app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "FileShare Pro API running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// Global Error Handler for Security (Hides stack traces, catches Multer errors)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  // Custom message for Multer size limit
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File is too large! Maximum allowed is 50MB." });
  }

  // Handle expected operational errors
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred.",
    // Ensure we don't leak stack traces in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export default app;