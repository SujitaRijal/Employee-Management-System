import React from 'react'
import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

const EmployeeDashboard = () => {
  return (
     <div className='flex bg-gray-200 min-h-screen'>
      <EmployeeSidebar/>
      <div className='flex-1 ml-64 h-screen '>
      <Navbar/>
     <div className='mt-24 px-4'>
      <Outlet/>  
        </div>
      </div>
      
    </div>
  )
}

export default EmployeeDashboard