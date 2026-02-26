import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { toast } from "sonner";
import { Loader2, FolderPlus } from "lucide-react";

export default function NewFolderDialog({ children }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [folderName, setFolderName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success(`Folder "${folderName}" created successfully!`);
            setOpen(false);
            setFolderName("");
        } catch (err) {
            toast.error("Failed to create folder");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button>New Folder</Button>}
            </DialogTrigger>
            <DialogContent className="glass-card sm:max-w-md border-white/10 shadow-2xl backdrop-blur-2xl bg-background/90 dark:bg-black/80">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-heading text-foreground">Create New Folder</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Organize your files efficiently by grouping them into folders.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4 relative z-10">
                    <div className="space-y-1.5 focus-within:text-blue-500">
                        <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Folder Name</label>
                        <div className="relative group/input">
                            <FolderPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within/input:text-blue-500 transition-colors" />
                            <Input
                                required
                                type="text"
                                placeholder="e.g. Q4 Reports"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white min-w-[120px] shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Folder"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
