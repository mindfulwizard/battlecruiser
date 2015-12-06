app.controller('HomeController', function($scope, boardFactory) {
	$scope.EMPTY = 0;
	$scope.SHIP = 1;
	$scope.HIT = 2;
	$scope.MISS = 3;

	function isInArray(array, x, y) {
		return _.findIndex(array, {'x': x, 'y': y});
	}

	$scope.positionSelected = function() {
		return isInArray($scope.positionsArray, this.$parent.$index, this.$index) > -1;
	}

	$scope.createBoards = function() {
		boardFactory.createGame()
		.then(function(response) {
			$scope.game = response.game;
			$scope.positionsArray = [];
		})
	}

	$scope.submitPositions = function() {
		boardFactory.playerSetup($scope.positionsArray)
		.then(function(response) {
			$scope.positionsArray = null;
			$scope.game = response.game;
		})
	}

	$scope.deleteGame = function() {
		boardFactory.deleteGame()
		.then(function(response) {
			$scope.game = null;
			$scope.createBoards();
		})
	}

	$scope.selectPosition = function(x, y) {
		var index = isInArray($scope.positionsArray, x, y);
		//undo position selection if previously selected
		if(index > -1 && $scope.game.status === 'setup') {
			return $scope.positionsArray.splice(index, 1);
		}

		if($scope.positionsArray && $scope.positionsArray.length < 10 && $scope.game.status === 'setup') {
			$scope.positionsArray.push({'x': x, 'y': y});
		}
	}

	$scope.submitPositions = function() {
		boardFactory.playerSetup($scope.positionsArray)
		.then(function(response) {
			$scope.positionsArray = null;
			$scope.game = response.game;
		})
	}

	$scope.attackCPU = function(status, x, y) {
		//prevent selecting previously attacked positions
		if($scope.game.status === 'playing' && $scope.game.currentPlayer === 'person' && (status === $scope.EMPTY || status === $scope.SHIP)){
			boardFactory.playerMove({'x': x, 'y': y})
			.then(function(response) {
				$scope.game = response.game;
			})
		}
	}

	$scope.allowAttack = function() {
		boardFactory.getCpuMove()
		.then(function(response) {
			$scope.game = response.game;
		})
	}
});

	