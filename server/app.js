var express = require('express');
var app = express();
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

var positionsArray = [];
var computerPositions = [];
var missed = [];
var hit = [];

function posFinder(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] === item[0] && array[i][1] == item[1]) {
            return i;
        }
    }
  return -1;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
};

app.put('/position', function(req, res) {
  //player side
  if(req.body.position[1] < 5) {
      if(posFinder(positionsArray, req.body.position) === -1) {
        positionsArray.push(req.body.position);
      } else {
        positionsArray.splice(posFinder(positionsArray, req.body.position), 1)
      }
  }    
  //computer side
  if(req.body.position[1] > 5) {
    if(posFinder(computerPositions, req.body.position) === -1) {
      //hit
    } else {
      //miss
    }
  }
  res.json(positionsArray);
});

app.get('/start', function(req, res) {
  while(computerPositions.length < 10) {
    var randomPos = Array(randomInt(0,4), randomInt(5,9));
    computerPositions.push(randomPos);
  }
  res.json(computerPositions);
});




// Routes
//// Index/Home
app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'));
});



// Errors
//// Not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Server issues
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);

});


module.exports = app;

