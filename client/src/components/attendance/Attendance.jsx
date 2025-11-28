import React from 'react'
import { Link } from 'react-router-dom'
import {useState,  useEffect } from 'react';
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper.jsx';
import axios from 'axios';
import DataTable from 'react-data-table-component'; 
import { customStyles } from '../../utils/EmployeeHelper';

const Attendance = () => {
    const [attendance,setAttendance]=useState([]);
    const [loading,setLoading]=useState(false);
    const [filteredAttendance,setFilteredAttendance]=useState([])

    const statusChange=()=>{
    fetchAttendance();
    }

     const fetchAttendance=async()=>{
          setLoading(true);
          try{
           const response =await axios.get("http://localhost:4000/api/attendance",{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token") }`
            }
           })
           if(response.data.success){
            let sno=1;
              const data=await response.data.attendance.map((att)=>(
                {
                  employeeId:att.employeeId.employeeId,
                  sno:sno++,
                  department:att.employeeId.department.dep_name,
                  name: att.employeeId.userId.name,
                  action:(<AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />),
    
                }
              ))
              setAttendance(data);
              setFilteredAttendance(data)
              
           }
          }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
        }finally{
          setLoading(false);
        }
      };

     useEffect(()=>{
       
      fetchAttendance();
      },[]);

      const handleFilter = (e) => {
  const value = e.target.value.toLowerCase();
  const records = attendance.filter((att) =>
    att.employeeId.toLowerCase().includes(value)
  );
  setFilteredAttendance(records);
};

  return (
    <>{loading ? <div>Loading ...</div> : 
    <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-3xl font-bold mb-2'>Manage Attendance</h3>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center mt-4 gap-4'>
            <input type="text"
             placeholder='Search by Employee Id...' 
            
            className='border px-2 py-1 rounded-lg w-full md:w-1/5'
            onChange={handleFilter}
            />
            <p className="text-xl md:text-2xl text-center md:text-left">
              Mark Employees for {" "} <span className='font-bold underline'>{new Date().toISOString().split("T")[0]} {" "}</span>
            </p>
            <Link to="/admin-dashboard/attendance-report"
             className='px-4 py-1 bg-blue-600 rounded text-white'>
                Attendance Report
             </Link>
        </div>
        <div className='mt-6'>
          <DataTable columns={columns} data={filteredAttendance} customStyles={customStyles} pagination/>
        </div>
    </div>
}</>
  )
}

export default Attendance;