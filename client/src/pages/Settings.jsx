import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";
import { formatBytes } from "./Dashboard";
import { toast } from "sonner";

export default function Settings() {
  const [appName, setAppName] = useState("FileShare Pro");
  const [activeTab, setActiveTab] = useState("General");
  const [storageData, setStorageData] = useState({ used: 0, total: 50 * 1024 * 1024 * 1024 }); // 50GB Default
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (activeTab === "Storage") {
      axios.get("/analytics/dashboard").then(res => {
        setStorageData(prev => ({ ...prev, used: res.data.totalStorage || 0 }));
      }).catch(err => console.error(err));
    }
  }, [activeTab]);

  const tabs = ["General", "Storage", "Appearance", "Notifications"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };
  const tabContentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-4xl mx-auto w-full relative z-10 h-full flex flex-col">
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient">Settings</h1>
        <p className="text-muted-foreground font-medium">Manage your application preferences and account settings.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-[250px_1fr] flex-1">
        {/* Sidebar Nav */}
        <div className="glass-card rounded-2xl p-4 h-fit hidden md:block border-white/5 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between transition-colors border ${activeTab === tab
                ? "bg-primary/10 text-primary border-primary/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground border-transparent"
                }`}
            >
              {tab}
              {activeTab === tab && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
            </button>
          ))}
        </div>

        {/* Mobile Tab Select */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-1 glass-card rounded-xl border-white/5 bg-black/5 dark:bg-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab
                ? "bg-background text-primary shadow-md border border-black/5 dark:border-white/10"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6 relative overflow-visible">

          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {activeTab === "General" && (
                <>
                  <div className="glass-card rounded-2xl p-6 border-white/5 relative z-10">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 font-heading">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                      General Settings
                    </h3>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Application Name</label>
                        <input
                          type="text"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Support Email</label>
                        <input
                          type="email"
                          defaultValue="admin@filesharepro.com"
                          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground font-medium"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/5 flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-medium border-0 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] transition-all">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border-destructive/20 bg-destructive/5 relative overflow-hidden z-10 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl group-hover:bg-destructive/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold mb-2 text-destructive font-heading">Danger Zone</h3>
                    <p className="text-sm text-destructive/80 mb-4 font-medium">Permanent actions that cannot be undone.</p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border border-destructive/20 rounded-xl bg-[#09090b]/50 relative z-10">
                      <div>
                        <p className="font-bold text-foreground">Delete Workspace</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Permanently delete all files and users.</p>
                      </div>
                      <Button variant="destructive" className="bg-destructive hover:bg-destructive/90 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] w-full sm:w-auto">
                        Delete Data
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Appearance" && (
                <div className="glass-card rounded-2xl p-6 border-white/5 relative z-10">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 font-heading">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                    Theme & Layout
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Interface Theme</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme("dark")}
                          className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-2 ${theme === "dark" || !theme ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "border-white/10 hover:border-white/20 hover:bg-white/5"}`}
                        >
                          <div className="w-full h-24 rounded-lg bg-[#09090b] border border-white/10 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-4 bg-white/5 border-b border-white/10"></div>
                            <div className="absolute top-4 left-0 w-8 h-full bg-white/5 border-r border-white/10"></div>
                            <div className="w-16 h-10 rounded bg-white/10"></div>
                          </div>
                          <span className="font-semibold text-foreground text-sm flex items-center justify-between">
                            Dark Mode
                            {(theme === "dark" || !theme) && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </span>
                        </button>
                        <button
                          onClick={() => setTheme("light")}
                          className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-2 ${theme === "light" ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "border-white/10 hover:border-white/20 hover:bg-white/5"}`}
                        >
                          <div className="w-full h-24 rounded-lg bg-white border border-black/10 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-4 bg-black/5 border-b border-black/10"></div>
                            <div className="absolute top-4 left-0 w-8 h-full bg-black/5 border-r border-black/10"></div>
                            <div className="w-16 h-10 rounded bg-black/10"></div>
                          </div>
                          <span className="font-semibold text-foreground text-sm flex items-center justify-between">
                            Light Mode
                            {theme === "light" && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Storage" && (() => {
                const usedBytes = storageData.used;
                const totalBytes = storageData.total;
                const percentage = Math.min(Math.round((usedBytes / totalBytes) * 100), 100);

                return (
                  <div className="glass-card rounded-2xl p-6 border-white/5 relative z-10">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 font-heading">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      Storage Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-foreground">{formatBytes(usedBytes)} Used</span>
                        <span className="text-muted-foreground">{formatBytes(totalBytes)} Total</span>
                      </div>
                      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${percentage > 90 ? 'bg-gradient-to-r from-red-400 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'}`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">You have used {percentage}% of your available storage.</p>

                      <div className="pt-4 mt-6 border-t border-white/5 flex gap-3">
                        <Button
                          variant="outline"
                          className="border-white/10 hover:bg-white/5 hover:text-foreground"
                          onClick={() => toast.success("Storage increase request submitted! Our team will review your account soon.")}
                        >
                          Request Increase
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 text-xs"
                          onClick={() => {
                            toast.info("Application cache cleared successfully. You may notice slightly longer load times on your next visit.", {
                              icon: "🧹"
                            });
                          }}
                        >
                          Clear Cache
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {activeTab === "Notifications" && (
                <div className="glass-card rounded-2xl p-6 border-white/5 relative z-10">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 font-heading">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "Email Notifications", desc: "Receive emails when files are shared with you.", id: "n1" },
                      { title: "Security Alerts", desc: "Get notified about new logins and security events.", id: "n2" },
                      { title: "Storage Warnings", desc: "Alert me when approaching storage limits.", id: "n3" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer scale-90">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-white/10 shadow-inner"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}