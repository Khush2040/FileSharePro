import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import axios from "../../api/axios";
import { toast } from "sonner";
import { Loader2, Mail, User } from "lucide-react";

export default function InviteUserDialog({ onInvite, children }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("/users/invite", { name, email, role });
            if (onInvite) onInvite(res.data);
            toast.success("User invited successfully!");
            setOpen(false);
            setName("");
            setEmail("");
            setRole("User");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to invite user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        + Invite User
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md border-white/10 shadow-2xl backdrop-blur-2xl bg-background/90 dark:bg-black/80">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-heading text-foreground">Invite New User</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Send an invitation email for them to join your workspace.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4 relative z-10">
                    <div className="space-y-1.5 focus-within:text-primary">
                        <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Full Name</label>
                        <div className="relative group/input">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within/input:text-primary transition-colors" />
                            <Input
                                required
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all text-sm rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5 focus-within:text-primary">
                        <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Email Address</label>
                        <div className="relative group/input">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within/input:text-primary transition-colors" />
                            <Input
                                required
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all text-sm rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Role</label>
                        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl w-full border border-black/5 dark:border-white/10">
                            <button
                                type="button"
                                onClick={() => setRole('User')}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'User' ? 'bg-background text-primary shadow-sm border border-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('Admin')}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'Admin' ? 'bg-background text-primary shadow-sm border border-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-primary/90 text-white min-w-[100px] shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] transition-all"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Invite"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
