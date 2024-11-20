import { LayoutDashboard, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const sysLogout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Jada</h1>
      </div>

      <nav className="flex-1">
        {_.map(navItems, (item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
              isActive(item.path)
                ? "bg-indigo-800 text-white"
                : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-indigo-800 pt-6 space-y-4">
        <button className="flex items-center space-x-3 text-indigo-300 hover:text-white w-full p-3 rounded-lg transition-colors">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </button>
        <button
          onClick={sysLogout}
          className="flex items-center space-x-3 text-indigo-300 hover:text-white w-full p-3 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
