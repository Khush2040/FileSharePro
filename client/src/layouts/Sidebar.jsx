import { NavLink } from "react-router-dom";
import { Home, FileText, Users, Settings, LogOut, Star, BarChart2, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import UpgradeDialog from "../components/ui/UpgradeDialog";
import Logo from "../components/ui/Logo";

export default function Sidebar({ fileCount = 0, userCount = 0, onLogout }) {
  const userRole = localStorage.getItem("userRole") || "user";
  const isAdmin = userRole === "admin";

  const navItem = (to, label, icon, badge = null) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
          ? "bg-primary/20 text-primary font-semibold shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] border border-primary/30"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <span className="group-hover:text-primary transition-colors">{icon}</span>
        {label}
      </div>
      {badge > 0 && (
        <span className="bg-primary/20 text-primary text-xs px-2.5 py-0.5 rounded-full border border-primary/30 font-medium">
          {badge}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside className="w-72 glass-panel flex flex-col z-20 h-full">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
          <Logo size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gradient">FileShare Pro</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4 mt-2">Menu</div>
        {navItem("/", "Dashboard", <Home size={20} />)}
        {navItem("/analytics", "Analytics", <BarChart2 size={20} />)}
        {navItem("/files", "Files", <FileText size={20} />, fileCount)}
        {isAdmin && navItem("/users", "Users", <Users size={20} />, userCount)}
        {navItem("/settings", "Settings", <Settings size={20} />)}
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4 mt-8">Support</div>
        {navItem("/help", "Manual / Guide", <HelpCircle size={20} />)}
        {navItem("/contact", "Contact Us", <MessageSquare size={20} />)}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">

        {/* Upgrade Promo */}
        <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-500"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <h4 className="font-heading font-bold text-foreground flex items-center gap-1.5 text-sm">
              <Star size={14} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />
              Upgrade to Pro
            </h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
              Unlock unlimited storage & advanced team collaboration features.
            </p>
            <UpgradeDialog />
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all rounded-xl py-6 group"
          onClick={onLogout}
        >
          <LogOut size={20} className="mr-3 group-hover:scale-110 transition-transform" /> Logout
        </Button>
      </div>
    </aside>
  );
}