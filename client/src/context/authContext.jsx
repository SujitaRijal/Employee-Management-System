import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        const verifyUser=async()=>{
            try {
                const token=localStorage.getItem("token");
               if(token){
                const response=await axios.get("http://localhost:4000/api/auth/verify",{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
               })
                
                if(response.data.success){
                        setUser(response.data.user);
                }
                else{
                    setUser(null);
                    setLoading(false);
                }
            }
            } catch (error) {
             if(error.response && !error.response.data.success){
                setUser(null);
                localStorage.removeItem("token");
             }
            }finally{
                setLoading(false);
            }
    }
    verifyUser();
},[]);
    const login = (userData) => {
        setUser(userData);
        // optionally save token if exists
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    return (
        <userContext.Provider value={{ user, login, logout,loading }}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext);
export default AuthContext;
