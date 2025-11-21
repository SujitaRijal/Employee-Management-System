import React from 'react'
import { useNavigate } from 'react-router-dom'
export const customStyles = {
  headCells: {
    style: {
      textTransform: "uppercase", // make column headers uppercase
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
};

  export const columns=[
    {
        name:"S No",
        selector:(row)=>row.sno,
        width:'100px',
    },

     {
        name:"Emp ID",
        selector:(row)=>row.employeeId,
        width:'120px',
    },

     {
        name:"Name",
        selector:(row)=>row.name,
        width:'140px',
    },

     {
        name:"Leave Type",
        selector:(row)=>row.leaveType,
        width:'160px',
    },

     {
        name:"Department",
        selector:(row)=>row.department,
        width:'140px',
    },

     {
        name:"Days",
        selector:(row)=>row.days,
        width:'120px',
    },

      {
    name: "Status",
    cell: (row) => {
      const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
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

      return (
        <span className={`font-medium ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      );
    },
    width: "140px",
  },
    {
        name:"Action",
       cell: (row) => <LeaveButtons _id={row._id} />,
        width:"120px",
    },

  ]
  export const LeaveButtons =({_id})=>{

    const navigate=useNavigate();

    const handleView=(id)=>{
        navigate(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <button className='px-4 py-1 bg-blue-600 rounded text-white hover:bg-blue-900'
        onClick={()=> handleView(_id)}
        >View</button>
    );
  };

