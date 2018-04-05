var express = require('express');
var router = express.Router();
var ValidatePassword = require('validate-password');
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


/* GET login page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        res.render('login', {title: 'the Students Portal', isLoggedIn: false, user: user });
    }
    else{
        res.redirect('/');
    }
});


/* POST login page. */
router.post('/', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    db.query("SELECT password FROM student_auth WHERE u_roll = ?", user, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0)
        {
            console.log("Incorrect Username");
            //Message for incorrect username
            res.redirect('/login');
        }
        else {
            bcrypt.compare(pass, result[0].password, function (err, r)
            {
                if(r)
                {
                    db.query("SELECT * FROM student_details WHERE u_roll = ?", user, function (err, resultName) {
                        req.session.username = resultName[0].f_name;
                        req.session.uroll = user;
                        req.session.password = result[0].password;
                        req.session.save();
                        console.log(req.session);
                        res.redirect('/');
                    });
                }
                else {
                    console.log("no match");
                    res.redirect('/login');
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

/* GET password reset page. */
router.get('/password_reset', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        res.render('pass_reset', {err: '', user: user});
    }
    else{
        res.render('pass_reset', {err: '', user: user});
    }
});

/* POST password reset page. */
router.post('/password_reset', function(req, res, next) {
    var options = {
        enforce: {
            lowercase: true,
            uppercase: true,
            specialCharacters: false,
            numbers: true
        }
    };
    var validator = new ValidatePassword(options);
    var pass1 = req.body.password1;
    var pass2 = req.body.password2;
    var passwordData = validator.checkPassword(pass1);
    if (!passwordData.isValid)
    {
        res.render('pass_reset', { err: passwordData.validationMessage });
    }
    else if(pass1!==pass2){
        res.render('pass_reset', { err: 'Passwords do not match' });
    }
    else{

    }
});


// router.post('/password_reset', function(req, res, next) {
//     var validator = new passwordValidator();
//     validator
//         .is().min(8)                                    // Minimum length 8
//         .is().max(16)                                   // Maximum length 16
//         .has().uppercase()                              // Must have uppercase letters
//         // .has().lowercase()                              // Must have lowercase letters
//         // .has().digits()                                 // Must have digits
//         // .has().not().spaces();                          // Should not have spaces
//         // .is().not().oneOf(['Password', 'Password123']); // Blacklist these values
//     var pass1 = req.body.password1;
//     if (validator.validate(pass1))
//     {
//         res.render('pass_reset', { err: 'Password must contain ..........'});
//     }
//     var pass2 = req.body.password2;
// });

module.exports = router;

