import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import axios from "../api/axios";

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            topic: formData.get("topic"),
            message: formData.get("message")
        };

        try {
            await axios.post("/contact", data);
            toast.success("Message sent successfully! Our support team will respond shortly.");
            e.target.reset();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto space-y-8 relative z-10 w-full mb-10 h-full flex flex-col">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-heading mb-1 text-gradient flex items-center gap-3">
                    <MessageSquare size={36} className="text-primary" /> Contact Support
                </h1>
                <p className="text-muted-foreground font-medium">Reach out for technical assistance, billing inquiries, or general feedback.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mt-4 items-start">

                {/* Contact Info Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-8 border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                        <h3 className="text-xl font-bold font-heading mb-6 relative z-10">Get in Touch</h3>

                        <div className="space-y-6 relative z-10 text-muted-foreground">
                            <div className="flex items-start gap-4 hover:text-foreground transition-colors">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0"><Mail className="text-primary" size={20} /></div>
                                <div>
                                    <h4 className="text-foreground font-semibold">Email Us</h4>
                                    <p className="text-sm">admin@filesharepro.com</p>
                                    <p className="text-xs text-primary mt-1">Expected response: 24hrs</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-card rounded-2xl p-8 border-white/5 relative shadow-2xl">
                    <h3 className="text-xl font-bold font-heading mb-6">Send us a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">First Name</label>
                                <input name="firstName" required type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Last Name</label>
                                <input name="lastName" required type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                            <input name="email" required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Topic</label>
                            <select name="topic" required defaultValue="" className="w-full bg-[#0a0a0f] border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-muted-foreground hover:text-foreground cursor-pointer appearance-none">
                                <option value="" disabled>Select an issue category</option>
                                <option value="technical">Technical Support</option>
                                <option value="billing">Billing Inquiry</option>
                                <option value="feature">Feature Request</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Message</label>
                            <textarea name="message" required rows="4" placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground resize-none" />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold border-0 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] transition-all py-6 rounded-xl mt-4">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sending...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send size={18} /> Send Message
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

            </motion.div>
        </motion.div>
    );
}
