var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');


/* GET registration page. */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    res.render('register', { title: 'IEM', user: user });
});


module.exports = router;