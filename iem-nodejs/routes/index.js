var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = checkSession(req);
  res.render('index', { title: 'IEM', user: user });
});

module.exports = router;
