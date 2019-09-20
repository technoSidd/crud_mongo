const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const JobType = mongoose.model('JobType');


router.get('/role', (req, res) => {
    JobType.find((err, docs) => {
        res.render("jobType/job", {
            list: docs,
            jobError: ''
        });
    });
});

router.post('/role', (req, res) => {
    JobType.find({jobName: req.body.jobt}, req.body, (error, docus) => {
        if(docus != '') {
            JobType.find((err, docs) => {
                res.render("jobType/job", {
                    list: docs,
                    jobError: 'This entry already exists.'
                });
            });
        } else {
            var jobType = new JobType();
            jobType.jobName = req.body.jobt;
            jobType.save((err, doc) => {
                if(!err) {
                    res.redirect('/addJob/role');
                } else {
                    console.log("Error in add job functionlity : " + err);
                }
            });
        }
    });
    
});

router.get('/role_submit')

module.exports = router;