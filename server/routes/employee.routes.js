const express = require('express');
const router = express.Router();

const ctrlEmp = require('../controllers/employee.controller');

router.get('/get-employees', ctrlEmp.getEmployees);
router.get('/get-employee/:id',ctrlEmp.getEmployee);
router.post('/post-employee', ctrlEmp.postEmployee);
router.put('/update-employee/:id', ctrlEmp.updateEmployee);
router.delete('/delete-employee/:id', ctrlEmp.deleteEmployee);

module.exports = router;