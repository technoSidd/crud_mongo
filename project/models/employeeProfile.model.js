const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var employeeProfileSchema = new mongoose.Schema({
    userId: {
        type: ObjectId
    },
    exp: {
        type: Number,
        max: 20
    },
    doj: {
        type: String
    },
    dept: {
        type: String
    },
    dob: {
        type: String
    }
});


mongoose.model('EmployeeProfile', employeeProfileSchema);