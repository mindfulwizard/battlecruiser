app.controller('HomeController', function($scope, boardFactory) {
	$scope.game;
	$scope.positionsArray = [];

	$scope.createBoards = function() {
		boardFactory.createGame()
		.then(function(response) {
			$scope.game = response.game;
		})
	}

	$scope.finderFunc = function(array, x, y) {
		return _.findIndex(array, {'x': x, 'y': y});
	}

	$scope.selectPosition = function(x, y) {
		//check status in ifs
		var index = $scope.finderFunc($scope.positionsArray, x, y);
		//undo position selection if previously selected
		if(index>-1) {
			return $scope.positionsArray.splice(index, 1);
		}

		if($scope.positionsArray.length < 10) {
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

	$scope.attackPosition = function(status, x, y) {
		//prevent selecting previously attacked positions
		if(status === 0 || status === 1){
			boardFactory.playerMove({'x': x, 'y': y})
			.then(function(response) {
				$scope.game = response.game;
			})
		}
	}


});

	