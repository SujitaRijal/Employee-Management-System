import React from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";


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
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true, 
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirm) {
      try {
        const response = await api.delete(
          `/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={()=>handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
