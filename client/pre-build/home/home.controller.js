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
	$scope.missed = [];
	$scope.hit = [];
	$scope.boardSet = false;

	$scope.positionChooser = function(col) {
		if(!$scope.boardSet && col[1] < 5 && $scope.positionsArray.length < 10) {
			boardFactory.sendPosition(col)
			.then(function(array) {
				$scope.positionsArray = array;
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

	$scope.posFinder = function(array, item) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][0] === item[0] && array[i][1] == item[1]) {
	            return i;
	        }
	    }
	    return -1;
	}

	$scope.strikeChooser = function(col) {
		if($scope.boardSet && col[1] > 5) {
			boardFactory.sendPosition(col)
			.then(function(array) {
				$scope.positionsArray = array;
			});
		}
	};


});