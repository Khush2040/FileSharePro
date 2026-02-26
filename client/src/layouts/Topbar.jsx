import { Bell, Search, Sun, Moon, User, Settings, LogOut, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Topbar({ userName, onLogout }) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="glass-header px-6 md:px-10 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex-1 max-w-md hidden md:flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-inner">
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files, users..."
          className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground font-medium"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-5 ml-auto text-muted-foreground">

        <button
          className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hover:text-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hover:text-foreground focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-1 right-1.5 bg-primary w-2.5 h-2.5 rounded-full border border-background shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-card border-white/10 shadow-2xl p-0 overflow-hidden bg-background/90 backdrop-blur-xl">
            <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
              <span className="font-bold text-sm text-foreground font-heading">Notifications</span>
              <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-primary/20">3 New</span>
            </div>
            <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
              <DropdownMenuItem className="flex flex-col items-start p-3 gap-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer focus:bg-black/5 dark:focus:bg-white/5 transition-colors group outline-none">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                    <FileText size={14} />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">New File Shared</span>
                </div>
                <span className="text-xs text-muted-foreground ml-[38px]">Sarah shared "Q4_Report.pdf" with you.</span>
                <span className="text-[10px] text-muted-foreground/70 ml-[38px] mt-1 uppercase tracking-wider font-semibold">2 minutes ago</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-col items-start p-3 gap-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer focus:bg-black/5 dark:focus:bg-white/5 transition-colors group outline-none">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                    <AlertCircle size={14} />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">System Update</span>
                </div>
                <span className="text-xs text-muted-foreground ml-[38px]">Maintenance scheduled for tonight at 2 AM.</span>
                <span className="text-[10px] text-muted-foreground/70 ml-[38px] mt-1 uppercase tracking-wider font-semibold">1 hour ago</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex flex-col items-start p-3 gap-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer focus:bg-black/5 dark:focus:bg-white/5 transition-colors group outline-none">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <CheckCircle size={14} />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors">Upload Complete</span>
                </div>
                <span className="text-xs text-muted-foreground ml-[38px]">Your batch upload finished successfully.</span>
                <span className="text-[10px] text-muted-foreground/70 ml-[38px] mt-1 uppercase tracking-wider font-semibold">3 hours ago</span>
              </DropdownMenuItem>
            </div>
            <div className="p-3 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
              <button className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors py-1.5 font-bold uppercase tracking-wider rounded-lg hover:bg-primary/10">
                Mark all as read
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-black/10 dark:bg-white/10 mx-1 md:mx-2"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-1.5 -m-1.5 rounded-full pr-4 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
              <div className="text-sm text-right hidden sm:block">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">Welcome back</p>
                <p className="font-bold text-foreground dark:text-glow text-sm font-heading">{userName || "Admin"}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-shadow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center border border-black/10 dark:border-white/10">
                  <span className="font-bold text-sm text-primary font-heading">{userName ? userName.charAt(0).toUpperCase() : 'A'}</span>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card border-white/10 shadow-2xl mt-2 p-2 bg-background/90 backdrop-blur-xl">
            <DropdownMenuLabel className="font-heading font-bold text-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 rounded-lg mb-1 py-2.5" onClick={() => navigate('/settings')}>
              <User size={16} className="mr-2 text-muted-foreground" />
              <span className="font-medium">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 rounded-lg py-2.5" onClick={() => navigate('/settings')}>
              <Settings size={16} className="mr-2 text-muted-foreground" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10 my-2" />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive hover:bg-destructive/10 rounded-lg py-2.5" onClick={onLogout}>
              <LogOut size={16} className="mr-2" />
              <span className="font-bold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}