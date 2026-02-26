// components/ui/UploadDialog.jsx
import { useRef, useState } from "react";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import axios from "axios";

export default function UploadDialog({ onUpload, children }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      const token = localStorage.getItem("authToken");

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
      });
      if (onUpload) onUpload(res.data);
    }

    setUploading(false);
    setProgress(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button disabled={uploading}>Upload Files</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${uploading ? "bg-slate-50" : "border-gray-300"
            }`}
          onClick={() => inputRef.current.click()}
        >
          {uploading ? `Uploading ${progress}%` : "Drag & drop files or click to browse"}
        </div>
        <input type="file" multiple className="hidden" ref={inputRef} onChange={(e) => handleFiles(e.target.files)} />
      </DialogContent>
    </Dialog>
  );
}