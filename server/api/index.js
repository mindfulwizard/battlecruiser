var router = require('express').Router();
module.exports = router;

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

router.put('/position', function(req, res) {
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

router.post('/position', function(req, res) {
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


router.get('/start', function(req, res) {
	//setup
	while(cpuPositions.length < 10) {
	var randomPos = Array(randomInt(0,4), randomInt(5,9));
		cpuPositions.push(randomPos);
	}
	res.json(cpuPositions);
});


router.use(function(req, res) {
	res.status(404).end();
});




