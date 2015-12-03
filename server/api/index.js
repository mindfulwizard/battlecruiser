var GameState = require('../game');
var router = require('express').Router();
module.exports = router;
var game;

router.post('/game', function(req, res) {
	game = new GameState();
	res.json({game});
});

router.put('/setup', function(req, res) {
	game.addPlayerPositions(req.body.positionsArray).startGame();
	res.json({game});
});

router.put('/player', function(req, res) {
	game.playerMove(req.body.position);
	res.json({game});
});

router.get('/cpu', function(req, res) {
	game.cpuMove();
	res.json({game});
});

router.delete('/game', function(req, res) {
	game = null;
	res.sendStatus(200);
});

router.use(function(req, res) {
	res.status(404).end();
});