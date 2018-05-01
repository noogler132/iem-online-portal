var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');


/* GET registration page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        req.session.redirect = '/register';
        res.redirect('/login');
    }
    else {
            res.render('login/register', {err: '', title: 'IEM', user: user, email: req.session.email, u_id: req.session.u_id, as: req.session.as});
    }
});

/* POST registration page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var u_id = req.session.u_id;
    var email = req.session.email;
    var u_reg = 'Undefined';
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var dob = req.body.dob;
    var contact = req.body.contact;
    var dept = 'Undefined';
    var add_year = 'Undefined';
    var facebook_id = 'Undefined';
    var googleplus_id = 'Undefined';
    var designation = 'Undefined';

    if (req.session.as === 'stu') {
        dept = req.body.dept;
        add_year = req.body.add_year;
        u_reg = req.body.u_reg;
    }
    else if (req.session.as === 'tch') {
        facebook_id = req.body.facebook_id;
        googleplus_id = req.body.googleplus_id;
        designation = req.body.designation;
    }


    if (u_id === '' || email === '' || u_reg === '' || f_name === '' || l_name === '' || dob === '' || dept === '' || add_year === ''
        || contact === '' || designation === '') {
        res.render('login/register', {
            err: 'All fields are mandatory',
            title: 'IEM',
            user: user,
            email: req.session.email,
            u_id: req.session.u_id,
            as: req.session.as
        });
        return;
    }
    if (req.session.as === 'stu'){
        var arr = [u_id, email, u_reg, f_name, l_name, dob, dept, add_year, contact];
        db.query("Insert into student_details(u_roll, email, u_reg, f_name, l_name, dob, dept, add_year, contact) values (?,?,?,?,?,?,?,?,?)",
            arr, function (err, result, fields) {
            if (err) throw err;
                res.redirect('/login/logout');
        });
    }
    else if(req.session.as === 'tch'){
        var arr = [u_id, email, f_name, l_name, dob, facebook_id, googleplus_id, contact, designation];
        db.query("Insert into teacher_details(tch_id, email, f_name, l_name, dob, facebook_id, googleplus_id, contact, designation) values (?,?,?,?,?,?,?,?,?)",
            arr, function (err, result, fields) {
                if (err) throw err;
                res.redirect('/login/logout');
            });
    }

});


module.exports = router;