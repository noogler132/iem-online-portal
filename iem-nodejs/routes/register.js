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
            res.render('login/register', {err: '', title: 'IEM', user: user, email: req.session.email, u_id: req.session.uid});
    }
});

/* POST registration page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var u_id = req.session.uid;
    var email = req.session.email;
    var u_reg = req.body.u_reg;
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var dob = req.body.dob;
    var dept = req.body.dept;
    var add_year = req.body.add_year;
    var contact = req.body.contact;

    if( u_id === '' || email === '' || u_reg === '' || f_name === '' || l_name === '' || dob === '' || dept === '' || add_year === '' || contact === ''){
        res.render('login/register', {err: 'All fields are mandatory', title: 'IEM', user: user, email: req.session.email, u_id: req.session.uid});
        return;
    }
    var arr =[u_id, email, u_reg, f_name, l_name, dob, dept, add_year, contact];
    db.query("Insert into student_details(u_roll, email, u_reg, f_name, l_name, dob, dept, add_year, contact) values (?,?,?,?,?,?,?,?,?)",
        arr, function (err, result, fields) {
        if (err) throw err;
        res.redirect('/');
    });

});


module.exports = router;