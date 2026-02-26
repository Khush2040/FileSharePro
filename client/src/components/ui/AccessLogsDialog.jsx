import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Activity, Download, Eye, Link as LinkIcon, ShieldAlert } from "lucide-react";

export default function AccessLogsDialog({ file, children }) {
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (open && file) {
            // Mock generating access logs for the file
            setLogs([
                { id: 1, action: "Downloaded via Share Link", user: "Anonymous (IP: 192.168.1.45)", time: "10 mins ago", type: "download", icon: <Download size={14} className="text-blue-400" /> },
                { id: 2, action: "Viewed Preview", user: "Sarah Smith", time: "2 hours ago", type: "view", icon: <Eye size={14} className="text-emerald-400" /> },
                { id: 3, action: "Share Link Generated", user: "You", time: "1 day ago", type: "share", icon: <LinkIcon size={14} className="text-primary" /> },
                { id: 4, action: "Failed Access Attempt", user: "Unknown (IP: 203.0.113.0)", time: "2 days ago", type: "alert", icon: <ShieldAlert size={14} className="text-destructive" /> },
            ]);
        }
    }, [open, file]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button variant="outline" size="sm">Logs</Button>}
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md border-white/10 shadow-2xl backdrop-blur-2xl bg-background/90 dark:bg-black/80">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
                        <Activity size={20} className="text-primary" /> Access Logs
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Recent activity and security events for <span className="text-foreground font-semibold">{file?.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {logs.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-4">No access logs found.</p>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-black/20 dark:bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                                <div className="p-2 bg-background rounded-full border border-white/10 shadow-sm mt-0.5">
                                    {log.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground/90">{log.action}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{log.user}</p>
                                </div>
                                <span className="ml-auto text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider whitespace-nowrap pt-1">
                                    {log.time}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
