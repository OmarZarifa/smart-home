import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiDashboardLine,
  RiDeviceLine,
  RiHome2Line,
  RiUser3Line,
  RiLogoutBoxLine,
  RiMenuLine,
  RiMicLine,
} from "react-icons/ri";

const navItems = [
  {
    icon: <RiDashboardLine size={24} />,
    label: "Dashboard",
    id: "dashboard",
    path: "/dashboard",
  },
  {
    icon: <RiDeviceLine size={24} />,
    label: "Devices",
    id: "devices",
    path: "/devices",
  },
  {
    icon: <RiHome2Line size={24} />,
    label: "Rooms",
    id: "rooms",
    path: "/rooms",
  },
  {
    icon: <RiMicLine size={24} />,
    label: "Voice Recognition",
    id: "voice",
    path: "/voice-recognition",
  },
  {
    icon: <RiUser3Line size={24} />,
    label: "Profile",
    id: "profile",
    path: "/profile",
  },
];

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1024;
      setIsSmallScreen(isSmall);

      // Only auto-collapse if it's a small screen
      if (isSmall) {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white shadow-md transition-all duration-300 fixed h-full z-10`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-gray-800">SmartHome</h2>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <RiMenuLine size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50">
            <RiLogoutBoxLine size={24} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
export { navItems };
