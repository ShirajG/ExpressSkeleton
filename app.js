var env = process.env.NODE_ENV || 'development';
var credentials = require('./config/credentials');
var passport = require('./middleware/passportConfig');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = require('redis').createClient(credentials.redisConfig[env]);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();

// Write a config.json file from credentials.js for use with sequelize-cli
require('fs').writeFileSync('./config/config.json',JSON.stringify(require('./config/credentials.js').database));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: credentials.redisSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Mount routers onto paths
app.use('/', require('./routes/index')     );
app.use('/', require('./routes/user') );

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
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
        title: 'error'
    });
});


module.exports = app;
