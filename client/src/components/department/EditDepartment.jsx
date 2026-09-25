import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [deploading, setDeploading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      setDeploading(true);
      try {
        const response = await api.get(
          `/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDeploading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
    const response=await api.put(`/api/department/${id}`,department,{
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token") }`
        }
    })
    if(response.data.success){
        navigate("/admin-dashboard/departments")
}
} catch (error) {
    if(error.response && !error.response.data.success){
        alert(error.response.data.error)
    }
}
  }

  return (
    <>
      {deploading ? (
        <div>Loading....</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-32 bg-white p-8 rounded-md shadow-lg w-96 ">
          <div className="mb-8 flex items-center justify-center relative pl-16">
  {/* Button on the left */}
  <button 
    onClick={() => navigate('/admin-dashboard/departments')}
    className='absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
  >
    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>

  {/* Header in the center */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">
      Edit Department
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
  </div>
</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>

              <input
                type="text"
                name="dep_name"
                onChange={handleChange}
                value={department.dep_name}
                placeholder="Enter Department Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={department.description}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
