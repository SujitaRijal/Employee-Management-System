import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, customStyles } from "../../utils/LeaveHelper";
import axios from "axios";
const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves]=useState([]);
  const fetchleaves = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "N/A",
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24)
          ),

          status: leave.status,
         
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchleaves();
  }, []);

  const filerByInput=(e)=>{
    const data=leaves.filter((leave) =>
      leave.employeeId
    .toLowerCase()
    .includes(e.target.value.toLowerCase())
  );
  setFilteredLeaves(data)
  };
  const filterByButton=(status)=>{
    const data=leaves.filter((leave) =>
      leave.status
    .toLowerCase()
    .includes(status.toLowerCase())
  );
  setFilteredLeaves(data)
  };
  


  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Manage Leaves</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by EMployee Id..."
              className="border px-2 py-1 rounded-lg w-full md:w-1/3"
              onChange={filerByInput}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-900 "
              onClick={()=> filterByButton("Pending")}
              >
                Pending
              </button>
              <button className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-900 "
               onClick={()=> filterByButton("Approved")}
              >
                Approved
              </button>
              <button className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-900 "
               onClick={()=> filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-5">
          <DataTable columns={columns} data={filteredLeaves}
          customStyles={customStyles}
          pagination />
          </div>
        </div>
      ) : (
        <div>Loading... </div>
      )}
    </>
  );
};

export default LeaveList;
