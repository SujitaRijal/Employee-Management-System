import React from 'react'
import { Link } from 'react-router-dom'
import {useState,  useEffect } from 'react';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import api from '../../utils/api';
import DataTable from 'react-data-table-component'; 
import { customStyles } from '../../utils/EmployeeHelper';

const EmployeeList = () => {
    const [employees,setEmployees]=useState([]);
    const [empLoading,setEmpLoading]=useState(false);
    const [filteredEmployee,setFilteredEmployee]=useState([])

     useEffect(()=>{
        const fetchEmployees=async()=>{
          setEmpLoading(true);
          try{
           const response =await api.get("/api/employee",{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token") }`
            }
           })
           if(response.data.success){
            let sno=1;
              const data=await response.data.employees.map((emp)=>(
                {
                  _id:emp._id,
                  sno:sno++,
                  dep_name:emp.department.dep_name,
                  name: emp.userId.name,
                  dob:new Date (emp.dob).toLocaleDateString(),
                  profileImage: <img width={40} height={40} className="rounded-full" src={`${import.meta.env.VITE_API_URL}/${emp.userId.profileImage}`} />,
                  action:(<EmployeeButtons _id={emp._id} />),
    
                }
              ))
              setEmployees(data);
              setFilteredEmployee(data)
              
           }
          }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
        }finally{
          setEmpLoading(false);
        }
      };
      fetchEmployees();
      },[]);

      const handleFilter = (e) => {
  const value = e.target.value.toLowerCase();
  const records = employees.filter((emp) =>
    emp.name.toLowerCase().includes(value)
  );
  setFilteredEmployee(records);
};

  return (
    <>{empLoading ? <div>Loading ...</div> : 
    <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-3xl font-bold mb-4'>Manage Employees</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text"
             placeholder='Search Employees...' 
            
            className='border px-2 py-1 rounded-lg w-full md:w-1/3'
            onChange={handleFilter}
            />
            <Link to="/admin-dashboard/add-employee"
             className='px-4 py-1 bg-blue-600 rounded text-white'>
                Add New Emloyees
             </Link>
        </div>
        <div className='mt-6'>
          <DataTable columns={columns} data={filteredEmployee} customStyles={customStyles} pagination/>
        </div>
    </div>
}</>
  )
}

export default EmployeeList