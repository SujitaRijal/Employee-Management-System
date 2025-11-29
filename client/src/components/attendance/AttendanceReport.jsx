import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const[loading,setLoading]=useState(false)

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(
        `http://localhost:4000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
      setLoading(false)
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip,dateFilter]);

  const handleLoadmore=()=>{
    setSkip((prevSkip)=> prevSkip + limit);
  }
  return(
     <div className="p-5">
     <div className='text-center'>
            <h2 className='text-3xl font-bold mb-2'>Attendance Report</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <div>
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input type="date"  className="border bg-gray-100 mb-4"
        onChange={(e)=>{
          setDateFilter(e.target.value);
          setSkip(0)
        }}
        />
        </div>
        {loading ? <div>Loading...</div> : Object.entries(report).map(([date,record])=>(
          <div className="border-b mt-4 " key={date}>
            <h2 className="text-xl font-semibold mb-4">{date}</h2>
            <table className="border-collapse border border-gray-300  text-left min-w-[500px]" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>S No</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {record.map((data,i)=>(
              <tr key={data.employeeId}>
                <td>{i+1}</td>
                <td>{data.employeeId}</td>
                <td>{data.employeeName}</td>
                <td>{data.departmentName}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
          
  )

  )}
  <button className="px-2 py-1 border bg-blue-500 text-lg font-semibold mt-2 text-white"
          onClick={handleLoadmore}
          >Load More</button>
</div>
)
}

export default AttendanceReport;
