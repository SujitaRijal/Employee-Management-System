import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addDepartment ,getDepartments,getDepartment, updateDepartment,deleteDepartment} from '../controllers/departmentController.js';


const router = express.Router();

router.get('/', userAuth, getDepartments)
router.post('/add', userAuth, addDepartment)
router.get('/:id', userAuth, getDepartment)
router.put('/:id', userAuth, updateDepartment)
router.delete('/:id', userAuth, deleteDepartment)





export default router;
