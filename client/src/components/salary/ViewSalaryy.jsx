import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const ViewSalaryy = () => {
  const [salaries, setsalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await api.get(
        `/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      console.log("Salary data:", response.data.salary);

      if (response.data.success) {
        // Ensure the API response is always an array
        const salaryData = Array.isArray(response.data.salary)
          ? response.data.salary
          : [];
        setsalaries(salaryData);
        setFilteredSalaries(salaryData);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      (salary.employeeId?.employeeId || salary.employeeId || "")
        .toLowerCase()
        .includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-center relative">
              {/* Button on the left */}
              <button
                onClick={() => navigate("/admin-dashboard/employees")}
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
                  Salary History
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <input
                type="text"
                placeholder="Search by Employee ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={filterSalaries}
              />
            </div>

            {/* Table */}
            {filteredSalaries.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          SNO
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Emp ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Salary
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Allowances
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Deduction
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Pay Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredSalaries.map((salary) => (
                        <tr
                          key={salary.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {sno++}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {salary.employeeId?.employeeId ||
                              salary.employeeId ||
                              "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            ${salary.basicSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-green-600 font-medium">
                            ${salary.allowances.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-red-600 font-medium">
                            ${salary.deductions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            ${salary.netSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {salary.payDate
                              ? new Date(salary.payDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Records Found
                </h3>
                <p className="text-gray-500">No salary records to display</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSalaryy;
