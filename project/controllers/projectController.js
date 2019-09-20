
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const EmployeeProfile = mongoose.model('EmployeeProfile');
const Project = mongoose.model('Project');


router.get('/', (req, res) => {
    Project.find((err, doc) => {
        res.render("allProject/projectList", {
            list: doc
        });
    });
});

router.get('/add', (req, res) => {
    res.render("allProject/addProject");
});

router.post('/project_submit', (req, res) => {
    projectRecord(req, res);
});

function projectRecord(req, res) {
    var project = new Project();
    project.projectName = req.body.prname;
    project.technology = req.body.tchname;
    project.save((err, doc) => {
        if(!err) {
            res.redirect('/allProject/add');
        } else {
            console.log("Erorr in project record : " + err);
        }
    })
}

router.get('/:id', (req, res) => {
    Project.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("allProject/editProject", {
                project: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id, (er, doc) => {
        if(!er) {
            res.redirect("/dashboard");
        } else {
            console.log("Error during record delete in projectController : " + er);
        }
    });
});

// router.post('/submit', function(req, res) {
//     if(req.body._id == '') {
//         insertRecord(req, res);
//     } else {
//         updateRecord(req, res);
//     }
// });

router.post('/submit', (req, res) => {
    Project.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect("/allProject");
        } else {
            console.log("Error during update project in projectController : " + err);
        }
    });
});

module.exports = router;