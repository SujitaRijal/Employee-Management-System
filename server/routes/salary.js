import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addSalary ,getSalary} from '../controllers/salaryController.js';


const router = express.Router();


router.post('/add', userAuth, addSalary)
router.get('/:id', userAuth, getSalary)







export default router;
