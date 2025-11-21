import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { addLeave , getLeave ,getLeaves, getLeaveDetail, updateLeave} from '../controllers/leaveController.js';


const router=express.Router()

router.post('/add' , userAuth , addLeave)
 router.get('/:id' , userAuth , getLeave)
 
 router.get('/detail/:id' , userAuth , getLeaveDetail)
 
 
 router.get('/' , userAuth, getLeaves)
 router.put('/:id' , userAuth , updateLeave)


export default router


