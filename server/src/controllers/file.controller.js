import File from "../models/File.model.js";
import Activity from "../models/Activity.model.js";
import path from "path";
import fs from "fs";

// ---------------------------
// Upload a file
// ---------------------------
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save file to MongoDB
    const file = await File.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size, // store original size in bytes
      mimeType: req.file.mimetype,
      status: "Uploaded",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Log activity
    await Activity.create({
      userId: req.user._id,
      fileId: file._id,
      action: "upload",
      timestamp: new Date(),
    });

    // Return full file info to frontend for table
    res.status(201).json({
      _id: file._id,
      name: file.originalName,
      type: file.mimeType.split("/")[1].toUpperCase(),
      size: Math.round(file.size / 1024), // convert bytes → KB
      status: file.status,
      createdAt: file.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// ---------------------------
// Get all files for a user
// ---------------------------
export const getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("_id originalName mimeType size status createdAt"); // only return required fields

    // Format files for frontend
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      name: file.originalName,
      type: file.mimeType.split("/")[1].toUpperCase(),
      size: Math.round(file.size / 1024),
      status: file.status,
      createdAt: file.createdAt,
    }));

    res.json(formattedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch files", error: error.message });
  }
};

// ---------------------------
// Get all system files (Admin/Global View)
// ---------------------------
export const getAllSystemFiles = async (req, res) => {
  try {
    // This fetches EVERY file in the database regardless of the user
    const files = await File.find({})
      .sort({ createdAt: -1 })
      .select("_id originalName mimeType size status createdAt userId");

    const formattedFiles = files.map((file) => ({
      _id: file._id,
      name: file.originalName,
      type: file.mimeType.split("/")[1].toUpperCase(),
      size: Math.round(file.size / 1024),
      status: file.status,
      createdAt: file.createdAt,
      ownerId: file.userId
    }));

    res.json(formattedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch system files", error: error.message });
  }
};

// ---------------------------
// Delete a file
// ---------------------------
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file || file.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete from MongoDB
    await file.deleteOne();

    // Log activity
    await Activity.create({
      userId: req.user._id,
      fileId: file._id,
      action: "delete",
      timestamp: new Date(),
    });

    res.json({ message: "File deleted successfully", _id: file._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// ---------------------------
// Download a file
// ---------------------------
export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    // If using admin route, you might want to skip user verification, 
    // but for personal route, ensure user owns the file
    if (!file || (file.userId.toString() !== req.user._id.toString() && !req.originalUrl.includes('/admin/'))) {
      return res.status(404).json({ message: "File not found or unauthorized" });
    }

    const filePath = path.resolve("uploads", file.storedName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    // Log activity
    await Activity.create({
      userId: req.user._id,
      fileId: file._id,
      action: "download",
      timestamp: new Date(),
    });

    res.download(filePath, file.originalName, (err) => {
      if (err) {
        console.error("Download Error:", err);
        // Don't send res.status if headers are already sent
        if (!res.headersSent) {
          res.status(500).json({ message: "Error downloading file", error: err.message });
        }
      }
    });

  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Download failed", error: error.message });
    }
  }
};

// ---------------------------
// Rename a file
// ---------------------------
export const renameFile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "New name is required" });

    const file = await File.findById(req.params.id);

    if (!file || file.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "File not found" });
    }

    file.originalName = name;
    await file.save();

    // Log the activity
    await Activity.create({
      userId: req.user._id,
      fileId: file._id,
      action: "rename",
      timestamp: new Date(),
    });

    res.json({
      _id: file._id,
      name: file.originalName,
      type: file.mimeType,
      size: file.size,
      status: file.status,
      createdAt: file.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rename failed", error: error.message });
  }
};