var router = require('express').Router();
module.exports = router;

var userPositions = [];
var userIsMissed = [];
var userIsHit = [];
var cpuPositions = [];
var cpuIsMissed = [];
var cpuIsHit = [];
// var arrayCollection: {
// 	'userPositions': userPositions;
// 	'userIsMissed': userIsMissed;
// 	'userIsHit': userIsHit;
// 	'cpuPositions': cpuPositions;
// 	'cpuIsMissed': cpuIsMissed;
// 	'cpuIsHit': cpuIsHit;
// }

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

//need to only strike empty square but always strike
function striker() {
	var tempPos = Array(randomInt(0,4), randomInt(0,4));
	if(posFinder(userIsHit, tempPos) !== -1 || posFinder(userIsMissed, tempPos) !== -1) {
		tempPos = striker();
	}
	return tempPos;
}

router.put('/position', function(req, res) {
	//setup
	var coordinates = req.body.position;
	if(posFinder(userPositions, coordinates) === -1) {
		userPositions.push(coordinates);
	} else {
		userPositions.splice(posFinder(userPositions, coordinates), 1)
	}
	//res.json(arrayCollection);
	res.json({userPositions: userPositions})
});

router.post('/position', function(req, res) {
	//receive strike
	console.log(req.body.position)
	var coordinates = req.body.position;
	if(posFinder(cpuPositions, coordinates) === -1) {
		cpuIsMissed.push(coordinates);
	} else {
		cpuIsHit.push(coordinates);
	}
	
	//check if final strike

	//return strike
	var randomPos = striker();
	console.log('attack user:', randomPos)

	//check if final attack

	if(posFinder(userPositions, randomPos) === -1) {
		userIsMissed.push(randomPos);
	} else {
		userIsHit.push(randomPos);
	}
	//res.json(arrayCollection);
	res.json({hit:userIsHit.concat(cpuIsHit), missed:userIsMissed.concat(cpuIsMissed)});
});    


router.get('/start', function(req, res) {
	console.log('userPositions', userPositions)
	//setup
	while(cpuPositions.length < 10) {
	var randomPos = Array(randomInt(0,4), randomInt(5,9));
		if(posFinder(cpuPositions, randomPos) === -1) {
			cpuPositions.push(randomPos);
		}
	}
	console.log('cpuPositions', cpuPositions)
	res.json({cpuPositions: cpuPositions});
});


router.use(function(req, res) {
	res.status(404).end();
});




