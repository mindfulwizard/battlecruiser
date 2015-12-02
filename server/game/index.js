var _ = require('lodash');

var EMPTY = 0, SHIP = 1, HIT = 2, MISS = 3;

function GameState() {
	this.playerArr = this.generateBoard();
	this.cpuArr = this.generateBoard();
	this.status = 'Setup';
};

_.extend(GameState.prototype, {
	generateBoard: function() {
		return _.range(5).map(function () {
        	return _.range(0, 5, 0);
    	});
	},
	addPlayerPositions: function(positionsArr) {
		var self = this;
		_.forEach(positionsArr, function(position) {
			self.playerArr[position.x][position.y] = SHIP;
		});
		return this;
	},
	generateCpuShips: function() {
		var self = this;
		_.times(10, function randomPosition(){
			var x = _.random(0, 4);
			var y = _.random(0, 4);
			if(self.cpuArr[x][y] === SHIP) {
				return randomPosition();
			}
			self.cpuArr[x][y] = SHIP;
		});
	},
	startGame: function() {
		this.generateCpuShips();
		this.currentPlayer = 'Person';
		this.status = 'Playing';
	},
	attack: function(array, position) {
		if(!array[position.x][position.y]) {
			array[position.x][position.y] = MISS;
		} else {
			array[position.x][position.y] = HIT;
		}
	},
	checkWin: function(array) {
		//refactor?
		var counter = 0;
		_.forEach(array, function(innerArray) {
			_.forEach(innerArray, function(element) {
				if(element === HIT) {
					counter++;
				}
			})
		});
		if(counter === 10) {
			return true;
		}
		return false;
	},
	playerMove: function(position) {
		this.attack(this.cpuArr, position);
		if(this.checkWin(this.cpuArr)) {
			this.status = 'Player won';
			this.currentPlayer = null;
		};
		this.currentPlayer = 'CPU';
	},
	cpuMove: function() {
		var self = this;
		function randomPosition() {
			var x = _.random(0, 4);
			var y = _.random(0, 4);
			if(self.playerArr[x][y] === HIT || self.playerArr[x][y] === MISS) {
				return randomPosition();
			}
			return {x:x, y:y};
		}
		this.attack(this.playerArr, randomPosition());
		if(this.checkWin(this.playerArr)) {
			this.status = 'CPU won';
			this.currentPlayer = null;
		};
		this.currentPlayer = 'Person';
	}
});
module.exports = GameState;
