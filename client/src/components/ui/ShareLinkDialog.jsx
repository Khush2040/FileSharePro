import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { toast } from "sonner";
import { Copy, Link as LinkIcon, Check } from "lucide-react";

export default function ShareLinkDialog({ children }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareUrl = "https://filesharepro.com/share/xYz123AbC";

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button>Share Link</Button>}
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md border-white/10 shadow-2xl backdrop-blur-2xl bg-background/90 dark:bg-black/80">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-heading text-foreground">Share Workspace Link</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Anyone with this link will be able to view files in the public directory.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 relative z-10 space-y-4">
                    <div className="space-y-1.5 focus-within:text-emerald-500">
                        <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Public Link</label>
                        <div className="flex gap-2">
                            <div className="relative group/input flex-1">
                                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within/input:text-emerald-500 transition-colors" />
                                <Input
                                    readOnly
                                    value={shareUrl}
                                    className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all text-sm rounded-xl cursor-copy text-muted-foreground"
                                />
                            </div>
                            <Button
                                onClick={handleCopy}
                                className="h-11 px-4 bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>
                    </div>
                    <div className="pt-2 text-xs text-muted-foreground/80 flex items-center justify-center">
                        You can revoke this link anytime from Settings.
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
