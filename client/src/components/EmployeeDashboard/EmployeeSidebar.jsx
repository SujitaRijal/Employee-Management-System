import React from "react";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const EmployeeSidebar = () => {
  const { user, loading } = useAuth();

  // ⛔ Prevent crash before user loads
  if (loading || !user) return null;

  const menuItems = [
    { path: "/employee-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },

    { path: `/employee-dashboard/profile/${user?._id}`, icon: <FaUsers />, label: "My Profile" },

   
    { path: `/employee-dashboard/leaves`, icon: <FaBuilding />, label: "Leaves" },

    { path: `/employee-dashboard/salary/${user?._id}`, icon: <FaCalendar />, label: "Salary" },

    { path: "/employee-dashboard/setting", icon: <FaCogs />, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-slate-900 to-slate-800 text-gray-200 flex flex-col shadow-2xl">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <FaBuilding className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">EMS Employee</h3>
          <p className="text-xs text-slate-400">Management Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            end={item.label === "Dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
              }`
            }
          >
            <span className="text-lg text-white">{item.icon}</span>
            <span className="text-sm font-medium text-white">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-center">
        <p className="text-xs text-slate-400">© 2025 EMS Dashboard</p>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
