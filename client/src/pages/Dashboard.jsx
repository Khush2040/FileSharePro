import { useEffect, useState } from "react";
import axios from "../api/axios";

import StatsCard from "../components/dashboard/StatsCard";
import FileTable from "../components/dashboard/FileTable";
import RecentFiles from "../components/dashboard/RecentFiles";
import FileUpload from "../components/FileUpload";
import Chart from "../components/dashboard/Chart";
import StorageUsage from "../components/dashboard/StorageUsage";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityFeed from "../components/dashboard/ActivityFeed";

import {
  FileText,
  HardDrive,
  ArrowUp,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch files and analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesRes, analyticsRes] = await Promise.all([
          axios.get("/files"),
          axios.get("/analytics/dashboard")
        ]);
        setFiles(filesRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpload = (uploadedFile) => {
    console.log("Uploaded:", uploadedFile);
    setFiles((prev) => [uploadedFile, ...prev]);
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`/files/${fileId}`);
      setFiles((prev) => prev.filter((f) => f._id !== fileId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRename = async (fileId, newName) => {
    try {
      const res = await axios.put(`/files/${fileId}`, { name: newName });
      setFiles((prev) => prev.map((f) => f._id === fileId ? { ...f, originalName: res.data.name, name: res.data.name } : f));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(`/files/download/${file._id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name || file.originalName || 'downloaded_file');
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 relative z-10 w-full"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient">Dashboard</h1>
        <p className="text-muted-foreground font-medium">Overview of your file storage and activity.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Files" value={analytics?.totalFiles || 0} trend={`${analytics?.advanced?.growthRate?.toFixed(1) || 0}% this month`} icon={<FileText size={24} />} />
        <StatsCard title="Storage Used" value={formatBytes(analytics?.totalStorage || 0)} trend={`Predicted (30d): ${formatBytes(analytics?.advanced?.predictedStorage30Days || 0)}`} icon={<HardDrive size={24} />} />
        <StatsCard title="Uploads Today" value={analytics?.uploadsByDay?.slice(-1)[0]?.count || 0} trend="Daily Avg" icon={<ArrowUp size={24} />} />
        <StatsCard title="Activity Score" value={`${analytics?.advanced?.activityScore || 0}/100`} trend="Based on volume" icon={<Activity size={24} />} />
      </motion.div>

      <motion.div variants={itemVariants} className="w-full">
        <QuickActions />
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-4">
        {/* Chart takes up 2 columns */}
        <div className="lg:col-span-2 relative min-h-[300px]">
          <Chart data={analytics?.uploadsByDay} growthRate={analytics?.advanced?.growthRate} />
        </div>

        {/* Storage Usage card */}
        <div className="lg:col-span-1 h-full">
          <StorageUsage distribution={analytics?.advanced?.fileTypeDistribution} totalUsed={analytics?.totalStorage} />
        </div>

        {/* Activity Feed card */}
        <div className="lg:col-span-1 h-full">
          <ActivityFeed recentActivities={analytics?.recentActivities} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-4">
        {/* Recent files and upload stack in 1 column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="h-full">
            <FileUpload onUpload={handleUpload} />
          </div>
          <div className="h-full">
            <RecentFiles
              files={files.slice(0, 5)}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* All files takes remaining 3 columns */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <div className="glass-card rounded-2xl p-6 h-full flex flex-col shadow-xl border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
              File Management
            </h2>
            <div className="flex-1 overflow-auto rounded-xl relative z-10">
              <FileTable
                files={files}
                loading={loading}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onRename={handleRename}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}