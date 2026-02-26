import { motion } from "framer-motion";
import { HelpCircle, Upload, HardDrive, Download, Trash2, Edit } from "lucide-react";

export default function HelpManual() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto space-y-8 relative z-10 w-full mb-10">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient flex items-center gap-3">
                    <HelpCircle size={36} className="text-primary" /> User Manual
                </h1>
                <p className="text-muted-foreground font-medium">Learn how to navigate and utilize FileShare Pro efficiently.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-6">

                {/* Getting Started */}
                <div className="glass-card rounded-2xl p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                    <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                        <span className="bg-primary/20 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold">1</span>
                        Getting Started
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        Welcome to the FileShare Pro dashboard. This is your central hub for all activities. From the dashboard you can monitor your total storage limit, recent upload history, and track team analytics. Use the left-side navigation panel to jump to different pages.
                    </p>
                </div>

                {/* Uploading Files */}
                <div className="glass-card rounded-2xl p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                    <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2 text-emerald-400">
                        <span className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold">2</span>
                        Uploading Data
                    </h2>
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0 mt-1"><Upload className="text-emerald-400" /></div>
                        <div>
                            <p className="text-muted-foreground mb-4">
                                You can upload a single file directly via the Dashboard or the dedicated Files page.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                <li>Locate the <strong>Upload File</strong> drag-and-drop zone.</li>
                                <li>Click the zone to open your system directory or drag your file into the box.</li>
                                <li>The file secures itself using encryption and saves directly to your database.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* File Management */}
                <div className="glass-card rounded-2xl p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>
                    <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2 text-amber-500">
                        <span className="bg-amber-500/20 text-amber-500 w-8 h-8 rounded-lg flex items-center justify-center font-bold">3</span>
                        Managing Your Files
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3 mt-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors">
                            <Edit className="mb-2 text-amber-400" size={20} />
                            <h4 className="font-bold text-foreground mb-1">Rename</h4>
                            <p className="text-xs text-muted-foreground">Click the yellow pencil icon on any file to give it a custom name.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <Download className="mb-2 text-blue-400" size={20} />
                            <h4 className="font-bold text-foreground mb-1">Download</h4>
                            <p className="text-xs text-muted-foreground">Click the download arrow to instantly stream the file back to your device.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/30 transition-colors">
                            <Trash2 className="mb-2 text-red-400" size={20} />
                            <h4 className="font-bold text-foreground mb-1">Delete</h4>
                            <p className="text-xs text-muted-foreground">Hit the red trash can to permanently wipe the file to reclaim storage.</p>
                        </div>
                    </div>
                </div>

                {/* Check Storage details */}
                <div className="glass-card rounded-2xl p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2 text-blue-400">
                        <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold">4</span>
                        Monitoring Quotas
                    </h2>
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0 mt-1"><HardDrive className="text-blue-400" /></div>
                        <div>
                            <p className="text-muted-foreground mb-4">
                                To track your memory usage limits click on <strong>Settings</strong> then navigate to the <strong>Storage</strong> tab.
                            </p>
                            <p className="text-sm text-foreground bg-primary/10 border border-primary/20 p-3 rounded-xl font-medium">Tip: Did you know you can view mathematical predictions of your storage usage pattern on the Advanced Analytics page?</p>
                        </div>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}
