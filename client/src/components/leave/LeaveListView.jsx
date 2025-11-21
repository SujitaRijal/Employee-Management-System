// // // import React, { useEffect, useState } from "react";
// // // import { Link, useParams } from "react-router-dom";
// // // import axios from "axios";
// // // import { useAuth } from "../../context/authContext";

// // // const LeaveListView = () => {
// // //   const [leaves, setLeaves] = useState([]);
// // //   const [filterLeaves, setFilteredLeaves] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   let sno = 1;
// // //   const { id } = useParams();
// // // const { user } = useAuth();
// // // const employeeId = id || user._id; // <-- fixed

// // // const fetchLeaves = async () => {
// // //   if (!employeeId) {
// // //     console.error("employeeId is undefined!");
// // //     return;
// // //   }
// // //   setLoading(true);
// // //   try {
// // //     const response = await axios.get(
// // //       `http://localhost:4000/api/leave/${employeeId}`,
// // //       {
// // //         headers: {
// // //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// // //         },
// // //       }
// // //     );
// // //     console.log("Leave API response:", response.data);

// // //     if (response.data.success) {
// // //       setLeaves(response.data.leaves || []);
// // //       setFilteredLeaves(response.data.leaves || []);
// // //     }
// // //   } catch (error) {
// // //     console.error("Error fetching leaves:", error.response || error.message);
// // //     alert("Failed to fetch leaves.");
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };


// // // useEffect(() => {
// // //   fetchLeaves();
// // // }, [employeeId]);


// // //   //   const fetchLeaves = async () => {
// // //   //     setLoading(true);
// // //   //     try {
// // //   //       const response = await axios.get(`http://localhost:4000/api/leave/${employeeId}`, {
// // //   //         headers: {
// // //   //           Authorization: `Bearer ${localStorage.getItem('token')}`,
// // //   //         },
// // //   //       });
// // //   // console.log(response.data)
// // //   //       if (response.data.success) {
// // //   //         const leavesData = response.data.leaves || [];
// // //   //         setLeaves(leavesData);
// // //   //         setFilteredLeaves(leavesData);
// // //   //       }
// // //   //     } catch (error) {
// // //   //       console.error(error);
// // //   //       alert(error.message || 'Failed to fetch leaves');
// // //   //     } finally {
// // //   //       setLoading(false);
// // //   //     }
// // //   //   };

// // //   //   useEffect(() => {
// // //   //     fetchLeaves();
// // //   //   }, [id]);

// // //   const handleFilter = (e) => {
// // //     const value = e.target.value.toLowerCase();
// // //     const records = leaves.filter((leave) =>
// // //       leave.leaveType.toLowerCase().includes(value)
// // //     );
// // //     setFilteredLeaves(records);
// // //   };

// // //   // Helper function to get the color class based on status
// // //   const getStatusColor = (status) => {
// // //     switch (status.toLowerCase()) {
// // //       case "approved":
// // //         return "text-green-600";
// // //       case "rejected":
// // //         return "text-red-600";
// // //       case "pending":
// // //         return "text-gray-600";
// // //       default:
// // //         return "text-gray-600"; // fallback
// // //     }
// // //   };

// // //   if (loading) return <div>Loading...</div>;

// // //   return (
// // //     <div className="p-6">
// // //       <div className="text-center">
// // //         <h3 className="text-3xl font-bold mb-4">Manage Leaves</h3>
// // //         <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
// // //       </div>

// // //       <div className="flex justify-between items-center mt-4 mb-2">
// // //         <input
// // //           type="text"
// // //           placeholder="Search Employee leaves..."
// // //           onChange={handleFilter}
// // //           className="border px-2 py-1 rounded-lg w-full md:w-1/3"
// // //         />
// // //         {user.role === "employee" && (
// // //           <Link
// // //             to="/employee-dashboard/add-leave"
// // //             className="px-4 py-1 bg-blue-600 rounded text-white"
// // //           >
// // //             Add New Leave
// // //           </Link>
// // //         )}
// // //       </div>

