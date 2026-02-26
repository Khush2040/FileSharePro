import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ onLogoutSuccess }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    if (onLogoutSuccess) onLogoutSuccess();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-auto relative z-0">
        <Topbar userName={userName} />
        <div className="p-6 md:p-10 flex-1 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}