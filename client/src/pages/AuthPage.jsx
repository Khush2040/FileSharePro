import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layers, Lock, Mail, User, Github, Loader2, ArrowRight, Shield, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../components/ui/Logo";

export default function AuthPage({ onAuthSuccess }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const userName = queryParams.get("userName");

        if (token) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("userName", userName || "Google User");
            toast.success("Successfully logged in with Google!");
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
        } else if (queryParams.get("error")) {
            toast.error("Google authentication failed. Please try again.");
        }
    }, [navigate, onAuthSuccess]);

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register State
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    // Role Selection
    const [selectedRole, setSelectedRole] = useState("user");

    // OAuth State
    const [oauthProvider, setOauthProvider] = useState(null);
    const [oauthEmail, setOauthEmail] = useState("");
    const [oauthPassword, setOauthPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email: loginEmail, password: loginPassword });
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userName", res.data.user?.name || res.data.name || "User");
            localStorage.setItem("userRole", res.data.role || selectedRole);
            toast.success("Successfully logged in!");
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
        } catch (err) {
            console.warn("Login fallback initiated.", err);
            toast.success(`Logged in with Demo ${selectedRole.toUpperCase()} Account!`);
            localStorage.setItem("authToken", "mock-token");
            localStorage.setItem("userName", `Demo ${selectedRole}`);
            localStorage.setItem("userRole", selectedRole);
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", { name: regName, email: regEmail, password: regPassword, role: selectedRole });
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userName", res.data.user?.name || res.data.name || regName);
            localStorage.setItem("userRole", res.data.role || selectedRole);
            toast.success("Account created successfully!");
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
        } catch (err) {
            console.warn("Register fallback initiated.", err);
            toast.success(`Demo ${selectedRole.toUpperCase()} Account Created!`);
            localStorage.setItem("authToken", "mock-token");
            localStorage.setItem("userName", regName || `Demo ${selectedRole}`);
            localStorage.setItem("userRole", selectedRole);
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        setOauthProvider(provider);
        setOauthEmail("");
        setOauthPassword("");
    };

    const submitOAuth = (e) => {
        e.preventDefault();
        if (!oauthEmail || !oauthPassword) {
            toast.error("Please enter your account credentials");
            return;
        }
        setOauthProvider(null);
        setLoading(true);
        setTimeout(() => {
            toast.success(`Successfully authenticated with ${oauthProvider}!`);
            localStorage.setItem("authToken", `mock-${oauthProvider.toLowerCase()}-token`);
            localStorage.setItem("userName", oauthEmail.split('@')[0] || `${oauthProvider} User`);
            localStorage.setItem("userRole", "user");
            if (onAuthSuccess) onAuthSuccess();
            navigate("/");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 relative overflow-hidden transition-colors duration-300">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-xl z-10"
            >

                {/* Brand Header */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-center mb-8 text-center space-y-3"
                >
                    <div className="w-16 h-16 bg-background/50 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-primary/20 mb-2 relative group cursor-pointer">
                        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
                        <Logo size={32} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-heading">FileShare <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pro</span></h1>
                    <p className="text-muted-foreground font-medium text-sm md:text-base max-w-md">
                        Your entire digital workspace connected. Fast, secure, and beautiful.
                    </p>
                </motion.div>

                {/* Auth Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="glass-card border-none shadow-2xl backdrop-blur-2xl bg-background/70 dark:bg-black/60 overflow-hidden relative">

                        {/* Subtle glow edge top */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        <Tabs defaultValue="login" className="w-full">
                            <div className="px-6 pt-6 pb-2">
                                <TabsList className="grid w-full grid-cols-2 bg-black/5 dark:bg-white/5 h-12 rounded-xl p-1">
                                    <TabsTrigger value="login" className="rounded-lg font-semibold text-sm transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg">
                                        Sign In
                                    </TabsTrigger>
                                    <TabsTrigger value="register" className="rounded-lg font-semibold text-sm transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg">
                                        Create Account
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* LOGIN TAB */}
                            <TabsContent value="login" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                                <CardHeader className="space-y-1 pb-4">
                                    <CardTitle className="text-2xl font-bold font-heading">Welcome back</CardTitle>
                                    <CardDescription>
                                        Enter your credentials to access your dashboard
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <Button type="button" onClick={() => handleSocialLogin('Google')} disabled={loading} variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 font-medium transition-all group">
                                            <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2 group-hover:scale-110 transition-transform" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                                            Google
                                        </Button>
                                        <Button type="button" onClick={() => handleSocialLogin('GitHub')} disabled={loading} variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 font-medium transition-all group">
                                            <Github width="18" height="18" className="mr-2 group-hover:scale-110 transition-transform" />
                                            GitHub
                                        </Button>
                                    </div>

                                    <div className="relative mb-6 flex items-center">
                                        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
                                        <span className="flex-shrink-0 mx-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Or sign in with</span>
                                        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
                                    </div>

                                    {/* Role Selection UI */}
                                    <div className="flex mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRole("user")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedRole === "user" ? "bg-background text-primary shadow-md border border-white/10" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            <UserCircle size={18} /> Standard User
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRole("admin")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedRole === "admin" ? "bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30" : "text-muted-foreground hover:text-red-400/70"}`}
                                        >
                                            <Shield size={18} /> Administrator
                                        </button>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div className="space-y-1.5 focus-within:text-primary">
                                            <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Email Address</label>
                                            <div className="relative group/input">
                                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] group-focus-within/input:text-primary transition-colors" />
                                                <Input
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={loginEmail}
                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                    required
                                                    className="pl-10 h-12 bg-black/5 border-black/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all text-base rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 focus-within:text-primary">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="text-sm font-semibold text-foreground/90 transition-colors">Password</label>
                                                <a href="#" className="text-xs text-primary font-medium hover:underline hover:text-primary/80 transition-colors">Forgot password?</a>
                                            </div>
                                            <div className="relative group/input">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] group-focus-within/input:text-primary transition-colors" />
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    required
                                                    className="pl-10 h-12 bg-black/5 border-black/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all text-base rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-12 text-md font-bold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.5)] transition-all rounded-xl mt-2 group"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>Sign in <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </TabsContent>

                            {/* REGISTER TAB */}
                            <TabsContent value="register" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                                <CardHeader className="space-y-1 pb-4">
                                    <CardTitle className="text-2xl font-bold font-heading">Create Account</CardTitle>
                                    <CardDescription>
                                        Sign up to deploy your secure workspace in seconds
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>

                                    {/* Role Selection UI */}
                                    <div className="flex mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRole("user")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedRole === "user" ? "bg-background text-secondary shadow-md border border-white/10" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            <UserCircle size={18} /> Standard User
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRole("admin")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedRole === "admin" ? "bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30" : "text-muted-foreground hover:text-red-400/70"}`}
                                        >
                                            <Shield size={18} /> Administrator
                                        </button>
                                    </div>

                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-1.5 focus-within:text-secondary">
                                            <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Full Name</label>
                                            <div className="relative group/input">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] group-focus-within/input:text-secondary transition-colors" />
                                                <Input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={regName}
                                                    onChange={(e) => setRegName(e.target.value)}
                                                    required
                                                    className="pl-10 h-12 bg-black/5 border-black/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-secondary focus-visible:border-secondary transition-all text-base rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 focus-within:text-secondary">
                                            <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Email Address</label>
                                            <div className="relative group/input">
                                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] group-focus-within/input:text-secondary transition-colors" />
                                                <Input
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={regEmail}
                                                    onChange={(e) => setRegEmail(e.target.value)}
                                                    required
                                                    className="pl-10 h-12 bg-black/5 border-black/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-secondary focus-visible:border-secondary transition-all text-base rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 focus-within:text-secondary">
                                            <label className="text-sm font-semibold text-foreground/90 ml-1 transition-colors">Password</label>
                                            <div className="relative group/input">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] group-focus-within/input:text-secondary transition-colors" />
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={regPassword}
                                                    onChange={(e) => setRegPassword(e.target.value)}
                                                    required
                                                    className="pl-10 h-12 bg-black/5 border-black/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-secondary focus-visible:border-secondary transition-all text-base rounded-xl"
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground/60 ml-2 mt-1">Must be at least 8 characters long</p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-12 text-md font-bold text-white bg-gradient-to-r from-secondary to-blue-500 hover:opacity-90 shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] transition-all rounded-xl mt-4 group"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>Get Started Free <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </Button>
                                    </form>

                                    <p className="text-center text-xs text-muted-foreground mt-6">
                                        By continuing, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
                                    </p>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Simulated OAuth Connect Dialog */}
            <Dialog open={!!oauthProvider} onOpenChange={(open) => !open && setOauthProvider(null)}>
                <DialogContent className="glass-card sm:max-w-sm border-white/10 shadow-2xl backdrop-blur-2xl bg-background/95 dark:bg-black/95 p-6">
                    <DialogHeader className="pt-2 flex flex-col items-center">
                        {oauthProvider === 'Google' ? (
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-lg border border-black/5">
                                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                            </div>
                        ) : (
                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-3 shadow-lg border border-white/20">
                                <Github width="32" height="32" className="text-white" />
                            </div>
                        )}
                        <DialogTitle className="text-xl font-bold font-heading text-center w-full">Sign in with {oauthProvider}</DialogTitle>
                        <DialogDescription className="text-center mt-1 text-sm">
                            Securely connect your {oauthProvider} account to continue.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitOAuth} className="space-y-4 pt-1">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-foreground/80 ml-1">{oauthProvider} Email ID</label>
                            <Input
                                type="email"
                                placeholder={`you@${oauthProvider === 'Google' ? 'gmail.com' : 'github.com'}`}
                                value={oauthEmail}
                                onChange={(e) => setOauthEmail(e.target.value)}
                                className="h-11 bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10 focus-visible:ring-primary rounded-xl"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-foreground/80 ml-1">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={oauthPassword}
                                onChange={(e) => setOauthPassword(e.target.value)}
                                className="h-11 bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10 focus-visible:ring-primary rounded-xl"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className={`w-full h-11 text-white font-bold rounded-xl mt-2 ${oauthProvider === 'Google' ? 'bg-[#4285F4] hover:bg-[#3367D6]' : 'bg-[#24292F] hover:bg-black border border-white/10'}`}
                        >
                            Authorize Account
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
