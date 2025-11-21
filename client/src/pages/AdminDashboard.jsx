import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {
  return (
    <div className='flex bg-gray-200 min-h-screen'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 h-screen '>
      <Navbar/>
     <div className='mt-24 px-4'>
      <Outlet/>  
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard