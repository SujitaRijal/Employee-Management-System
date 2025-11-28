import React from 'react'
import axios from 'axios';
export const customStyles = {
  headCells: {
    style: {
      textTransform: "uppercase", // make column headers uppercase
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true, 
    width:"130px"
  },
   {
    name: "Employee Id",
    selector: (row) => row.employeeId,
    sortable: true, 
    width:"160px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width:"130px"
     
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true",
    
  },
];

export const AttendanceHelper = ({status,employeeId,statusChange}) => {
    const statusColors = {
    present: "bg-green-600 text-white text-[16px]",
    absent: "bg-red-600 text-white text-[16px]",
    sick: "bg-gray-600 text-white text-[16px]",
    leave: "bg-yellow-400 text-white text-[16px]",
  };
    const markEmployee=async(SelectedStatus,employeeId)=>{
        const response=await axios.put(`http://localhost:4000/api/attendance/update/${employeeId}`,{status:SelectedStatus},{
             headers:{
              Authorization:`Bearer ${localStorage.getItem("token") }`
            },

        })
        if(response.data.success){
            statusChange(SelectedStatus)
        }

        
    }
  return (
    <div>
      {status == null ? (
  <div>
    <div className="flex flex-wrap gap-4">

      <button
        className="px-3 py-1 bg-green-600 text-white rounded-lg font-semibold   text-sm"
        onClick={() => markEmployee("present", employeeId)}
      >
        Present
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold   text-sm"
        onClick={() => markEmployee("absent", employeeId)}
      >
        Absent
      </button>

      <button
        className="px-3 py-1 bg-gray-600 text-white rounded-lg font-semibold   text-sm"
        onClick={() => markEmployee("sick", employeeId)}
      >
        Sick
      </button>

      <button
        className="px-3 py-1 bg-yellow-500 text-black rounded-lg font-semibold   text-sm"
        onClick={() => markEmployee("leave", employeeId)}
      >
        Leave
      </button>

    </div>
  </div>
) : (
  <span
    className={`px-4 py-2 rounded-lg font-semibold shadow ${statusColors[status]}`}
  >
    {status.toUpperCase()}
  </span>
)}

        
    
    </div>
  )
}

