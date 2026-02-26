import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { HardDrive } from "lucide-react";

const COLORS = {
    Image: "#3b82f6",
    Video: "#f59e0b",
    Audio: "#10b981",
    Document: "#a855f7",
    Other: "#94a3b8"
};

export default function StorageUsage({ distribution = [], totalUsed = 0 }) {
    const defaultData = [
        { name: "Documents", value: 45, color: "#a855f7" },
        { name: "Images", value: 30, color: "#3b82f6" },
        { name: "Media", value: 15, color: "#ec4899" },
        { name: "Other", value: 10, color: "#94a3b8" },
    ];

    const chartData = distribution.length > 0
        ? distribution.map(d => ({
            name: d._id,
            value: Math.round((d.size / (totalUsed || 1)) * 100) || 1, // At least 1% for visibility if not 0
            color: COLORS[d._id] || COLORS.Other,
            rawSize: d.size
        }))
        : defaultData;

    const totalCapacityBytes = 50 * 1024 * 1024 * 1024; // 50GB placeholder total cap
    const percentage = Math.round((totalUsed / totalCapacityBytes) * 100);

    return (
        <div className="glass-card rounded-2xl p-6 shadow-xl relative overflow-hidden h-full border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                    Storage Overview
                </h3>
                <HardDrive size={18} className="text-muted-foreground" />
            </div>

            <div className="flex-1 flex flex-col justify-center relative min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc',
                                boxShadow: '0 0 20px rgba(168,85,247,0.2)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center text for Donut Chart */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold font-heading text-foreground">{percentage}%</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Used</span>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="font-semibold text-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${item.value}%`, backgroundColor: item.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
