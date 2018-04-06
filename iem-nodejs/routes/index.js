var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = checkSession(req);
  console.log('____________');
  console.log( req.session);
  res.render('index', { title: 'IEM', user: user });
});

router.get('/syllabus', function(req, res, next) {
    var user = checkSession(req);
    res.render('syllabus', { title: 'IEM', user: user });
});

module.exports = router;
