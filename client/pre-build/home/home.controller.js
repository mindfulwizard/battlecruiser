app.controller('HomeController', function($scope, boardFactory) {

	$scope.createBoard = function() {
		$scope.rows = [];
		var maxRows = 5;
		var maxCols = 10;
		for (var i = 0; i < maxRows; i++){
		  $scope.rows.push([]);
		  for (var j =0; j < maxCols; j++){
		  	$scope.rows[i][j] = Array(i,j);
		  };
		};

	$scope.userPositions = [];
	$scope.cpuPositions = [];
	$scope.missed = [];
	$scope.hit = [];
	$scope.boardSet = false;
		
	}();

	$scope.posFinder = function(item, array) {
		if(typeof array === 'undefined') {
			console.log('go away')
		} else {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][0] === item[0] && array[i][1] == item[1]) {
	            return i;
	        }
	    }
	    return -1;
		}
	};

	$scope.positionChooser = function(col) {
		//set user positions
		if(col[1] < 5 && !$scope.boardSet && ($scope.userPositions.length < 10 || typeof $scope.userPositions === 'undefined')) {
			boardFactory.sendPosition(col)
			.then(function(response) {
				//$scope.userPositions = arrayCollections.userPositions;
				console.log('userPositions:', response.userPositions)
				$scope.userPositions = response.userPositions;
			});
		}

		//strike
		if(col[1] >= 5 && $scope.boardSet && $scope.posFinder(col, $scope.missed) === -1 && $scope.posFinder(col, $scope.hit) === -1) {
			boardFactory.sendStrike(col)
			.then(function(response) {
				console.log('hit and miss obj:', response)
				$scope.hit = response.hit;
				$scope.missed = response.missed;
			});
		}
	};

	$scope.submitPositions = function() {
		$scope.boardSet = true;
		boardFactory.start()
		.then(function(response) {
			console.log('cpuPositions:', response.cpuPositions)
		});
	}
});