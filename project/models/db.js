const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true }, (err) => {
    if(!err) {
        console.log('MongoDB connection successed.');
    } else {
        console.log('Error in DB connnection : ' + err);
    }
});

require('./employee.model');
require('./employeeProfile.model');
require('./project.model');
require('./user.model');
require('./job.model');