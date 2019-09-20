const mongoose = require('mongoose');

var jobTypeSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: 'This entry is already exist.'
    }
});

mongoose.model('JobType', jobTypeSchema);
