import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leave/detail/${id}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Leave Data:", response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);
   const changeStatus=async(id,status)=>{
       try {
        const response = await axios.put(
          `http://localhost:4000/api/leave/${id}`,
          {status},

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Leave Data:", response.data);
        if (response.data.success) {
          navigate('/admin-dashboard/leaves')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }

   }
  return (
    <>
      {leave ? (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-center relative">
              {/* Button on the left */}
              <button
                onClick={() => navigate("/admin-dashboard/leaves")}
                className="absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>

              {/* Header in the center */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  Leave Details
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="relative">
                    <img
                      src={`http://localhost:4000/${leave.employeeId.userId.profileImage}`}
                      className="w-36 h-36 rounded-lg border-4 border-white shadow-xl object-cover"
                      alt="Employee"
                    />
                  </div>
                  <div className="text-center md:text-left text-white flex-1">
                    <h3 className="text-3xl font-bold mb-3">
                      {leave.employeeId.userId.name}
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-2">
                         <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-md text-sm font-medium border border-white/30">
                        {leave.employeeId.department.dep_name}
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-md text-sm font-medium border border-white/30">
                        {leave.employeeId.employeeId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section - Clean Professional Layout */}
              <div className="p-8 md:p-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-gray-200">
                  Leave Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Name */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.employeeId.userId.name}
                    </p>
                  </div>

                  {/* Employee ID */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Employee ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.employeeId.employeeId}
                    </p>
                  </div>

                  {/* Leave Type */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                     Leave Type
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.leaveType}
                    </p>
                  </div>

                  {/* status */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Reason
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.reason}
                    </p>
                  </div>

                  {/* Department */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Department
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.employeeId.department.dep_name}
                    </p>
                  </div>

                 {/* Start Date */}
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Start Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date (leave.startDate).toLocaleDateString()}
                    </p>
                  </div>

                   <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      End Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date (leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {leave.status==="Pending" ? "Action": "Status"}
                    </p>
                    {leave.status=== "Pending" ? (
                        <div className="flex space-x-2">
                            <button className="px-4 py-1 bg-blue-600 hover:bg-blue-900"
                            onClick={()=> changeStatus(leave._id,"Approved")}
                            >Approve</button>
                            <button className="px-4 py-1 bg-red-400 hover:bg-red-600"
                            onClick={()=> changeStatus(leave._id,"Rejected")}
                            >Reject</button>

                        </div>
                    ):
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.status}
                    </p>
                    
                }
                    
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="inline-block h-12 w-12 border-4 border-gray-300 border-t-slate-700 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveDetail;
