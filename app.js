var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({ extended: false })); */
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos
app.use(function(req, res, next){
    // guardar path en session.redir para después de login
    if (!req.path.match(/\/login|\/logout/)){
        req.session.redir = req.path;
    }
    // Hacer visible req.session en las vistas
    res.locals.session = req.session;


    // Compruebo auto-logout
    if (req.session.user){ // Si hay usuario con sesión iniciada
        var timestamp = new Date().getTime();
        var tiempo_inactividad = timestamp - req.session.last_timestamp;
        if (tiempo_inactividad > 2 * 60 * 1000){
            // auto-logout si más de 2 minutos
            req.session.session_expired = true;
            // console.log("  ===================> Sesión expirada. <-------");
            delete req.session.user;
            req.session.errors = [{"message": "Sesión expirada."}];
            res.redirect("/login");
        }else{
            req.session.last_timestamp = timestamp;
            req.session.session_expired = false;
            next();
        }
    }else{
        next();
    }
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
