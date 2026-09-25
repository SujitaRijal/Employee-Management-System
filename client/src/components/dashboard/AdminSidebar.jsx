import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {AiOutlineFileText} from "react-icons/ai"

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/admin-dashboard/employees", icon: <FaUsers />, label: "Employees" },
    { path: "/admin-dashboard/departments", icon: <FaBuilding />, label: "Departments" },
    { path: "/admin-dashboard/leaves", icon: <FaCalendarAlt />, label: "Leaves" },
    { path: "/admin-dashboard/salary/add", icon: <FaMoneyBillWave />, label: "Salary" },
    { path: "/admin-dashboard/attendance", icon:<FaRegCalendarAlt />, label:"Attendance"},
    { path: "/admin-dashboard/attendance-report", icon:<AiOutlineFileText />, label:"Attendance Report"},

    { path: "/admin-dashboard/settings", icon: <FaCogs />, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-slate-900 to-slate-800 text-gray-200 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <FaBuilding className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">EMS Admin</h3>
          <p className="text-xs text-slate-400">Management Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1  px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            end={item.label === "Dashboard"}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? " bg-blue-600 text-white shadow-md"
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

export default AdminSidebar;
