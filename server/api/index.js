var GameState = require('../game');
var router = require('express').Router();
module.exports = router;
var game;

router.post('/game', function(req, res) {
	req.session.game = new GameState();
	res.json({game:game});
});

router.put('/setup', function(req, res) {
	game.addPlayerPositions(req.body.positionsArray).startGame();
	res.json({game:game});
});

router.put('/player', function(req, res) {
	game.playerMove(req.body.position);
	res.json({game:game});
});

router.get('/cpu', function(req, res) {
	game.cpuMove();
	res.json({game:game});
});

router.delete('/game', function(req, res) {
	game = null;
	//res.json({game:game});
	res.sendStatus(204);
});

// router.use(function(req, res) {
// 	res.status(404).end();
// });

//all routes game/
//one route game/player check playerstatus and method acc
//send 204 on delete