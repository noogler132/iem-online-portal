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
        db.query("SELECT * FROM auth WHERE u_id = ?", req.session.uid, function (err, result) {
            sendOTP(req.session.uid, result[0].email);
        });
        res.render('login/forgot_password_OTP', {err: '', user: user, uid: req.session.uid})
    }
});

/* POST password reset email page. */
router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var u_id = req.body.username;
    db.query("SELECT * FROM auth WHERE u_id = ?", u_id, function (err, result) {
        if (err) throw err;
        if(result.length === 0){
            res.render('login/forgot_password_id', {err: 'Invalid Username', user: user});
        }
        else{
            req.session.uid = u_id;
            req.session.mail = result[0].email;
            console.log(req.session);
            sendOTP(u_id, result[0].email);
            res.render('login/forgot_password_OTP', {err: '', user: user, uid: req.session.uid})
        }
    });
});

/* Send OTP */
function sendOTP(u_id, mail) {
    console.log('OTP');
    var OTP = Math.floor(Math.random() * 99999999) + 105555;
    console.log('OTP done maildata starting');
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };

    console.log('----------bcrypt: '+ OTP);
    /* Set new OTP as user password */
     var hash = bcrypt.hashSync(OTP.toString(), 8);
            // Store hash in your password DB.
            console.log('------hash:' + hash);
            // Store hash in your password DB.
            console.log('-------inside');
            var arr = [u_id, hash];
            db.query('SELECT * FROM otp_store WHERE u_id = ?', u_id, function (err, result) {
                if(err) throw err;
                if(result.constructor === Array){
                    db.query('DELETE FROM otp_store WHERE u_id = ?', u_id, function (err, result) {
                        if(err) throw err;
                        doMail(arr, OTP, mail, maildata);
                    });
                }
                else{
                    doMail(arr, OTP, mail, maildata);
                }
            });
}
/* mail function */
function doMail(arr, OTP , mail, maildata){
    db.query('INSERT INTO otp_store(u_id, OTP) VALUES(?,?)', arr, function (err, result) {
        console.log('-----------update callback');
        if (err) throw err;
        var mailer = require('../supporting_codes/mailer');
        console.log('---no err in callback');
        maildata.subject = 'Your Password Reset Code Is Here';
        maildata.text = ' Enter this OTP to reset your password: ' + OTP;
        mailer(maildata, mail);
    });
}

/* POST OTP / after getting OTP. */
router.post('/newPassword', function(req, res, next) {
    var user = checkSession(req);
    if(!req.session.uid) {
        res.redirect('/password-reset');
        return;
    }
    console.log('---------/newPassword');
    var u_id = req.session.uid;
    var OTP = req.body.OTP;
    db.query("SELECT * FROM otp_store WHERE u_id = ?", u_id, function (err, result) {
        if(err) throw err;
        console.log('---------first query');
        bcrypt.compare(OTP, result[0].OTP, function (err, bool){
            console.log('---------bool:' + bool);
            if(bool){
                db.query('DELETE FROM otp_store WHERE u_id = ?', u_id, function (err, result) {
                    if(err) throw err;
                    console.log('---------2nd query');
                });
                res.render('login/pass_reset', { err: '', user: user });
            }
            else{
                res.render('login/forgot_password_OTP', {err: 'Incorrect OTP', user: user, uid: req.session.uid})
            }
        });
    });

});


/* POST password reset page. */
router.post('/processing', function(req, res, next) {
    var user = checkSession(req);
    var options = {
        enforce: {
            lowercase: true,
            uppercase: false,
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
        res.render('login/pass_reset', { err: passwordData.validationMessage , user: user });
    }
    else if(pass1!==pass2){
        res.render('login/pass_reset', { err: 'Passwords do not match' , user: user });
    }
    else{
        bcrypt.hash(pass1, 8, function(err, hash) {
            // Store hash in your password DB.
            db.query( 'UPDATE auth SET password = ? WHERE u_id= ?',[hash, req.session.uid], function (err, result) {
                if(err) throw err;
            });
        });
        res.redirect('/login/logout');
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