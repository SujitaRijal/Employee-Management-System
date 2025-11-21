import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { changePassword } from '../controllers/settingController.js'

const router=express.Router()

router.put('/change-password', userAuth, changePassword)
export default router