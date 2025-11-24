import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { getSummary } from '../controllers/dashboardController.js';

const router=express.Router()

router.get('/summary', userAuth, getSummary )

export default router;