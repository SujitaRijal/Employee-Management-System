import Attendance from '../models/attendanceModel.js'
import Employee from '../models/employeeModel.js'
const getAttendance=async(req,res)=>{

    try {
        const date=new Date().toISOString().split('T')[0]
        const attendance=await Attendance.find({date}).populate({
            path:"employeeId",
            populate:[
                "department",
                "userId"
            ]
        })
        res.status(200).json({success:true, attendance})

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
        
    }

}
const updateAttendance=async(req,res)=>{
    try {
        const {employeeId}=req.params
        const {status}=req.body
        const date=new Date().toISOString().split("T")[0]

        const employee=await Employee.findOne({employeeId})
        const attendance=await Attendance.findOneAndUpdate({employeeId: employee._id, date}, {status}, {new:true})
        res.status(200).json({success:true, attendance})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}
export {getAttendance,updateAttendance}