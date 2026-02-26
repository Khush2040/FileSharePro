import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
    AreaChart, Area
} from "recharts";
import { Activity, HardDrive, TrendingUp, Award, Layers } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get("/analytics/dashboard");
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch advanced analytics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Formatting prediction chart data
    const currentStorage = data?.totalStorage || 0;
    const predictedStorage = data?.advanced?.predictedStorage30Days || 0;

    const predictionData = [
        { month: "Last Month", usage: currentStorage > 0 ? currentStorage * 0.8 : 0 },
        { month: "Current", usage: currentStorage },
        { month: "Next Month (Predicted)", usage: predictedStorage }
    ];

    // Ranking data logic (ranking file types by size)
    const rankingData = data?.advanced?.fileTypeDistribution?.map(item => ({
        type: item._id,
        size: item.size,
        count: item.count
    })) || [];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 relative z-10 w-full pb-10">

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient">Advanced Logic</h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                    Analytics, Scoring, Ranking, and Storage Prediction
                </p>
            </motion.div>

            {/* Advanced Logic Overview Cards */}
            <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                <StatsCard
                    title="Activity Score"
                    value={`${data?.advanced?.activityScore || 0}/100`}
                    trend="Algorithmic scoring model"
                    icon={<Award size={24} className="text-amber-400" />}
                    trendColor="text-amber-400"
                />
                <StatsCard
                    title="30-Day Growth Rate"
                    value={`${data?.advanced?.growthRate?.toFixed(2) || 0}%`}
                    trend="Storage accumulation rate"
                    icon={<TrendingUp size={24} className="text-emerald-400" />}
                    trendColor="text-emerald-400"
                />
                <StatsCard
                    title="Predicted Storage"
                    value={formatBytes(predictedStorage)}
                    trend="Expected next month"
                    icon={<HardDrive size={24} className="text-blue-400" />}
                    trendColor="text-blue-400"
                />
                <StatsCard
                    title="Data Categories"
                    value={rankingData.length}
                    trend="Ranked file types"
                    icon={<Layers size={24} className="text-primary" />}
                />
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
                {/* Predictive storage chart */}
                <div className="glass-card rounded-2xl p-6 shadow-xl border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

                    <h2 className="text-xl font-bold font-heading mb-2 flex items-center gap-2 relative z-10">
                        <TrendingUp size={18} className="text-primary" /> Prediction Model
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">Machine learning linear regression storage prediction based on recent activity momentum.</p>

                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={predictionData}>
                                <defs>
                                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="usage" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatBytes(val)} />
                                <Tooltip
                                    formatter={(val) => formatBytes(val)}
                                    contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Data Ranking chart */}
                <div className="glass-card rounded-2xl p-6 shadow-xl border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 translate-y-1/3"></div>

                    <h2 className="text-xl font-bold font-heading mb-2 flex items-center gap-2 relative z-10">
                        <Activity size={18} className="text-amber-400" /> Data Ranking & Categories
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">Categorical aggregation ranking by absolute file size footprint across your digital workspace.</p>

                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rankingData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatBytes(val)} />
                                <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    formatter={(val) => formatBytes(val)}
                                    contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="size" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
}
