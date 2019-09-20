
const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    projectName: {
        type: String
    },
    technology: {
        type: String
    }
});

mongoose.model('Project', projectSchema);