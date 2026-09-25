import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'

const RoleBasedRoutes = ({children,requiredRole}) => {
    const {user,loading}=useAuth();
    console.log("User:", user);
    console.log("Required Role:", requiredRole);
    if(loading){
     return <div>Loading...</div>
    }
    if(!requiredRole.includes(user?.role)){
        return <Navigate to="/unauthorized" />
    }
    
        return user ? children : <Navigate to="/login" />
 
  
}

export default RoleBasedRoutes