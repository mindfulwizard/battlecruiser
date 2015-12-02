var _ = require('lodash');

var EMPTY = 0, SHIP = 1, HIT = 2, MISS = 3;

var GameState = function() {
	this.playerArr = this.generateBoard();
	this.cpuArr = this.generateBoard();
	this.status = 'Setup';
};

_.extend(GameState.prototype, {
	generateBoard: function() {
		console.log('this?', this);
		return _.range(5).map(function () {
        	return _.range(0, 5, 0);
    	});
	},
	addPlayerPositions: function(positionsArr) {
		_.forEach(positionsArr, function(i) {
			this.playerArr[positionsArr[i].x][positionsArr[i].y] = SHIP;
		});
	},
	generateCpuShips: function() {
		_.times(10, function randomPosition(){
			var x = _.random(0, 5);
			var y = _.random(0, 5);
			if(this.cpuArr[x][y] === SHIP) {
				return randomPosition();
			}
			this.cpuArr[x][y] = SHIP;
		});
	},
	startGame: function() {
		this.generateCpuShips();
		this.currentPlayer = 'Person';
		this.status = 'Playing';
	},
	attack: function(array, position) {
		if(!this[array][position.x][position.y]) {
			this[array][position.x][position.y] = MISS;
		} else {
			this.cpuArr[position.x][position.y] = HIT;
		}
	},
	checkWin: function(array) {
		//refactor?
		var counter;
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
		this.attack(cpuArr, position);
		if(checkWin(cpuArr)) {
			this.status = 'Player won';
		};
	},
	cpuMove: function() {
		function randomPosition() {
			var x = _.random(0, 5);
			var y = _.random(0, 5);
			if(this.playerArr[x][y] === HIT || this.playerArr[x][y] === MISS) {
				return randomPosition();
			}
			return {x:x, y:y};
		}
		this.attack(playerArr, randomPosition());
		if(checkWin(playerArr)) {
			this.status = 'CPU won';
		};
	}
});
module.exports = GameState;
