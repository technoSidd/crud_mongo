const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
// const EmployeeProfile = mongoose.model('EmployeeProfile');

// router.get('/', function(req, res) {
//     res.render("employee/addOrEdit", {
//         viewTitle : "Insert Employee"
//     });
// });


router.post('/', function(req, res) {
    if(req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if(!err) {
            res.redirect('/employee/list');
        } else {
            //this cnosdition for validation eror.
            console.log(err.name);
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle : "Insert Employee",
                    employee: req.body
                });
            } else {
                console.log('Error during record insertion : ' + err);
            }
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err) {
            res.render("employee/list", {
                list: docs
            });
        } else {
            console.log("Error in retrieving employee list : " + err);
        }
    })
});

function handleValidationError(err, body) {
    for(field in err.errors) {
        switch(err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};
//get route for updation
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});
function updateRecord(req, res) {
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect('employee/list');
        } else {
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                    employee: req.body
                })
            } else {
                console.log('Error during Record Update : ' + err);
            }
        }
    });
}
//this is for deletion
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Error in Employee delete : ' + err);
        }
    })
})

// router.post('/', function(req, res) {
//     updateExtraRecord(req, res);
// });

// function updateExtraRecord(req, res) {
//     var emprofile = new EmployeeProfile();
//     emprofile.dob = req.body.dob;
//     emprofile.dept = req.body.dept;
//     emprofile.exp = req.body.exp;
//     emprofile.doj = req.body.doj;
//     emprofile.save();
// }

module.exports = router;