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

/* GET syllabus page */
router.get('/syllabus', function(req, res, next) {
    var user = checkSession(req);
    res.render('syllabus', { title: 'IEM', user: user });
});
/* GET contact us page */
router.get('/contact_us', function(req, res, next) {
    var user = checkSession(req);
    res.render('contact_us', { title: 'IEM', user: user });
});

/* GET About us page */
router.get('/about', function(req, res, next) {
    var user = checkSession(req);
    console.log(req.session);
    res.render('about', { title: 'IEM', user: user });
})


module.exports = router;
