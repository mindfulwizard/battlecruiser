var GameState = require('../game');
var router = require('express').Router();
module.exports = router;

var game;

router.post('/game', function(req, res) {
	//req.session.game = new GameState();
	game = new GameState();
	res.json({game:game});
});

router.put('/game/setup', function(req, res) {
	game.addPlayerPositions(req.body.positionsArray).startGame();
	res.json({game:game});
});

router.put('/game/player', function(req, res) {
	game.playerMove(req.body.position);
	res.json({game:game});
});

router.get('/game/cpu', function(req, res) {
	game.cpuMove();
	res.json({game:game});
});

router.delete('/game', function(req, res) {
	game = null;
	res.sendStatus(204);
});