// // //       <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead className="bg-gray-800 text-white uppercase">
// // //               <tr>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   SNO
// // //                 </th>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   Leave Type
// // //                 </th>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   From
// // //                 </th>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   To
// // //                 </th>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   Description
// // //                 </th>
// // //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// // //                   Status
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-200">
// // //               {filterLeaves.length === 0 ? (
// // //                 <tr>
// // //                   <td
// // //                     colSpan={6}
// // //                     className="px-6 py-4 text-center text-gray-500"
// // //                   >
// // //                     No leaves found
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 filterLeaves.map((leave) => (
// // //                   <tr
// // //                     key={leave._id}
// // //                     className="hover:bg-gray-50 transition-colors"
// // //                   >
// // //                     <td className="px-6 py-4 text-sm text-gray-700">{sno++}</td>
// // //                     <td className="px-6 py-4 text-sm font-medium text-gray-700">
// // //                       {leave.leaveType}
// // //                     </td>
// // //                     <td className="px-6 py-4 text-sm text-gray-700 font-medium">
// // //                       {new Date(leave.startDate).toLocaleDateString()}
// // //                     </td>
// // //                     <td className="px-6 py-4 text-sm text-gray-700 font-medium">
// // //                       {new Date(leave.endDate).toLocaleDateString()}
// // //                     </td>
// // //                     <td className="px-6 py-4 text-sm text-gray-700 font-medium">
// // //                       {leave.reason}
// // //                     </td>
// // //                     <td
// // //                       className={`px-6 py-4 text-sm font-medium ${getStatusColor(
// // //                         leave.status
// // //                       )}`}
// // //                     >
// // //                       {leave.status}
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LeaveListView;


// // import React, { useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import axios from "axios";
// // import { useAuth } from "../../context/authContext";

// // const LeaveListView = () => {
// //   const [leaves, setLeaves] = useState([]);
// //   const [filterLeaves, setFilteredLeaves] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const { user } = useAuth();
// //  const {id}=useParams();
// //   const employeeId = id || user?.employee?._id;

// // // employee's _id

// //   let sno = 1;

// //   const fetchLeaves = async () => {
// //    if (!employeeId) {
// //   console.error("Employee ID not found for logged-in user");

// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:4000/api/leave/${employeeId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );
// // console.log(response.data)
// //       if (response.data.success) {
// //         setLeaves(response.data.leaves || []);
// //         setFilteredLeaves(response.data.leaves || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching leaves:", error.response || error.message);
// //       alert("Failed to fetch leaves.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLeaves();
// //   }, [employeeId]);

// //   const handleFilter = (e) => {
// //     const value = e.target.value.toLowerCase();
// //     setFilteredLeaves(
// //       leaves.filter((leave) => leave.leaveType.toLowerCase().includes(value))
// //     );
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "approved":
// //         return "text-green-600";
// //       case "rejected":
// //         return "text-red-600";
// //       case "pending":
// //         return "text-gray-600";
// //       default:
// //         return "text-gray-600";
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;

// //   return (
// //     <div className="p-6">
// //       <div className="text-center">
// //         <h3 className="text-3xl font-bold mb-4">My Leaves</h3>
// //         <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
// //       </div>

// //       <div className="flex justify-between items-center mt-4 mb-2">
// //         <input
// //           type="text"
// //           placeholder="Search leaves..."
// //           onChange={handleFilter}
// //           className="border px-2 py-1 rounded-lg w-full md:w-1/3"
// //         />
// //         <Link
// //           to="/employee-dashboard/add-leave"
// //           className="px-4 py-1 bg-blue-600 rounded text-white"
// //         >
// //           Add New Leave
// //         </Link>
// //       </div>

// //       <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-800 text-white uppercase">
// //               <tr>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">SNO</th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">Leave Type</th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">From</th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">To</th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {filterLeaves.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
// //                     No leaves found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 filterLeaves.map((leave) => (
// //                   <tr key={leave._id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-6 py-4 text-sm text-gray-700">{sno++}</td>
// //                     <td className="px-6 py-4 text-sm font-medium text-gray-700">{leave.leaveType}</td>
// //                     <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.startDate).toLocaleDateString()}</td>
// //                     <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.endDate).toLocaleDateString()}</td>
// //                     <td className="px-6 py-4 text-sm text-gray-700">{leave.reason}</td>
// //                     <td className={`px-6 py-4 text-sm font-medium ${getStatusColor(leave.status)}`}>{leave.status}</td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LeaveListView;


// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/authContext";

// const LeaveListView = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [filterLeaves, setFilteredLeaves] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useAuth();
//   const { id } = useParams(); // for admin viewing a specific employee's leaves

//   // Determine employeeId:
//   // 1. If an admin is viewing a specific employee, use URL param `id`
//   // 2. Otherwise, for logged-in employee, use `user.employee._id`
//   const employeeId = id || user?._id;

// console.log("Employee ID used for fetching leaves:", employeeId);


//   useEffect(() => {
//     const fetchLeaves = async () => {
//       if (!employeeId) {
//         console.error("Employee ID not found for logged-in user");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/leave/${employeeId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         console.log("Leave API response:", response.data);

//         if (response.data.success) {
//           setLeaves(response.data.leaves || []);
//           setFilteredLeaves(response.data.leaves || []);
//         } else {
//           setLeaves([]);
//           setFilteredLeaves([]);
//         }
//       } catch (error) {
//         console.error("Error fetching leaves:", error.response || error.message);
//         alert("Failed to fetch leaves.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaves();
//   }, [employeeId]);

//   const handleFilter = (e) => {
//     const value = e.target.value.toLowerCase();
//     setFilteredLeaves(
//       leaves.filter((leave) =>
//         leave.leaveType.toLowerCase().includes(value)
//       )
//     );
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "text-green-600";
//       case "rejected":
//         return "text-red-600";
//       case "pending":
//         return "text-gray-600";
//       default:
//         return "text-gray-600";
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <div className="text-center">
//         <h3 className="text-3xl font-bold mb-4">My Leaves</h3>
//         <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
//       </div>

//       <div className="flex justify-between items-center mt-4 mb-2">
//         <input
//           type="text"
//           placeholder="Search leaves..."
//           onChange={handleFilter}
//           className="border px-2 py-1 rounded-lg w-full md:w-1/3"
//         />
//         {user?.role === "employee" && (
//           <Link
//             to="/employee-dashboard/add-leave"
//             className="px-4 py-1 bg-blue-600 rounded text-white"
//           >
//             Add New Leave
//           </Link>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-800 text-white uppercase">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">SNO</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Leave Type</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">From</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">To</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filterLeaves.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
//                     No leaves found
//                   </td>
//                 </tr>
//               ) : (
//                 filterLeaves.map((leave, index) => (
//                   <tr key={leave._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-700">{leave.leaveType}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.startDate).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.endDate).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{leave.reason}</td>
//                     <td className={`px-6 py-4 text-sm font-medium ${getStatusColor(leave.status)}`}>{leave.status}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveListView;


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const LeaveListView = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  const { user } = useAuth();
  const { id } = useParams(); // Admin can pass employeeId via URL
  const employeeId = id || user?._id; // Either URL param or logged-in user ID

  console.log("Employee ID used for fetching leaves:", employeeId);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!employeeId) {
        console.error("Employee ID not found for logged-in user");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leave/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Leave API response:", response.data);

        if (response.data.success) {
          setLeaves(response.data.leaves || []);
          setFilteredLeaves(response.data.leaves || []);
        } else {
          setLeaves([]);
          setFilteredLeaves([]);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error.response || error.message);
        alert("Failed to fetch leaves.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [employeeId]);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(value)
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "pending":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-center relative">
      <button 
    onClick={() => navigate('/admin-dashboard/employees')}
    className='absolute left-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
  >
    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">My Leaves</h3>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-2">
        <input
          type="text"
          placeholder="Search leaves..."
          onChange={handleFilter}
          className="border px-2 py-1 rounded-lg w-full md:w-1/3"
        />
        {user?.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-blue-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white uppercase">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">SNO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Leave Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">From</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filterLeaves.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No leaves found
                  </td>
                </tr>
              ) : (
                filterLeaves.map((leave, index) => (
                  <tr key={leave._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{leave.leaveType}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{leave.reason}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${getStatusColor(leave.status)}`}>{leave.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveListView;
