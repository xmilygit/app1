var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

var mongoose = require('mongoose');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var crypto = require('crypto')
  , key = 'xmilyxljxhh'

var db = require('./models/db');

var teacher = mongoose.model('Teacher');

passport.use(new LocalStrategy(
  function (username, password, done) {
    password = crypto.createHmac('sha1', key).update(password).digest('hex');
    teacher.findOne({ tMobile: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: '无效的用户名' }) }
      if (user.tPassword != password) {
        return done(null, false, { message: '无效的密码' });
      }
      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var routes = require('./routes/index');
var users = require('./routes/users');




var app = express();

app.engine('.xljx', exphbs({ defaultLayout: 'main', extname: '.xljx' }));
app.set('view engine', '.xljx');
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//定义新的视图引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
