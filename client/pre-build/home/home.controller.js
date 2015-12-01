app.controller('HomeController', function($scope, $timeout, boardFactory) {

	$scope.createBoard = function() {
		$scope.rows = [];
		var maxRows = 5;
		var maxCols = 11;
		for (var i = 0; i < maxRows; i++){
		  $scope.rows.push([]);
		  for (var j =0; j < maxCols; j++){
		  	$scope.rows[i][j] = Array(i,j);
		  };
		};
	}();
	$scope.borders = [[0,5],[1,5],[2,5],[3,5],[4,5]];

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
	$scope.winner = false;
	$scope.loser = false;
		
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
				$scope.userPositions = response.userPositions;
			});
		}

		//strike
		if(col[1] >= 6 && $scope.boardSet && $scope.posFinder(col, $scope.missed) === -1 && $scope.posFinder(col, $scope.hit) === -1) {
			//turn waiting for strike on
			$scope.waiting1 = true;
			//prevent repeat clicks before artificially fake response
			$scope.boardSet = false;
			boardFactory.sendStrike(col)
			.then(function(response) {
				console.log('strike response', response)
				if(response.winner) {
					$scope.cpuIsHit = response.cpuIsHit;
					$scope.winner = true;
					return;
				}
				if(response.loser) {
					$scope.userIsHit = response.userIsHit;
					$scope.loser = true;
					return;
				}

				$timeout(function() {
					console.log('ready1!');
					//turn waiting for strike off
					$scope.waiting1 = false;
					//turn waiting for response attack on
					$scope.waiting2 = true;
					//show results of strike
					$scope.cpuIsMissed = response.cpuIsMissed;
					$scope.cpuIsHit = response.cpuIsHit;
					$timeout(function() {
						console.log('ready2!');
						//turn waiting for response attack off
						$scope.waiting2 = false;
						//show results of response attack
						$scope.userIsMissed = response.userIsMissed;
						$scope.userIsHit = response.userIsHit;
						$scope.boardSet = true;
					   }, 3000);
				   }, 3000);
			});
		}
	};

	$scope.submitPositions = function() {
		$scope.boardSet = true;
		boardFactory.start()
		.then(function(response) {
			//???
		});
	}
});