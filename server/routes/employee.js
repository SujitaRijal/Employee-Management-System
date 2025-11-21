import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {addEmployee} from '../controllers/employeeController.js';
import { upload } from '../controllers/employeeController.js';
import {getEmployees} from '../controllers/employeeController.js';
import {getEmployee} from '../controllers/employeeController.js';
import {editEmployee} from '../controllers/employeeController.js';
import {fetchEmployeesByDepId} from '../controllers/employeeController.js'


const router = express.Router();

 router.get('/', userAuth, getEmployees)
router.post('/add', upload.single('image'), userAuth, addEmployee);
router.get('/:id', userAuth, getEmployee)
 router.put('/:id', userAuth, editEmployee);
 router.get('/department/:id', userAuth, fetchEmployeesByDepId)
// router.delete('/:id', userAuth, deleteDepartment)





export default router;
