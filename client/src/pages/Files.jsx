import { useState, useEffect } from "react";
import FileTable from "../components/dashboard/FileTable";
import UploadDialog from "../components/ui/UploadDialog";
import axios from "axios";
import { Search, Filter, Grid, List } from "lucide-react";
import { motion } from "framer-motion";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("list");
  const [mode, setMode] = useState("personal");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const endpoint = mode === "admin" ? "http://localhost:5000/api/files/admin/all" : "http://localhost:5000/api/files";
    axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setFiles(res.data))
      .catch(console.error);
  }, [mode]);

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name?.toLowerCase().includes(search.toLowerCase());
    const extensions = f.name?.split('.').pop().toLowerCase();

    if (category === "Images") return matchesSearch && ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(extensions);
    if (category === "Documents") return matchesSearch && ["pdf", "doc", "docx", "txt", "xlsx", "csv"].includes(extensions);
    if (category === "Media") return matchesSearch && ["mp4", "mp3", "wav", "avi", "mov"].includes(extensions);
    return matchesSearch;
  });

  const handleUpload = (file) => setFiles(prev => [file, ...prev]);
  const handleDelete = async (fileId) => {
    try {
      if (mode === "personal") {
        await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFiles(prev => prev.filter(f => f._id !== fileId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRename = async (fileId, newName) => {
    try {
      if (mode === "personal") {
        const res = await axios.put(`http://localhost:5000/api/files/${fileId}`, { name: newName }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFiles(prev => prev.map(f => f._id === fileId ? { ...f, originalName: res.data.name, name: res.data.name } : f));
      } else {
        setFiles(prev => prev.map(f => f._id === fileId ? { ...f, name: newName } : f));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (file) => {
    try {
      const endpoint = mode === "admin"
        ? `http://localhost:5000/api/files/admin/download/${file._id}`
        : `http://localhost:5000/api/files/download/${file._id}`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name || file.originalName || 'downloaded_file');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 h-full flex flex-col relative z-10 w-full">

      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient">Files</h1>
          <p className="text-muted-foreground font-medium">Manage and organize all your uploaded files.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setMode(mode === "personal" ? "admin" : "personal")}
            className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all ${mode === "admin"
              ? "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90"
              : "glass bg-background/50 hover:bg-background/80 border-white/10"
              }`}
          >
            {mode === "admin" ? "Exit Admin Mode" : "Admin Database View"}
          </button>
          <UploadDialog onUpload={handleUpload} />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="glass-card p-6 flex-1 flex flex-col rounded-2xl h-full border-white/5 relative overflow-hidden group/container">

        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative z-10">

          {/* Category Tabs */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto border border-black/5 dark:border-white/5">
            {["All", "Images", "Documents", "Media"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${category === cat
                  ? "bg-background text-primary shadow-md border border-black/5 dark:border-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full bg-white/5 border border-white/10 p-2 pl-9 rounded-xl focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground text-sm font-medium"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* View Toggles */}
            <div className="hidden sm:flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5">
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-background text-primary shadow-[0_0_10px_rgba(168,85,247,0.15)] border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-background text-primary shadow-[0_0_10px_rgba(168,85,247,0.15)] border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Files Table */}
        <div className="flex-1 overflow-auto bg-transparent relative z-10">
          <FileTable files={filteredFiles} onDelete={handleDelete} onDownload={handleDownload} onRename={handleRename} view={view} />
        </div>

      </motion.div>
    </motion.div>
  );
}