app.controller('HomeController', function($scope, $http) {

	//create game board
	$scope.rows = [];
	var maxRows = 5;
	var maxCols = 5;
	for (var i = 0; i < maxRows; i++){
	  $scope.rows.push([]);
	  for (var j =0; j < maxCols; j++){
	  	$scope.rows[i][j] = Array(i,j);
	  };
	};

	//allow user to choose positions
	$scope.counter = 10;
	$scope.positionsArray = [];
	$scope.positionChooser = function(col) {
		if($scope.positionsArray.indexOf(col) === -1) {
			$scope.positionsArray.push(col);
		} else {
			$scope.positionsArray.splice($scope.positionsArray.indexOf(col), 1);
		};
		console.log($scope.positionsArray);
	};


});