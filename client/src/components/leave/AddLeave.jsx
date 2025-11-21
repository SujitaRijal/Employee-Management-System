import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import axios from 'axios';


const AddLeave = () => {
    const navigate=useNavigate();
    const {user} = useAuth()

    const [leave,setLeave]=useState({
        userId: user._id,

    })

    
    const handleChange =(e)=>{
        const {name, value}=e.target
        setLeave((prevState)=>({...prevState, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
        const response = await axios.post(
          `http://localhost:4000/api/leave/add`,
          leave,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Employee Data:", response.data);
        if (response.data.success) {
          navigate('/employee-dashboard/leaves')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  return (
    <div className='max-w-4xl mx-auto mt-32 bg-white p-8 rounded-md shadow-md'>
          <div className="mb-8 flex items-center justify-center relative">
  {/* Button on the left */}
  <button 
    onClick={() => navigate('/employee-dashboard/leaves')}
    className='absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
  >
    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>

  {/* Header in the center */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">
      Request forleave
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
  </div>
</div> 
 <form onSubmit={handleSubmit}>
    <div className='flex flex-col space-y-4'>
        <div>
            <label className='block text-sm font-medium text-gray-700'>
                Leave Type
            </label>
            <select name="leaveType" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' required>
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
            </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* form date */}

            <div>
                 <label className='block text-sm font-medium text-gray-700'>
                From Date
            </label>
            <input type="date" name='startDate' onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' required/>
            </div>

            {/* to date */}
            <div>
            <label className='block text-sm font-medium text-gray-700'>
                To Date
            </label>
             <input type="date" name='endDate' onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' required/>
            </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea name="reason"  placeholder="Valid reason for leave " onChange={handleChange} className='w-full border border-gray-300'></textarea>
            </div>
            
        </div>
        <button type='submit' className='bg-blue-600 w-full mt-6 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md'>Add Leave</button>

    </form> 

    </div>
  )
}

export default AddLeave