/* REQUIRED MODULES */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mysql = require('mysql');
// var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');

/* APP ROUTES */
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var ots = require('./routes/ots');
var register = require('./routes/register');
var pass_reset = require('./routes/password_reset');
var superAdmin = require('./routes/superAdmin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* PASSPORT CONFIG */
//require('./config/passport')(passport); // pass passport for configuration

/* DATABASE CONFIG */
db = require('./config/dbconfig');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'iemwebportal', resave: true, saveUninitialized: true, cookie: { maxAge: 21600000} }));


/* APP ROUTES URLS */
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/online-test', ots);
app.use('/password-reset', pass_reset);
app.use('/register', register);
app.use('/superAdmin', superAdmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  var user = {isLoggedIn: false, username: ''};
  res.render('error', {user: user});
});

//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


module.exports = app;