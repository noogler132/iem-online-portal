var express = require('express');
var router = express.Router();
var ValidatePassword = require('validate-password');
var bcrypt = require('bcryptjs');
var checkSession = require('./isLoggedIn');


/* GET password reset email page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(!req.session.password) {
        res.render('login/forgot_password_id', {err: '', user: user});
    }
    else if(req.session.uid && req.session.password)
    {
        res.redirect('/password-reset/sendingOTP');
    }
});

/* POST password reset email page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var u_id = req.body.username;
    db.query("SELECT * FROM auth WHERE u_id = ?", u_id, function (err, result) {
        if(result.length === 0){
            res.render('login/forgot_password', {err: 'Invalid Username', user: user});
        }
        else{
            req.session.uid = u_id;
            req.session.mail = result[0].email;
            console.log(req.session);
            res.redirect('/password-reset/sendingOTP');
        }
    });
});

/* POST password reset email page. */
router.post('/sendingOTP', function(req, res, next) {
    var user = checkSession(req);
    var OTP = Math.floor(Math.random() * 999999) + 105555;
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };
    var mailer = require('../supporting_codes/mailer');

    /* Set new OTP as user password */
    bcrypt.hash(OTP, 8, function(err, hash) {
        // Store hash in your password DB.
        db.query("UPDATE auth SET password = ? WHERE u_id = ?", hash, req.session.username, function (err, result) {
            if (err) throw err;
            maildata.subject = 'Your Password Reset Code Is Here';
            maildata.text = ' Enter this OTP to reset your password: '+ OPT;
            mailer(maildata, req.session.mail);
            res.render('login/forgot_password_id', {err: '', user: user, OTP: 0});
        })
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