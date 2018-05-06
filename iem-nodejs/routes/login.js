var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var checkSession = require('./isLoggedIn');
// var passwordValidator = require('password-validator');


/* GET students login page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(user.isLoggedIn) {
        if(req.session.redirect !== ''){
            res.redirect(req.session.redirect)
        }
        else {
            res.redirect('/');
        }
        return;
    }
    res.render('login/login', {isLoggedIn: false, user: user, err: '' });

});


/* POST students login page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var session_user = checkSession(req);

    if(user.isLoggedIn) {
        if(req.session.redirect !== ''){
            res.redirect(req.session.redirect)
        }
        else {
            res.redirect('/');
        }
        return;
    }
    var user = req.body.username;
    var pass = req.body.password;
    if(user === undefined || pass === undefined){
        res.render('login/login', {title: 'the Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
        return;
    }
    if(user === '' || pass === ''){
        res.render('login/login', {title: 'the Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
        return;
    }
    db.query("SELECT * FROM auth WHERE u_id = ?", user, function (err, result) {
        if (result.length === 0)
        {
            res.render('login/login', {title: 'the Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });

        }
        else {
            bcrypt.compare(pass, result[0].password, function (err, pass)
            {
                if(pass)
                {
                    var dbquery = '';
                    if(result[0].log_as === 'stu'){
                        dbquery = "SELECT * FROM student_details WHERE u_roll = ?";
                    }
                    else if(result[0].log_as === 'tch'){
                        dbquery = "SELECT * FROM teacher_details WHERE  tch_id = ?";
                    }
                    db.query(dbquery, user, function (err, resultName) {
                        if(result[0].log_as === 'stu' && (resultName.length !== 0)){
                            var add_year = resultName[0].add_year;
                            var date = new Date();
                            var currentyear = date.getFullYear();
                            var stu_year = (currentyear - add_year);
                            var sem = 0;
                            var register = 0;
                            if(stu_year === 0)
                            {
                                if(date.getMonth() >= 0 && date.getMonth() <5){
                                    sem = 2;
                                    console.log(sem);
                                }
                                else if(date.getMonth() >= 5 && date.getMonth() <12) {
                                    sem = 1;
                                }
                            }
                            else if(date.getMonth() >= 0 && date.getMonth() <5){
                                sem = 2 * stu_year;
                                console.log(sem);
                            }
                            else if(date.getMonth() >= 5 && date.getMonth() <12) {
                                sem = stu_year;
                            }
                            console.log(sem);
                            // var f_name = resultName[0].f_name;
                            // var dept = resultName[0].dept;
                            req.session.username = resultName[0].f_name;
                            req.session.u_id = user;
                            req.session.as = result[0].log_as;
                            req.session.password = result[0].password;
                            req.session.sem = sem;
                            req.session.dept = resultName[0].dept;
                            req.session.email = result[0].email;
                            req.session.save();
                        }
                        else if(result[0].log_as === 'tch' && (resultName.length !== 0)){
                            // var f_name = resultName[0].f_name;
                            // var dept = '';
                            req.session.username = resultName[0].f_name;
                            req.session.u_id = user;
                            req.session.as = result[0].log_as;
                            req.session.password = result[0].password;
                            req.session.email = result[0].email;
                            req.session.save();
                        }
                        else
                        {
                            // var f_name = 'Unregistered';
                            register = 1;
                            // var dept = '';
                            req.session.username = 'Unregistered';
                            req.session.u_id = user;
                            req.session.as = result[0].log_as;
                            req.session.password = result[0].password;
                            req.session.email = result[0].email;
                        }
                        // req.session.username = f_name;
                        // req.session.u_id = user;
                        // req.session.as = result[0].log_as;
                        // req.session.password = result[0].password;
                        // req.session.sem = sem;
                        // req.session.dept = dept;
                        // req.session.email = result[0].email;
                        // req.session.save();
                        console.log(req.session);
                        if(register){
                            res.redirect('/register');
                            return;
                        }
                        if(req.session.redirect !== '' && req.session.redirect){
                            res.redirect(req.session.redirect);
                            return;
                        }
                        else {
                            res.redirect('/');
                            return;
                        }
                    });
                }
                else {
                    res.render('login/login', {title: 'the Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
                    return;
                }
            });
        }
    });
});


// /* GET teachers login page. */
// router.get('/tch', function(req, res, next) {
//     var user = checkSession(req);
//     if(!user.isLoggedIn) {
//         res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: user, err: '' });
//     }
//     else{
//         res.redirect('/');
//     }
// });


// /* POST teachers login page. */
// router.post('/tch', function(req, res, next) {
//     var user = req.body.username;
//     var pass = req.body.password;
//     var session_user = checkSession(req);
//     db.query("SELECT password FROM auth WHERE u_id = ? AND log_as = 'tch' ", user, function (err, result, fields) {
//         if (err) throw err;
//         if (result.length === 0)
//         {
//             res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
//
//         }
//         else {
//             bcrypt.compare(pass, result[0].password, function (err, r)
//             {
//                 if(r)
//                 {
//                     db.query("SELECT * FROM teacher WHERE tch_id = ?", user, function (err, resultName) {
//                         req.session.username = resultName[0].f_name;
//                         req.session.u_id = user;
//                         req.session.as = 'tch';
//                         req.session.password = result[0].password;
//                         req.session.save();
//                         console.log(req.session);
//                         res.redirect('/');
//                     });
//                 }
//                 else {
//                     console.log("no match");
//                     res.render('login', {title: 'the Teachers Portal', isLoggedIn: false, user: session_user, err: 'Incorrect Username or Password' });
//                 }
//             });
//         }
//     });
// });

/* GET logout page. */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        // cannot access session here
    });
    res.redirect('/');
});


module.exports = router;

