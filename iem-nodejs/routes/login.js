var express = require('express');
var router = express.Router();
var passport = require('passport');





/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'the Students Portal', message: ''});

});

/* POST login page */
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/login/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;

