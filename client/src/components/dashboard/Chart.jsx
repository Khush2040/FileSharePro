import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Charts({ data, growthRate = 24 }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        { day: "Mon", uploads: 4 },
        { day: "Tue", uploads: 7 },
        { day: "Wed", uploads: 5 },
        { day: "Thu", uploads: 12 },
        { day: "Fri", uploads: 8 },
        { day: "Sat", uploads: 15 },
        { day: "Sun", uploads: 10 },
      ];
    }

    // Map the DB format [{ _id: "YYYY-MM-DD", count: N }] to the chart format
    return data.map(item => {
      const date = new Date(item._id);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return {
        day: days[date.getDay()],
        uploads: item.count
      };
    });
  }, [data]);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl relative overflow-hidden h-full border-white/5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload Activity</h3>
            <p className="text-sm text-muted-foreground mt-1">Files uploaded over the last 7 days</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wider">
            {growthRate >= 0 ? "+" : ""}{growthRate.toFixed(1)}% RECENTLY
          </div>
        </div>

        <div className="flex-1 min-h-[250px] w-full mt-4 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 20, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  boxShadow: '0 0 20px rgba(168,85,247,0.2)'
                }}
                itemStyle={{ color: '#a855f7' }}
              />
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#09090b' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff', filter: 'url(#glow)' }}
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}