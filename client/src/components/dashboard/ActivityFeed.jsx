import { Activity, Download, Upload, Trash2, Edit } from "lucide-react";

export default function ActivityFeed({ recentActivities = [] }) {
    const defaultActivities = [
        { id: 1, type: "upload", user: "You", action: "uploaded", target: "Project_Proposal.pdf", time: "10 min ago", icon: <Upload size={14} />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { id: 2, type: "download", user: "You", action: "downloaded", target: "Q4_Financials.xlsx", time: "1 hour ago", icon: <Download size={14} />, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" }
    ];

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.round(diffMs / 60000);
        const diffHrs = Math.round(diffMins / 60);
        const diffDays = Math.round(diffHrs / 24);

        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHrs < 24) return `${diffHrs} hours ago`;
        return `${diffDays} days ago`;
    };

    const getIconConfig = (action) => {
        switch (action) {
            case "upload": return { icon: <Upload size={14} />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
            case "download": return { icon: <Download size={14} />, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
            case "delete": return { icon: <Trash2 size={14} />, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
            case "rename": return { icon: <Edit size={14} />, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
            default: return { icon: <Activity size={14} />, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" };
        }
    };

    const activities = recentActivities.length > 0
        ? recentActivities.map(act => ({
            id: act._id,
            user: "You",
            action: `${act.action}ed`,
            target: act.fileId?.originalName || "a file",
            time: formatTime(act.timestamp || act.createdAt),
            ...getIconConfig(act.action)
        }))
        : defaultActivities;

    return (
        <div className="glass-card rounded-2xl p-6 shadow-xl relative overflow-hidden h-full border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 font-heading">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                    Recent Activity
                </h3>
                <Activity size={18} className="text-muted-foreground" />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="relative flex gap-4 group">
                        {/* Timeline line */}
                        {index !== activities.length - 1 && (
                            <div className="absolute top-8 left-[15px] bottom-[-16px] w-[2px] bg-black/5 dark:bg-white/5"></div>
                        )}

                        <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${activity.bg} ${activity.color} ${activity.border} shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform`}>
                            {activity.icon}
                        </div>

                        <div className="flex flex-col flex-1 pb-1">
                            <p className="text-sm text-foreground">
                                <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-primary cursor-pointer hover:underline">{activity.target}</span>
                            </p>
                            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
