const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full Name is required.'
    },
    email: {
        type: String,
        required: 'Email is required.'
    },
    mobile: {
        type: Number,
        required: 'Contact Number is required.',
        min: 1111111111,
        max: 9999999999
    },
    city: {
        type: String,
        required: 'City is required.'
    }
});

employeeSchema.path('email').validate((val) => {
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

mongoose.model('Employee', employeeSchema);

