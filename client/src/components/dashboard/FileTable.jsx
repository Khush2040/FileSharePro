import { Button } from "../ui/button";
import { File, Download, Trash2, FolderSearch, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileTable({ files, onDelete, onDownload, onRename, view = "list" }) {
  const statusColor = (status) =>
    status === "Uploaded" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
      : status === "Failed" ? "text-destructive bg-destructive/10 border-destructive/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
        : "text-primary bg-primary/10 border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]";

  if (!files || files.length === 0) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center rounded-2xl h-full">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-muted-foreground group-hover:scale-110 transition-transform">
          <FolderSearch size={32} />
        </div>
        <h3 className="text-xl font-semibold text-foreground tracking-tight">No files found</h3>
        <p className="text-muted-foreground mt-2 max-w-sm mb-6">You haven't uploaded any files yet, or none match your search criteria.</p>
        <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all">Upload your first file</Button>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  if (view === "grid") {
    return (
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <AnimatePresence>
          {files.map((f) => (
            <motion.div variants={item} initial="hidden" animate="show" exit="exit" layout key={f._id || f.name} className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                  <File size={24} className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-muted-foreground hover:text-foreground hover:scale-110 transition-all" onClick={() => onDownload && onDownload(f)}>
                    <Download size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-amber-500/10 text-muted-foreground hover:text-amber-400 hover:scale-110 transition-all" onClick={() => {
                    if (!onRename) return;
                    const newName = window.prompt("Enter new file name:", f.name || f.originalName);
                    if (newName) onRename(f._id, newName);
                  }}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive/80 hover:text-destructive hover:bg-destructive/10 hover:scale-110 transition-all" onClick={() => onDelete && onDelete(f._id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-semibold text-foreground truncate text-sm" title={f.name || f.originalName}>{f.name || f.originalName}</p>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90 origin-left border ${statusColor(f.status || "Uploaded")}`}>
                    {f.status || "Uploaded"}
                  </span>
                  <span className="text-muted-foreground font-medium">{f.size || "Unknown"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/5 relative z-10 w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="bg-[#09090b]/80 border-b border-white/5 backdrop-blur-md">
            <tr className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              <th className="py-4 px-6 w-1/3">Name</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Size</th>
              <th className="py-4 px-6 text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            <AnimatePresence>
              {files.map((f) => (
                <motion.tr variants={item} initial="hidden" animate="show" exit="exit" layout key={f._id || f.name} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
                        <File size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{f.name || f.originalName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">{f.type || "Document"}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${statusColor(f.status || "Uploaded")}`}>
                      {f.status || "Uploaded"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">{f.size || "Unknown"}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground hover:scale-110 transition-all" onClick={() => onDownload && onDownload(f)}>
                        <Download size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-amber-500/20 bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 hover:scale-110 transition-all" onClick={() => {
                        if (!onRename) return;
                        const newName = window.prompt("Enter new file name:", f.name || f.originalName);
                        if (newName) onRename(f._id, newName);
                      }}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white hover:scale-110 transition-all" onClick={() => onDelete && onDelete(f._id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}