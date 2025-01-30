const express = require('express');
const path = require('path');
const router = express.Router();
const employeesContoller = require('../../controllers/employeesController');



router.route('/').get(employeesContoller.getAllEmployees)
.post(employeesContoller.addEmployee)
.put(employeesContoller.updateEmployee)
.delete(employeesContoller.deleteEmployee);

router.route('/:id').get(employeesContoller .getEmployee);

module.exports = router;