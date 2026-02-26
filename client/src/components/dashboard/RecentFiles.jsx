import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function RecentFiles({ files = [], onDelete }) {
  const displayFiles = files.length > 0 ? files : [
    { _id: '1', name: "invoice-2024.pdf", size: "420 KB", status: "Uploaded" },
    { _id: '2', name: "design-assets.zip", size: "1.2 MB", status: "Uploaded" },
    { _id: '3', name: "marketing-video.mp4", size: "12.4 MB", status: "Processing" },
    { _id: '4', name: "q4-financials.xlsx", size: "3.1 MB", status: "Uploaded" },
  ];

  return (
    <Card className="glass-card p-0 flex flex-col h-full overflow-hidden relative">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          Recent Files
        </h3>
        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-1">
        {displayFiles.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors text-muted-foreground group-hover:text-primary">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{file.name || file.originalName || "Unnamed File"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{file.size || "Unknown Size"}</p>
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border hidden sm:block ${file.status === 'Uploaded'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
              : file.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
              }`}>
              {file.status || "Uploaded"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}