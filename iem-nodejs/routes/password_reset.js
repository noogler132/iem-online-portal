var express = require('express');
var router = express.Router();
var ValidatePassword = require('validate-password');
var bcrypt = require('bcryptjs');
var checkSession = require('./isLoggedIn');


/* GET password reset email page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(!req.session.uid) {
        res.render('login/forgot_password', {err: '', user: user});
    }
    else{
        res.redirect('/change-password/reset');
    }
});


/* POST password reset email page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var username = req.body.username;
    db.query("SELECT * FROM auth WHERE u_id = ?", username, function (err, result) {
        if(result.length === 0){
            res.render('login/forgot_password', {err: 'Invalid Username', user: user});
        }
        else{
            req.session.uid = username;
            console.log(req.session);
            res.redirect('/change-password/reset');
        }
    });
});


/* GET password reset page. */
router.get('/reset', function(req, res, next) {
    var user = checkSession(req);
    if(!req.session.uid) {
        res.redirect('/change-password');
    }
    else{
        res.render('login/pass_reset', {err: '', user: user});
    }
});


/* POST password reset page. */
router.post('/reset', function(req, res, next) {
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
        res.render('login/pass_reset', { err: 'Passwords do not match' });
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