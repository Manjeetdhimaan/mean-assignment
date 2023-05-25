const mongoose = require('mongoose');

const Employee = mongoose.model('Employee');

// using promises
module.exports.getEmployees = (req, res, next) => {
    Employee.find().then(employees => {
        if (!employees || employees.length < 1) {
            return res.status(404).json({
                success: false,
                message: 'No employees found.'
            });
        } else {
            return res.status(200).json({
                success: true,
                employees: employees
            });
        }
    }).catch(err => {
        return next(err);
    })
}

// using async await
module.exports.getEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: 'No employee found!'
            });
        }
        return res.status(201).send({
            success: true,
            message: 'Employee data fetched succussfully!',
            employee: employee
        });
    } catch (err) {
        return next(err);
    }
};

module.exports.postEmployee = async (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        department: req.body.department,
        salary: req.body.salary
    });
    employee.save().then((saveEmployee) => {
        if (!saveEmployee) {
            return res.status(500).send({
                success: false,
                message: 'An error occured! Please try again.'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Employee data added succussfully!'
        });
    }).catch(err => {
        return next(err);
    })
}

module.exports.updateEmployee = (req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id).then((founededEmployee) => {
        if (!founededEmployee) {
            return res.status(404).send({
                success: false,
                message: 'No employee data found!'
            });
        }

        founededEmployee.name = req.body.name;
        founededEmployee.department = req.body.department;
        founededEmployee.salary = req.body.salary;

        founededEmployee.save().then((savedEmployee) => {
            if (!savedEmployee) {
                return res.status(503).send({
                    success: false,
                    message: 'Details can not be updated! Please try again.'
                });
            }
            return res.status(201).send({
                success: true,
                message: 'Updated succussfully!',
                employee: savedEmployee
            });
        }).catch(err => {
            return next(err);
        });
    }).catch(err => {
        return next(err);
    })
};

module.exports.deleteEmployee = (req, res, next) => {
    Employee.findByIdAndRemove(req.params.id).then((employee) => {
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: 'Data not found!'
            });
        }
        return res.status(201).send({
            success: true,
            message: 'Employee data deleted succussfully!'
        });
    }).catch(err => {
        return next(err);
    })
}