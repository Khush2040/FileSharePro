import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadFile, getFiles, deleteFile, getAllSystemFiles, downloadFile, renameFile } from "../controllers/file.controller.js";

const router = express.Router();

// Upload
router.post("/upload", protect, upload.single("file"), uploadFile);

// Get all files
router.get("/", protect, getFiles);

// Get ALL files globally (Admin route)
router.get("/admin/all", protect, getAllSystemFiles);

// Delete file by ID
router.delete("/:id", protect, deleteFile);

// Rename file
router.put("/:id", protect, renameFile);

// Download file
router.get("/download/:id", protect, downloadFile);
// Admin download file
router.get("/admin/download/:id", protect, downloadFile);

export default router;