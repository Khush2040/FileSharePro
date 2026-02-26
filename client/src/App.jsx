import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import Analytics from "./pages/Analytics";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const handleAuthChange = () => {
    setToken(localStorage.getItem("authToken"));
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="file-share-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
        {/* Professional Background Layers */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-premium"></div>
        <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern mask-image-fade"></div>

        {/* Main Application Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Router>
            <Routes>
              <Route path="/login" element={!token ? <AuthPage onAuthSuccess={handleAuthChange} /> : <Navigate to="/" />} />
              <Route path="/register" element={!token ? <AuthPage onAuthSuccess={handleAuthChange} /> : <Navigate to="/" />} />

              <Route path="/" element={token ? <DashboardLayout onLogoutSuccess={handleAuthChange} /> : <LandingPage />}>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="files" element={<Files />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Toast notifications matched to the system/current theme */}
            <Toaster richColors position="top-right" />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

