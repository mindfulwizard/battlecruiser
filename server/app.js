var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');

var clientPath = path.join(__dirname, '../client');
var buildPath = path.join(__dirname, '../client/build');    // for gulped files
var indexHtmlPath = path.join(__dirname, './index.html');
var nodePath = path.join(__dirname, '../node_modules');
var imagePath = path.join(__dirname, './images');

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


app.use(express.static(clientPath));
app.use(express.static(buildPath));
app.use(express.static(nodePath));
app.use(express.static(imagePath));

/* 
Provides a 404 for times 
Credit to `fsg` module for this one!
*/
app.use(function (req, res, next) {

  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next(null);
  }

});

//sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//routes
app.use('/api', require('./api'));

app.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, './index.html'));
});


// Errors - choosing to send back true errors
//// Not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Server issues
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);

});


module.exports = app;

