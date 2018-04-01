var express = require('express');
var router = express.Router();
var ValidatePassword = require('validate-password');
var bcrypt = require('bcrypt');
// var passwordValidator = require('password-validator');


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'the Students Portal'});

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
        }
        console.log(result[0].password);
        bcrypt.compare(pass, result[0].password, function(err, r) {
            if(r)
            {
                console.log("match");
                console.log(req.session());
                req.session.username = user;
                req.session.password = pass;

                res.redirect('/');
            }
            else
            {
                console.log("no match");
                res.redirect('/login');
            }
        });
    });
});

/* GET password reset page. */
router.get('/password_reset', function(req, res, next) {
    res.render('pass_reset', { err: '' });

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
    var passwordData = validator.checkPassword(pass1);
    if (!passwordData.isValid)
    {
        res.render('pass_reset', { err: passwordData.validationMessage });
    }
    var pass2 = req.body.password2;
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

