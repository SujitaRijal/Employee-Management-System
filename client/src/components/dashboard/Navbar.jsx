import React from "react";
import { useAuth } from "../../context/authContext";


const Navbar = () => {
  const { user ,logout } = useAuth();

  return (
    <div className="fixed top-0 left-64 right-0 z-20 h-23 bg-gradient-to-b from-slate-900 to-slate-800 text-gray-200 shadow-xl flex items-center px-6">
      
      <p className="text-white font-bold text-lg flex-1">
        WELCOME, {user.name}
      </p>
      
      <div className="flex items-center space-x-3 ">
      
<button 
  className="flex items-center text-white px-3 py-1.5 rounded-md transition duration-200 
             !bg-blue-600 hover:!bg-blue-900 " 
             onClick={logout}
>
  <span className="font-medium mr-2">Logout</span>
  
</button>

      </div>
    </div>
  );
};

export default Navbar;