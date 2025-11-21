import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


const userAuth=async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(404).json({success:false, error:"Token not found"});
    }
    try {
        //decode token from cookie
        const tokenDecode= jwt.verify(token, process.env.JWT_SECRET);
       if(!tokenDecode){
        return res.status(404).json({success:false, error:'Unauthorized access'});
       }
       const user=await userModel.findById({_id:tokenDecode.id}).select('-password');
       if(!user){
        return res.status(404).json({success:false, error:'User not found'});
       }
         req.user=user;
        //execute our controller function
        next();

    } catch (error) {
      return res.status(500).json({success:false, error:'Unauthorized access'});  
    }
}

export default userAuth;


