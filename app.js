require('dotenv').load();
var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var debug      = require('debug')('astir_web:server');
var bodyParser = require('body-parser');
var passport   = require('passport');
var cors       = require('cors');
var http       = require("http");

require('./app_api/models/db');
require('./app_api/config/passport');

var eventsApiRouter = require('./app_api/routes/index');
var webAppClientRouter = require('./app_server/routes/index');

var app = express();
debug("Configuring Express app...");
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

app.use('/', webAppClientRouter);
app.use('/api/v1', eventsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Keeps application alive in Heroku
setInterval(function() {
  http.get("http://astir.herokuapp.com");
}, 1000*60*5);



debug("Express app configured.");
module.exports = app;
