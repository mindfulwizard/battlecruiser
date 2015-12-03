app.controller('HomeController', function($scope, boardFactory) {
	$scope.game;
	$scope.positionsArray = [];

	$scope.createBoards = function() {
		boardFactory.createGame()
		.then(function(response) {
			$scope.game = response.game;
		})
	}

	$scope.selectPosition = function(x, y) {
		if($scope.positionsArray.length < 10) {
			$scope.positionsArray.push({'x': x, 'y': y});
		}	
	}

	$scope.submitPositions = function() {
		boardFactory.playerSetup($scope.positionsArray)
		.then(function(response) {
			//show cpu ships
			$scope.game = response.game;
		})
	}

	$scope.finderFunc = function(array, x, y) {
		return _.findIndex(array, {'x': x, 'y': y});
	}

});

	