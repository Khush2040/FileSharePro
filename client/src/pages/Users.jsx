import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Button } from "../components/ui/button";
import { Search, Filter, MoreHorizontal, User, Shield, ShieldAlert, Mail, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InviteUserDialog from "../components/ui/InviteUserDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios.get("/users")
      .then(res => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        // Fallback data for demo purposes since API might fail during styling
        setUsers([
          { _id: "1", name: "Alex Admin", email: "alex@example.com", role: "Admin", lastActive: new Date().toISOString() },
          { _id: "2", name: "Sarah Smith", email: "sarah@example.com", role: "User", lastActive: new Date(Date.now() - 86400000).toISOString() },
          { _id: "3", name: "John Doe", email: "john@example.com", role: "User", lastActive: new Date(Date.now() - 172800000).toISOString() },
        ]);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/users/${id}`)
      .then(() => setUsers(prev => prev.filter(u => u._id !== id)))
      .catch(console.error);
  };

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Name,Email,Role,Last Active\n"
      + filteredUsers.map(u => `${u.name},${u.email},${u.role || "User"},${new Date(u.lastActive).toLocaleDateString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 h-full flex flex-col relative z-10 w-full">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient">User Management</h1>
          <p className="text-muted-foreground font-medium">Manage accounts, roles, and access.</p>
        </div>

        <InviteUserDialog onInvite={(newUser) => setUsers(prev => [newUser, ...prev])} />
      </motion.div>

      <motion.div variants={itemVariants} className="glass-card p-6 flex-1 flex flex-col rounded-2xl h-full border-white/5 relative overflow-hidden group/container">

        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative z-10">

          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto border border-black/5 dark:border-white/5">
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap bg-background text-foreground shadow-md border border-black/5 dark:border-white/10">All Users</button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5">Admins</button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5">Guests</button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full bg-white/5 border border-white/10 p-2 pl-9 rounded-xl focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors text-foreground whitespace-nowrap">
              <Filter size={16} /> Filter
            </button>
            <button onClick={handleExport} className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors text-foreground whitespace-nowrap">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto rounded-xl border border-white/5 relative z-10">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-[#09090b]/80 border-b border-white/5 backdrop-blur-md">
              <tr className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Last Active</th>
                <th className="py-4 px-6 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              <AnimatePresence>
                {filteredUsers.map(u => (
                  <motion.tr variants={itemVariants} layout initial="hidden" animate="visible" exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }} key={u._id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 p-[2px]">
                          <div className="w-full h-full bg-[#09090b] rounded-full flex items-center justify-center border border-white/10">
                            <span className="font-bold text-sm text-foreground">{u.name.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${u.role === 'Admin' ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]' : 'bg-secondary/10 text-secondary border-secondary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'}`}>
                        {u.role || "User"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground text-sm">
                      {new Date(u.lastActive).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground outline-none hover:bg-white/10 hover:text-foreground">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 glass-card border-white/10 shadow-2xl p-1 bg-background/90 backdrop-blur-xl">
                          <DropdownMenuLabel className="font-heading font-bold text-xs text-muted-foreground uppercase tracking-widest px-2 py-1.5">User Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 rounded-lg py-2">
                            <Mail size={14} className="mr-2 text-muted-foreground" /> Email User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 rounded-lg py-2">
                            <Shield size={14} className="mr-2 text-muted-foreground" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive hover:bg-destructive/10 rounded-lg py-2"
                            onClick={() => handleDelete(u._id)}
                          >
                            <ShieldAlert size={14} className="mr-2" /> Revoke Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}