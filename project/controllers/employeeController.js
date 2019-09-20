const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const EmployeeProfile = mongoose.model('EmployeeProfile');
const Project = mongoose.model('Project');

router.get('/create', function(req, res) {
    res.render("employee/addOrEdit", {
        viewTitle : "Insert Employee"
    });
});

router.get('/project', function(req, res) {
    res.render("employee/projects", {
        viewTitle : "Insert Employee"
    });
});

router.post('/store', function(req, res) {
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
            res.redirect('/employee');
        } else {
            //this cnondition for validation eror.
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
router.get('/', (req, res) => {
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
            case 'exp':
                body['expError'] = "Experience must be less than 20 Years.";
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
            EmployeeProfile.find({userId: req.params.id}, function(err, ep){
                if(ep != '') {
                    res.render("employee/edit", {
                        viewTitle: "Update Employee",
                        employee: doc,
                        ep: ep[0],
                        userEmail: doc.email
                    });
                } else {
                    res.render("employee/edit", {
                        viewTitle: "Update Employee",
                        employee: doc,
                        userEmail: doc.email
                    });
                }
            });
        }
    });
});

function updateRecord(req, res) {
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(req.body.fullName == '' || req.body.mobile == '' || req.body.city == '') {
            er = 'This is a required field.';
            erName = (req.body.fullName == '') ? er : '';
            erMobile = (req.body.mobile == '') ? er : ((req.body.mobile < 1111111111 || req.body.mobile > 9999999999) ? 'Mobile number should be of exact 10 digits.' : '');
            erCity = (req.body.city == '') ? er : '';
            if(!err) {
                EmployeeProfile.find({userId: req.body._id}, function(err, epp) {
                    res.render('employee/edit', {
                        employee: doc,
                        userEmail: doc.email,
                        ep: epp[0],
                        erName: erName,
                        erMobile: erMobile,
                        erCity: erCity
                    });
                });
            }   
        } else {
            if(!err) {
                EmployeeProfile.find({userId: req.body._id}, function(err, ep){
                    if(ep != '') {
                        ep[0].exp = req.body.exp;
                        ep[0].doj = req.body.doj;
                        ep[0].dept = req.body.dept;
                        ep[0].dob = req.body.dob;
                        ep[0].save((errors, docus) => {
                            if(!errors) {
                                res.redirect('/employee');
                            } else {
                                //this is for validation
                                if(errors.name == 'ValidationError') {
                                    handleValidationError(errors, req.body);
                                    res.render('employee/edit', {
                                        employee: req.body,
                                        ep: docus,
                                        userEmail: doc.email
                                    });
                                }
                            }
                        });
                    } else {
                        var employeeProfile = new EmployeeProfile();
                        employeeProfile.userId = req.body._id;
                        employeeProfile.exp = req.body.exp;
                        employeeProfile.doj = req.body.doj;
                        employeeProfile.dept = req.body.dept;
                        employeeProfile.dob = req.body.dob;
                        employeeProfile.save((errors, docus) => {
                            if(!errors) {
                                res.redirect('/employee');
                            } else {
                                if(errors.name == 'ValidationError') {
                                    handleValidationError(errors, req.body);
                                    // console.log(doc);
                                    res.render('employee/edit', {
                                        employee: req.body,
                                        ep: docus,
                                        userEmail: doc.email
                                    });
                                }
                            }
                        });
                    }
                });
            } else {
                if(errors.name == 'ValidationError') {
                    handleValidationError(errors, req.body);
                    // console.log(req.body);
                    res.render("employee/edit", {
                        viewTitle : "Insert Employee",
                        employee: req.body
                    });
                } else {
                    console.log('Error during record insertion : ' + errors);
                }
            }
        }
    });
}
//this is for deletion
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        EmployeeProfile.deleteOne({userId: req.params.id}, (error, docs) => {
            if(!error) {
                res.redirect('/employee');
            } else {
                console.log('Error in Employee delete : ' + error);
            }
        });
    })
});

router.get('/profile/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {
            EmployeeProfile.find({userId: req.params.id}, (error, docs) => {
                if(!error) {
                    res.render("employee/profile", {
                        employee: doc,
                        employeeProfile: docs[0]
                    });
                } else {
                    res.render("employee/profile", {
                        employee: doc
                    });
                }
            });
        } else {
            console.log('Error in Employee delete : ' + err);
        }
    })
});

module.exports = router;