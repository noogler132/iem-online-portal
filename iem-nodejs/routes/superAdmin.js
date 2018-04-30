var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');
var bcrypt = require('bcryptjs');


/* GET superAdmin home page */
router.get('/', function(req, res, next) {
    res.render('superAdmin/sections', {});
});

/* GET ADD USER */
router.get('/add-user', function(req, res, next) {
    res.render('superAdmin/add-user', {err: ''});
});

/* GET ADD USER */
router.get('/add-user-uploadxls', function(req, res, next) {
    res.render('superAdmin/add-user-uploadxls', {err: ''});
});

/* POST ADD USER */
router.post('/add-user', function(req, res, next) {
    var u_id = req.body.u_id;
    var email = req.body.email;
    var log_as = req.body.log_as;
    if(u_id === '' || email === ''){
        var err = 'All fields are mandatory';
        res.render('superAdmin/add-user', {err: err});
        return;
    }
    insertQuery(u_id, email, log_as);
});


/* Send OTP */
function insertQuery(u_id, email, log_as) {
    console.log('password');
    var password = Math.floor(Math.random() * 99999999) + 105555;
    /* Set new user password */
    var hash = bcrypt.hashSync(password.toString(), 8);
    // Store hash in your password DB.
    console.log('------hash:' + hash);
    // Store hash in your password DB.
    console.log('-------inside');
    var arr = [u_id, hash];
    db.query('INSERT INTO auth(u_id, email, password, log_as) VALUES (?,?,?,?) ', [u_id, email, hash, log_as], function (err, result) {
        if(err) throw err;
    });
    doMail(email, password)
}

/* mail function */
function doMail(mail, password){
        var mailer = require('../supporting_codes/mailer');
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };
        maildata.subject = 'IEM STUDENT PORTAL LOGIN';
        maildata.text = 'To Login use your University Roll Number as Username and ' + password + ' as your password';
        mailer(maildata, mail);
}





/* GET STUDENT DETAILS */
router.get('/students', function(req, res, next) {
    res.render('superAdmin/student-table', {});
});

/* GET TEACHERS DETAILS */
router.get('/teachers', function(req, res, next) {
    res.render('superAdmin/teacher-table', {});
});


router.get('/subjects', function(req, res, next) {
    res.render('superAdmin/subject-table', {});
});


module.exports=router;