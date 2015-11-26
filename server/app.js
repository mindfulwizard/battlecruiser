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



var userPositions = [];
var userIsMissed = [];
var userIsHit = [];
var cpuPositions = [];
var cpuIsMissed = [];
var cputIsHit = [];
var arrayCollection: {
  'userPositions': userPositions;
  'userIsMissed': userIsMissed;
  'userIsHit': userIsHit;
  'cpuPositions': cpuPositions;
  'cpuIsMissed': cpuIsMissed;
  'cputIsHit': cputIsHit;
  }

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
  //setup
  console.log(req.body)
  var coordinates = req.body.position;
      if(posFinder(userPositions, coordinates) === -1) {
        userPositions.push(coordinates);
      } else {
        userPositions.splice(posFinder(userPositions, coordinates), 1)
      }
  //res.json(arrayCollection);
  //below working
  console.log(userPositions)
  res.json(userPositions)

});

app.post('/position', function(req, res) {
  console.log(req.body)
    if(posFinder(cpuPositions, coordinates) === -1) {
      cputIsHit.push(coordinates);
    } else {
      cpuIsMissed.push(coordinates);
    }
    var randomPos = Array(randomInt(0,4), randomInt(0,4));
    if(find(userPositions, randomPos) === -1) {
        cpuIsMissed.push(randomPos);
    } else {
        cputIsHit.push(randomPos);
    }
  //res.json(arrayCollection);
  console.log(cputIsHit, cpuIsMissed)
  res.json({cputIsHit: cputIsHit, cpuIsMissed: cpuIsMissed});
});    

  

app.get('/start', function(req, res) {
  //setup
  while(cpuPositions.length < 10) {
    var randomPos = Array(randomInt(0,4), randomInt(5,9));
    cpuPositions.push(randomPos);
  }
  res.json(cpuPositions);
});


//app.use('/api', require('./api/routes'));

// Routes
//// Index/Home
app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'));
});

// app.get('/*', function(req, res, next) {
//     res.sendFile(path.join(__dirname, './index.html'));
// });


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

