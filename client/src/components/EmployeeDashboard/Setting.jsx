import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx';
import api from '../../utils/api.js';



const Setting = () => {
    const navigate=useNavigate();
    const {user} =useAuth();
    const [setting,setSetting]=useState({
        userId:user._id,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    });

    const [error,setError]=useState(null);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setSetting({...setting,[name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            setError("Password not matched");
        }else{
            try{
                const response=await api.put("/api/setting/change-password",
                    setting,{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                if(response.data.success){
                    navigate('/employee-dashboard')
                    setError("")
                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error)
                }
            }
        }
    }
  return (
    <div className='max-w-2xl mx-auto mt-32 bg-white p-8 rounded-md shadow-md '>
         <div className="mb-8 flex items-center justify-center relative">
  {/* Button on the left */}
  <button 
    onClick={() => navigate('/employee-dashboard')}
    className='absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
  >
    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>

  {/* Header in the center */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">
     Change Password
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
  </div>
</div>
<p className='text-red-500'>{error}</p>
<form  onSubmit={handleSubmit}>
 {/* Department Name */}

 <div>
    <label className='text-sm font-medium text-gray-700'>
        Old Password
    </label>
    <input type="password" 
    name='oldPassword'
    placeholder='Change Password'
    onChange={handleChange}
    className='mt-1 w-full p-2 border border-gray-300 rounded-md' required
    />
 </div>

 <div>
    <label className='text-sm font-medium text-gray-700'>
        New Password
    </label>
    <input type="password"
    name='newPassword'
    placeholder='New Password'
    onChange={handleChange}
    className='mt-1 w-full p-2 border border-gray-300 rounded-md'
    required
    />
 </div>

 <div>
    <label className='text-sm font-medium text-gray-700' >Confirm Password</label>
    <input type="password" 
    name='confirmPassword'
    placeholder='Confirm Password'
    onChange={handleChange}
    className='mt-1 w-full p-2 border border-gray-300 rounded-md'
    required
    />
 </div>

 <button type='submit' className='w-full mt-6 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md'
 onClick={handleSubmit}
 
 >Change Password</button>

</form>
    </div>
  )
}

export default Setting