var _ = require('lodash');

var EMPTY = 0, SHIP = 1, HIT = 2, MISS = 3;

function GameState() {
	this.playerArr = this.generateBoard();
	this.cpuArr = this.generateBoard();
	this.status = 'setup';
}

function getValidRandomCell (board, invalidCellTypes) {
	var x = _.random(0, 4);
	var y = _.random(0, 4);
	var cellIsValid = invalidCellTypes.every(function(invalidType) {
		return board[x][y] !== invalidType;
	});
	if (!cellIsValid) {
		return getValidRandomCell(board, invalidCellTypes);
	}
	return {x: x, y: y};
}

_.extend(GameState.prototype, {
	generateBoard: function() {
		//creates a 5x5 two dimensional array filled with '0's
		return _.range(5).map(function () {
        	return _.range(0, 5, 0);
    	});
	},
	addPlayerPositions: function(positionsArray) {
		var self = this;
		_.forEach(positionsArray, function(position) {
			self.playerArr[position.x][position.y] = SHIP;
		});
		return this;
	},
	generateCpuShips: function() {
		var self = this;
		_.times(10, function () {
			var coords = getValidRandomCell(self.cpuArr, [SHIP]);
			self.cpuArr[coords.x][coords.y] = SHIP;
		});
	},
	startGame: function() {
		this.generateCpuShips();
		this.currentPlayer = 'person';
		this.status = 'playing';
	},
	attack: function(array, position) {
		if(!array[position.x][position.y]) {
			array[position.x][position.y] = MISS;
		} else {
			array[position.x][position.y] = HIT;
		}
	},
	checkWin: function(board) {
		var hits = _.flatten(board).reduce(function(previousValue, currentCell) {
			return previousValue + (currentCell === HIT ? 1 : 0);
		}, 0)
		return hits === 10;
	},
	playerMove: function(position) {
		this.attack(this.cpuArr, position);
		if(this.checkWin(this.cpuArr)) {
			this.status = 'player won';
			this.currentPlayer = null;
		} else {
			this.currentPlayer = 'CPU';
		}
	},
	cpuMove: function() {
		this.attack(this.playerArr, getValidRandomCell(this.playerArr, [HIT, MISS]));
		if(this.checkWin(this.playerArr)) {
			this.status = 'CPU won';
			this.currentPlayer = null;
		} else {
			this.currentPlayer = 'person';
		}
	}
});
module.exports = GameState;
