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
        db.query("SELECT * FROM auth WHERE u_id = ?", req.session.uid, function (err, result, fields) {
            if (err) throw err;
            res.render('login/register', {title: 'IEM', user: user, email: result[0].email, u_id: result[0].u_id});
        });
    }
});

/* POST registration page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);

    });


module.exports = router;