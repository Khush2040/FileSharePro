import { UploadCloud, FolderPlus, Share2, Users } from "lucide-react";
import { motion } from "framer-motion";
import UploadDialog from "../ui/UploadDialog";
import NewFolderDialog from "../ui/NewFolderDialog";
import ShareLinkDialog from "../ui/ShareLinkDialog";
import InviteUserDialog from "../ui/InviteUserDialog";

export default function QuickActions() {
    const actions = [
        { name: "Upload File", icon: <UploadCloud size={20} />, color: "from-primary to-primary/60", shadow: "shadow-primary/20", glow: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]", Dialog: UploadDialog },
        { name: "New Folder", icon: <FolderPlus size={20} />, color: "from-blue-500 to-blue-400/60", shadow: "shadow-blue-500/20", glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]", Dialog: NewFolderDialog },
        { name: "Share Link", icon: <Share2 size={20} />, color: "from-emerald-500 to-emerald-400/60", shadow: "shadow-emerald-500/20", glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]", Dialog: ShareLinkDialog },
        { name: "Add User", icon: <Users size={20} />, color: "from-amber-500 to-amber-400/60", shadow: "shadow-amber-500/20", glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]", Dialog: InviteUserDialog },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {actions.map((action, index) => {
                const DialogComponent = action.Dialog;
                return (
                    <DialogComponent key={index}>
                        <motion.button
                            whileHover={{ y: -4, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`glass-card w-full text-left rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative overflow-hidden group border-white/5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${action.glow}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${action.color} shadow-lg ${action.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                {action.icon}
                            </div>

                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground font-heading">{action.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Quick Action</span>
                            </div>
                        </motion.button>
                    </DialogComponent>
                );
            })}
        </div>
    );
}
