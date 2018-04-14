var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var checkSession = require('./isLoggedIn');
// var passwordValidator = require('password-validator');


/* GET temp test. */
router.get('/temp', function(req, res, next) {
    if(req.session.username) {
        res.render('temp');
    }
    else{
        res.redirect('/login');
    }
});


/* GET students login page. */
router.get('/stu', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        res.render('login', {title: 'the Students Portal', isLoggedIn: false, user: user, err: '' });
    }
    else{
        res.redirect('/');
    }
});


/* POST students login page. */
router.post('/stu', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var session_user = checkSession(req);
    var as = 'stu';
    db.query("SELECT password FROM auth WHERE u_id = ? AND log_as = 'stu' ", user, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0)
        {
            res.render('login', {title: 'the Students Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });

        }
        else {
            bcrypt.compare(pass, result[0].password, function (err, r)
            {
                if(r)
                {
                    db.query("SELECT * FROM student_details WHERE u_roll = ?", user, function (err, resultName) {
                        req.session.username = resultName[0].f_name;
                        req.session.uid = user;
                        req.session.as = 'stu';
                        req.session.password = result[0].password;
                        req.session.save();
                        console.log(req.session);
                        res.redirect('/');
                    });
                }
                else {
                    console.log("no match");
                    res.render('login', {title: 'the Students Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });;
                }
            });
        }
    });
});


/* GET teachers login page. */
router.get('/tch', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: user, err: '' });
    }
    else{
        res.redirect('/');
    }
});


/* POST teachers login page. */
router.post('/tch', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var session_user = checkSession(req);
    db.query("SELECT password FROM auth WHERE u_id = ? AND log_as = 'tch' ", user, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0)
        {
            res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });

        }
        else {
            bcrypt.compare(pass, result[0].password, function (err, r)
            {
                if(r)
                {
                    db.query("SELECT * FROM teacher WHERE tch_id = ?", user, function (err, resultName) {
                        req.session.username = resultName[0].f_name;
                        req.session.uid = user;
                        req.session.as = 'tch';
                        req.session.password = result[0].password;
                        req.session.save();
                        console.log(req.session);
                        res.redirect('/');
                    });
                }
                else {
                    console.log("no match");
                    res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
                }
            });
        }
    });
});


/* GET logout page. */
router.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.session.destroy(function(err) {
        // cannot access session here
        if(err) throw err;
    });
    console.log(req.session);
    res.redirect('/');
});


module.exports = router;

