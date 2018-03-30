var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../config/dbconfig');
var bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            db.query("SELECT * FROM student_auth WHERE u_roll = ?", username, function (err, result)
            {
                if (err) throw err;
            });
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
};