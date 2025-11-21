import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments,setDepartments]=useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();


    useEffect(() => {
      const getDepartments = async () => {
        try {
          const fetchedDepartments = await fetchDepartments();
          setDepartments(fetchedDepartments || []);
        } catch (error) {
          console.error("Error fetching departments:", error);
          setDepartments([]);
        } finally {
          setLoading(false);
        }
      };
      getDepartments();
    }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Employee Data:", response.data);
        if (response.data.success) {
            const employee =response.data.employee;
          setEmployee((prev)=>({
            ...prev,
            name:employee.userId.name,
            maritalStatus:employee.maritalStatus,
            designation:employee.designation,
            salary:employee.salary,
            department:employee.department
            
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);


  const handleChange = (e) => {
    const { name, value} = e.target;
      setEmployee((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-32 bg-white p-8 rounded-md shadow-md">
      <div className="mb-8 flex items-center justify-center relative">
  {/* Button on the left */}
  <button 
    onClick={() => navigate('/admin-dashboard/employees')}
    className='absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
  >
    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>

  {/* Header in the center */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">
      Edit Employee Details
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
  </div>
</div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              placeholder="Enter Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={employee.salary}
              placeholder="Enter Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
                value={employee.department}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {loading ? (
                <option disabled>Loading Departments...</option>
              ) : (
                departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Edit Employee
        </button>
      </form>
    </div>
    ):( <div>Loading....</div>
    )}
        </>
  );
};
export default EditEmployee;
