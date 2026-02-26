import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { UploadCloud, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      toast.success("File uploaded successfully");
      if (onUpload) onUpload(res.data);
      setFile(null);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Upload failed. It might be too large or not allowed.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  }

  const onDragLeave = () => setIsDragOver(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl flex flex-col h-full relative overflow-hidden group">

      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-bold font-heading flex items-center gap-2 text-foreground">
          Quick Upload
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>

      <div
        className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 relative z-10 ${isDragOver
          ? "border-primary bg-primary/10 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]"
          : file ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 hover:border-primary/30 hover:bg-white/5"
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {!file ? (
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
              <UploadCloud size={28} className="text-primary text-glow" />
            </div>
            <p className="font-semibold text-foreground mb-1">Click to upload or drag & drop</p>
            <p className="text-xs text-muted-foreground w-3/4 mx-auto mt-2">Max 50MB. Secure upload active.</p>
            <p className="text-[10px] text-muted-foreground/60 w-3/4 mx-auto mt-1 uppercase tracking-widest font-bold">No scripts or executables</p>
          </label>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <button
              onClick={(e) => { e.preventDefault(); setFile(null); }}
              className="absolute top-0 right-0 p-1 bg-destructive/20 text-destructive rounded-full hover:bg-destructive hover:text-white transition-colors cursor-pointer"
              title="Remove file"
            >
              <X size={14} />
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
              <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <p className="font-semibold text-emerald-400 text-sm truncate max-w-[200px]">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full mt-6 relative z-10 font-semibold py-6 rounded-xl transition-all duration-300 ${file && !loading
          ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] border-0 text-white"
          : ""
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Uploading...
          </span>
        ) : "Upload Now"}
      </Button>
    </div>
  );
}