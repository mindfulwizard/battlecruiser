app.controller('HomeController', function($scope, $timeout, boardFactory) {

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

	$scope.userPositions = [];
	$scope.cpuPositions = [];
	$scope.missed = [];
	$scope.hit = [];

	$scope.userIsMissed = [];
	$scope.userIsHit = [];
	$scope.cpuIsMissed = [];
	$scope.cpuIsHit = [];

	$scope.boardSet = false;
	$scope.waiting1 = false;
	$scope.waiting2 = false;
		
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
			//turn waiting for strike on
			$scope.waiting1 = true;
			boardFactory.sendStrike(col)
			.then(function(response) {
				console.log('strike response', response)
				$timeout(function() {
					console.log('ready1!');
					//turn waiting for strike off
					$scope.waiting1 = false;
					//turn waiting for response attack on
					$scope.waiting2 = true;
					//show results of strike
					$scope.userIsMissed = response.userIsMissed;
					$scope.userIsHit = response.userIsHit;
				   }, 3000);
				$timeout(function() {
					console.log('ready2!');
					//turn waiting for response attack off
					$scope.waiting2 = false;
					//show results of attack strike
					$scope.cpuIsMissed = response.cpuIsMissed;
					$scope.userIsHit = response.userIsHit;
				   }, 3000);
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