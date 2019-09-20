const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const JobType = mongoose.model('JobType');

router.get('/signup', (req, res) => {
    JobType.find((err, doc) => {
        if(!err) {
            res.render('auth/register', {
                list: doc
            });
        }
    });
});

router.post('/user_login', (req, res) => {
    var auth = new User();
    auth.email = req.body.uemail;
    auth.password = req.body.upass;
    auth.jobType = req.body.jobType;
    auth.save((err, docus) => {
        res.redirect('/dashboard');
    });
});

module.exports = router;