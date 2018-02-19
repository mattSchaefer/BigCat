var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');
var index = require('./routes/index');
var users = require('./routes/users');
var partials = require('./routes/partials');


var app = express();
var showdates = require('./routes/showdates');
mongoose.connect(dbConfig.url,{
    // useMongoClient: true
});
mongoose.connection.on("error", function(){
    console.log("Could not connect to the database. :-(");
    process.exit();
});
mongoose.connection.once('open', function(){
    console.log("Successfully connected to the database");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);
app.use('/partials/:name', function(req, res) {
    res.render('partials/' + req.params.name);
});

/**db routing start**/
app.use('/showdates', showdates);
/**db routing end**/

app.use('*', index);

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
  res.render('error');
});

module.exports = app;
