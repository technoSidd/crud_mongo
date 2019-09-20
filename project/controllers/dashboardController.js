const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const EmployeeProfile = mongoose.model('EmployeeProfile');
const Project = mongoose.model('Project');


router.get('/', (req, res) => {
    Employee.find().sort({ _id: -1 }).limit(3).exec((err, docs) => {
        Project.find().sort({ _id: -1 }).limit(3).exec((er, doc) => {
            if(docs && doc) {
                res.render("dashboard/index", {
                    employees:docs,
                    projects: doc
                });
            } else if(docs && !doc) {
                res.render("dashboard/index", {
                    employees: docs,
                    projects: []
                });
            } else if(!docs && doc) {
                res.render("dashboard/index", {
                    employees: [],
                    projects: doc
                });
            }
        });
    });
});

module.exports = router;