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
	}();

	$scope.positionsArray = [];
	$scope.strikes = [];
	$scope.missed = [];
	$scope.hit = [];
	$scope.boardSet = false;

	$scope.positionChooser = function(col) {
		if(col[1] < 5 && $scope.positionsArray.length < 10) {
			boardFactory.sendPosition(col)
			.then(function(response) {
				//$scope.positionsArray = arrayCollections.userPositions;
				console.log(response)
				$scope.positionsArray = response;
			});
		}	
	};

	$scope.submitPositions = function() {
		$scope.boardSet = true;
		boardFactory.start()
		.then(function(compPos) {
			console.log(compPos);
		})
	};

	$scope.posFinder = function(item) {
		//var array = $scope.positionsArray;
	    for (var i = 0; i < $scope.positionsArray.length; i++) {
	        if ($scope.positionsArray[i][0] === item[0] && $scope.positionsArray[i][1] == item[1]) {
	            return i;
	        }
	    }
	    return -1;
	};

	$scope.strikeChooser = function(col) {
		//test - no onclick even

		if(col[1] > 5 && $scope.boardSet) {
			$scope.strikes.push(col)
			boardFactory.sendStrike(col)
			.then(function(arrayCollections) {
				$scope.missed = arrayCollections.userMissed;
				$scope.hit = arrayCollections.userHit;
			});
		}
	};
});