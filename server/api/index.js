var GameState = require('../game');
var router = require('express').Router();
module.exports = router;

router.put('/game/create', function(req, res) {
	var game = new GameState();
	res.json({game});
});

router.put('/game/setup', function(req, res) {
	game.addPlayerPositions(req.body.positionsArr);
	game.generateCpuShips();
	res.json({game});
});

router.post('/game/player/position', function(req, res) {
	game.playerMove(req.body.position);
	res.json({game});
});

router.post('/game/cpu/position', function(req, res) {
	game.cpuMove();
	res.json({game});
});

router.delete('/game', function(req, res) {
	game = null;
	//response?
});

router.use(function(req, res) {
	res.status(404).end();
});
