import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import axios from "@/api/axios";
import { useToast } from "@/components/ui/toast";

export default function UploadCard({ onUpload }) {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload?.(res.data);
      toast("File uploaded successfully ✅");
    } catch (err) {
      toast("Upload failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center border-dashed">
      <Upload className="mb-3 h-8 w-8 text-slate-400" />

      <p className="text-sm text-slate-500 mb-4">
        Drag & drop files here or click to upload
      </p>

      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={handleUpload}
      />

      <Button
        disabled={loading}
        onClick={() => fileRef.current.click()}
      >
        {loading ? "Uploading..." : "Upload File"}
      </Button>
    </Card>
  );
}