import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import attendanceRouter from './routes/attendance.js'

import dashboardRouter from './routes/dashboard.js'


const app=express();
const port=process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true}));

//API endpoints
app.get('/', (req,res)=>
    res.send("API is running..."));
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/attendance',attendanceRouter)
app.use('/api/dashboard',dashboardRouter)






app.listen(port, ()=>console.log(`Server is running on port ${port}`));