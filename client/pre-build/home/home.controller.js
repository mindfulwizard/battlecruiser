app.controller('HomeController', function($scope, boardFactory) {
	
	$scope.createBoards = function() {
		boardFactory.createGame()
		.then(function(response) {
			$scope.game = response.game;
			$scope.positionsArray = [];
		})
	}

	$scope.finderFunc = function(array, x, y) {
		return _.findIndex(array, {'x': x, 'y': y});
	}

	$scope.selectPosition = function(x, y) {
		var index = $scope.finderFunc($scope.positionsArray, x, y);
		//undo position selection if previously selected
		if(index>-1 && $scope.game.status === 'setup') {
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
		if($scope.game.currentPlayer === 'person' && (status === 0 || status === 1)){
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

	$scope.deleteGame = function() {
		boardFactory.deleteGame()
		.then(function(response) {
			$scope.game = response.game;
			$scope.positionsArray = [];
		})
	}
});

	