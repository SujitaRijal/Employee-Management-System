import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { customStyles } from '../../utils/DepartmentHelper.jsx';



const DepartmentList = () => {
  const [departments,setDepartments]=useState([]);
  const [deploading,setDeploading]=useState(false);
  const [filteredDepartments,setFilteredDepartments]=useState([]);

  const onDepartmentDelete= async(id)=>{
    const data=departments.filter((dep)=> dep._id !==id);
    setDepartments(data);

  }
  useEffect(()=>{
    const fetchDepartments=async()=>{
      setDeploading(true);
      try{
       const response =await axios.get("http://localhost:4000/api/department",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token") }`
        }
       })
       if(response.data.success){
        let sno=1;
          const data=await response.data.departments.map((dep)=>(
            {
              _id:dep._id,
              sno:sno++,
              dep_name:dep.dep_name,
              action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)

            }
          ))
          setDepartments(data);
          setFilteredDepartments(data);
       }
      }catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
    }finally{
      setDeploading(false);
    }
  };
  fetchDepartments();
  },[]);

  const filterDepartments=(e)=>{
    const records=departments.filter((dep)=>
       dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records);
  };
  return (
    <>{deploading ? <div>Loading ...</div> : 
    <div className='p-5'>
        <div className='text-center'>
            <h3 className='text-3xl font-bold mb-4'>Manage Departments</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search Departments...' 
            onChange={filterDepartments}
            className='border px-2 py-1 rounded-lg w-full md:w-1/3'/>
            <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-blue-600 rounded text-white'>Add New Department</Link>
        </div>
        <div className='mt-5'>
        <DataTable
        columns={columns}
        data={filteredDepartments}
        customStyles={customStyles}
        pagination
        />
        </div>
    </div>
}
    </>
  )
}

export default DepartmentList