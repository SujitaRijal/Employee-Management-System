import Employee from "../models/employeeModel.js"
import Leave from "../models/leaveModel.js";
import Department from "../models/departmentModel.js";

const getSummary=async(req,res)=>{
try {
    const totalEmployees=await Employee.countDocuments();

    const totalDepartments=await Department.countDocuments();

    const totalSalaries=await Employee.aggregate([  //aggregate pipeline->.group fields based on id
        {$group: {_id:null,  totalSalary:{$sum:'$salary'}}} //null->group al the documents
    ])

    const employeeAppliedForLeave=await Leave.distinct('employeeId')

    const leaveStatus=await Leave.aggregate([
        {$group:{
            _id:'$status',
            count:{$sum : 1}
        }}

    ])

    const leaveSummary={
        appliedFor:employeeAppliedForLeave.length,
        approved:leaveStatus.find(item=>item._id==="Approved")?.count || 0,
        rejected:leaveStatus.find(item=>item._id==="Rejected")?.count || 0,
        pending:leaveStatus.find(item=>item._id==="Pending")?.count || 0,
    }

    return res.status(200).json({
        success:true,
        totalEmployees,
        totalDepartments,
        totalSalary:totalSalaries[0]?.totalSalary || 0,
        leaveSummary
    })

    

} catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, error:"dashboard summary error"})
    
}
}

export {getSummary}