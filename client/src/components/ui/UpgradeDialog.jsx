import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Star, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function UpgradeDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpgrade = () => {
        setLoading(true);
        // Simulate an upgrade checkout process
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            toast.success("Successfully upgraded to Pro!", {
                description: "Your account now has unlimited storage and advanced features.",
            });
        }, 2000);
    };

    const features = [
        "Unlimited File Storage",
        "Advanced Team Collaboration",
        "Priority Customer Support",
        "Enhanced Security Features",
        "Extended Version History"
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full mt-1 bg-gradient-to-r from-primary to-secondary text-white border-0 hover:opacity-90 font-bold text-xs h-8 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all group overflow-hidden relative">
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                        Upgrade Now <Sparkles size={12} className="group-hover:animate-ping" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"></div>
                </Button>
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md border-primary/20 shadow-2xl backdrop-blur-3xl bg-background/95 dark:bg-[#09090b]/95 p-0 overflow-hidden">

                {/* Animated Glow Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="p-8 relative z-10">
                    <DialogHeader className="mb-6 text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring" }}
                            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                        >
                            <Star size={32} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                        </motion.div>

                        <div className="space-y-2">
                            <DialogTitle className="text-3xl font-bold font-heading text-foreground flex items-center justify-center gap-2">
                                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pro</span>
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
                                Take your productivity to the next level with premium features.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 text-sm font-medium text-foreground/90"
                            >
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                {feature}
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full h-12 text-md font-bold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.5)] transition-all rounded-xl relative overflow-hidden group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Upgrade to Pro — $9.99/mo <Sparkles size={16} />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"></div>
                                </>
                            )}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground font-medium">
                            Cancel anytime. No hidden fees.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
