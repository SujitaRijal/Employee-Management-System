import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'
import DepartmentList from './components/department/DepartmentList.jsx'
import AddDepartment from './components/department/AddDepartment.jsx'
import EditDepartment from './components/department/EditDepartment.jsx'
import EmployeeList from './components/employee/EmployeeList.jsx'
import AddEmployee from './components/employee/AddEmployee.jsx'
import ViewEmployee from './components/employee/ViewEmployee.jsx'
import EditEmployee from './components/employee/EditEmployee.jsx'
import AddSalary from './components/salary/AddSalary.jsx'
import ViewSalaryy from './components/salary/ViewSalaryy.jsx'
import LeaveList from './components/leave/LeaveList.jsx'
import Summary from './components/EmployeeDashboard/Summary.jsx'
import LeaveListView from './components/leave/LeaveListView.jsx'
import AddLeave from './components/leave/AddLeave.jsx'
import Setting from './components/EmployeeDashboard/Setting.jsx'
import LeaveDetail from './components/leave/LeaveDetail.jsx'
import Attendance from './components/attendance/Attendance.jsx'
import AttendanceReport from './components/attendance/AttendanceReport.jsx'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
               <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path='departments' element={<DepartmentList/>}></Route>
            <Route path='add-department' element={<AddDepartment/>}></Route>
            <Route path='department/:id' element={<EditDepartment/>}></Route>

            <Route path='employees' element={<EmployeeList/>}></Route>
            <Route path='add-employee' element={<AddEmployee/>}></Route>
            <Route path='employees/:id' element={<ViewEmployee/>}></Route>
            <Route path='employees/edit/:id' element={<EditEmployee/>}></Route>
            <Route path='employees/salary/:id' element={<ViewSalaryy/>} ></Route>


            <Route path='salary/add' element={<AddSalary />}></Route>


            <Route path='leaves' element={<LeaveList />}></Route>
            <Route path='leaves/:id' element={<LeaveDetail />}></Route>
            <Route path='employees/leaves/:id' element={<LeaveListView />}></Route>

            <Route path='settings' element={<Setting/>}></Route>

            <Route path='attendance' element={<Attendance/>}></Route>

            <Route path='attendance-report' element={<AttendanceReport/>}></Route>




        </Route>
        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>

          <EmployeeDashboard/>
            </RoleBasedRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<Summary/>}></Route>

            <Route path='profile/:id' element={<ViewEmployee />}></Route>
           
            <Route path='leaves' element={<LeaveListView />}></Route>
             <Route path="leaves/:id" element={<LeaveListView />} /> 
            <Route path='add-leave' element={<AddLeave />}></Route>
            <Route path='salary/:id' element={<ViewSalaryy/>}></Route>
            <Route path='setting' element={<Setting/>}></Route>




          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App