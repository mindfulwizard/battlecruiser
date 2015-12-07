var GameState = require('../game');
var router = require('express').Router();
module.exports = router;

var allGames = {};

router.post('/game', function(req, res) {
	allGames[req.sessionID] = new GameState();
	res.json({game:allGames[req.sessionID]});
});

router.put('/game/setup', function(req, res) {
	allGames[req.sessionID].addPlayerPositions(req.body.positionsArray).startGame();
	res.json({game:allGames[req.sessionID]});
});

router.put('/game/player', function(req, res) {
	allGames[req.sessionID].playerMove(req.body.position);
	res.json({game:allGames[req.sessionID]});
});

router.get('/game/cpu', function(req, res) {
	allGames[req.sessionID].cpuMove();
	res.json({game:allGames[req.sessionID]});
});

router.delete('/game', function(req, res) {
	allGames[req.sessionID] = null;
	res.sendStatus(204);
});