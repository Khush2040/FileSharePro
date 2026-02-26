import File from "../models/File.model.js";
import Activity from "../models/Activity.model.js";
import mongoose from "mongoose";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Total files
    const totalFiles = await File.countDocuments({ userId });

    // Total storage used
    const storageAgg = await File.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalSize: { $sum: "$size" } } }
    ]);

    const totalStorage = storageAgg[0]?.totalSize || 0;

    // Uploads per day (last 7 days)
    const uploadsByDay = await File.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Recent activities
    const recentActivities = await Activity.find({ userId })
      .populate('fileId', 'originalName type')
      .sort({ createdAt: -1 })
      .limit(5);

    // Advanced Logic: File Type Distribution (Ranking)
    const fileTypeDistribution = await File.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $regexMatch: { input: "$mimeType", regex: /^image\// } }, then: "Image" },
                { case: { $regexMatch: { input: "$mimeType", regex: /^video\// } }, then: "Video" },
                { case: { $regexMatch: { input: "$mimeType", regex: /^audio\// } }, then: "Audio" },
                { case: { $regexMatch: { input: "$mimeType", regex: /pdf$/ } }, then: "Document" },
                { case: { $regexMatch: { input: "$mimeType", regex: /msword|officedocument/ } }, then: "Document" },
              ],
              default: "Other"
            }
          },
          count: { $sum: 1 },
          size: { $sum: "$size" }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Advanced Logic: Activity Score (Scoring based on activity volume)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activityCount30d = await Activity.countDocuments({
      userId,
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Simple scoring algorithm: 1 point per activity, max 100
    const activityScore = Math.min(Math.round((activityCount30d / 50) * 100), 100);

    // Advanced Logic: Storage Prediction (Linear prediction for next 30 days based on past 30 days)
    const uploads30d = await File.aggregate([
      { $match: { userId, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, addedSize: { $sum: "$size" } } }
    ]);

    const sizeAdded30d = uploads30d[0]?.addedSize || 0;
    // Predict storage usage in 30 days assuming same rate
    const predictedStorage30Days = totalStorage + sizeAdded30d;

    res.json({
      totalFiles,
      totalStorage,
      uploadsByDay,
      recentActivities,
      advanced: {
        fileTypeDistribution,
        activityScore,
        predictedStorage30Days,
        growthRate: sizeAdded30d > 0 ? (sizeAdded30d / (totalStorage || 1)) * 100 : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};