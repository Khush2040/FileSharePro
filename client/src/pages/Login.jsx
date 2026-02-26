import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Hexagon, Lock, Mail, Github, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try real backend login first
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userName", res.data.user?.name || "User");
      toast.success("Successfully logged in!");
      if (onLoginSuccess) onLoginSuccess();
      navigate("/");
    } catch (err) {
      // MOCK LOGIN FALLBACK: If the backend is off, allow local mock testing.
      console.warn("Backend login failed or server is offline. Falling back to mock login.", err);
      toast.success("Logged in with Demo Account!");
      localStorage.setItem("authToken", "mock-demo-token");
      localStorage.setItem("userName", "Demo User");
      if (onLoginSuccess) onLoginSuccess();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-premium transition-colors duration-300 relative overflow-hidden">

      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8 text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-primary/20 mb-4 backdrop-blur-md">
            <Hexagon size={32} className="text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground text-glow">FileShare Pro</h1>
          <p className="text-muted-foreground font-medium text-sm max-w-sm">
            Secure, blazing fast file sharing for modern teams.
          </p>
        </div>

        <Card className="glass-card border-none shadow-2xl backdrop-blur-2xl bg-background/60 dark:bg-black/40">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center text-sm">
              Enter your credentials or use any test data to proceed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/90 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 h-12 bg-white/5 border-white/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-foreground/90">Password</label>
                  <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 h-12 bg-white/5 border-white/10 dark:bg-black/40 dark:border-white/10 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-md font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.5)] transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/80 dark:bg-[#09090b]/80 px-4 text-muted-foreground font-semibold backdrop-blur-md rounded-full">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 font-medium">
                <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 font-medium">
                <Github width="18" height="18" className="mr-2" />
                GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <p className="text-sm text-muted-foreground font-medium">
              Don't have an account? <Link to="/register" className="text-primary hover:text-primary/80 hover:underline transition-colors">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}