import express from "express";
import { getAttendance, updateAttendance } from "../controllers/attendanceController.js";
import userAuth from "../middleware/userAuth.js";
import defaultAttendance from '../middleware/defaultAttendance.js'


const router=express.Router();
router.get('/', userAuth, defaultAttendance,getAttendance)
router.put('/update/:employeeId', userAuth,updateAttendance)




export default router;