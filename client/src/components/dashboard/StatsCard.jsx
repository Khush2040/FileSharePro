import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon, trend }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="glass-card p-6 relative overflow-hidden group border-white/5 h-full">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-20 transition-all duration-500 text-primary">
          {icon}
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-all duration-300">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground font-heading tracking-tight">{value}</h3>
            {trend && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center font-medium">
                <span className="text-emerald-400 mr-1">{trend}</span> this week
              </p>
            )}
          </div>
        </div>
        {/* Glow underline effect */}
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </motion.div>
  );
}