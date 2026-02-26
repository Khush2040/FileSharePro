import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Shield, Zap, Globe, Users, Clock, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import Logo from "../components/ui/Logo";

export default function LandingPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden transition-colors duration-300">

            {/* Decorative background blur blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse opacity-50 z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse opacity-50 z-0 animation-delay-2000"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl z-10 flex flex-col items-center text-center space-y-8 mt-12 mb-12"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 bg-background/50 backdrop-blur-md rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.3)] border border-primary/30 relative group cursor-pointer mb-6">
                        <div className="absolute inset-0 rounded-[2rem] bg-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 group-hover:opacity-40 transition-opacity" />
                        <Logo size={48} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground font-heading leading-tight">
                        Welcome to <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary relative inline-block mt-2">
                            FileShare Pro
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60 blur-sm"></div>
                        </span>
                    </h1>

                    <p className="text-muted-foreground font-medium text-lg md:text-2xl max-w-3xl mt-8 leading-relaxed mx-auto">
                        The ultimate secure platform to store, manage, and share your entire digital workspace seamlessly across all your devices.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-10 w-full sm:w-auto px-4">
                    <Link to="/login" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-16 px-10 text-lg font-bold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_8px_40px_rgba(168,85,247,0.4)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.7)] transition-all rounded-full group hover:scale-105 active:scale-95">
                            Get Started Free <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1.5 transition-transform" />
                        </Button>
                    </Link>
                    <a href="#features" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-full group text-foreground">
                            Learn More
                        </Button>
                    </a>
                </motion.div>

                {/* Features Grids */}
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-28 pt-10" id="features">
                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Military-Grade Security</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Your files are encrypted at rest and in transit. Only you decide who sees what. Peace of mind built-in.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300 border border-secondary/20">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Lightning Fast</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Experience blazing fast uploads and downloads powered by our global edge network. Zero wait time.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Access Anywhere</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Seamlessly sync your files across all your devices, available wherever you are, anytime you need them.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Team Collaboration</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Share folders and set granular permissions. Collaborate securely with your team or external partners easily.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px] group-hover:bg-orange-500/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300 border border-orange-500/20">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Version History</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Never lose a change again. Automatically track file versions and restore previous iterations with one click.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-[60px] group-hover:bg-pink-500/20 transition-all duration-500"></div>
                        <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 text-pink-500 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300 border border-pink-500/20">
                            <Search size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-foreground text-left">Intelligent Search</h3>
                        <p className="text-muted-foreground text-base text-left leading-relaxed">Find what you need instantly with our AI-powered global search that indexes document contents, not just titles.</p>
                    </motion.div>
                </motion.div>

            </motion.div>
        </div>
    );
}
