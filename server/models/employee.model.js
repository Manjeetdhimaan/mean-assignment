const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Employee department is required'],
        trim: true
    },
    salary: {
        type: String || Number,
        required: [true, 'Employee salary is required'],
        trim: true
    }
}, {
    timestamps: true
});

mongoose.model('Employee', employeeSchema);