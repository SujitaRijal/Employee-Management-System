import express from "express";
import { login, logout, register, resetPassword, sendVerifyOtp, verifyEmail } from "../controllers/authcontroller.js";
import userAuth from "../middleware/userAuth.js";
import { isAuthenticated } from "../controllers/authcontroller.js";
import { sendResetOtp } from "../controllers/authcontroller.js";
import { verify } from "../controllers/authcontroller.js";
const authRouter=express.Router();

authRouter.post('/register',register);
authRouter.post('/login', login);
authRouter.post('/logout',logout);
authRouter.get('/verify',userAuth,verify);


authRouter.post('/send-verify-otp',userAuth, sendVerifyOtp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.post('/is-auth',userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);





export default authRouter;


