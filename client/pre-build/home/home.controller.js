app.controller('HomeController', function($scope) {
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
	$scope.boardSet = false;
	$scope.positionChooser = function(col) {
		if(!$scope.boardSet && col[1] < 5) {
			if($scope.positionsArray.indexOf(col) === -1 && $scope.positionsArray.length < 10) {
				$scope.positionsArray.push(col);
			} else if($scope.positionsArray.indexOf(col) > -1) {
				$scope.positionsArray.splice($scope.positionsArray.indexOf(col), 1);
			};
		};
	};

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max-min+1) + min);
	};

	$scope.computerPositions = [];
	$scope.submitPositions = function() {
		$scope.boardSet = true;

		while($scope.computerPositions.length < 10) {
			var randomPos = Array(randomInt(0,4), randomInt(5,9));
			$scope.computerPositions.push(randomPos);
		}
	
	};
	$scope.finder = function(array, item) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][0] === item[0] && array[i][1] == item[1]) {
	            return true;
	        }
	    }
	    return false;
	}


});