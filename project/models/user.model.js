const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: Number
    },
    status: {
        type: Number,
        default: 1
    },
    jobType: {
        type: ObjectId
    }
});

mongoose.model('User', userSchema);

