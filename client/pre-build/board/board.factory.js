app.factory('boardFactory', function($http){
	return {
		createGame: function() {
			return $http.post('/api/game')
			.then(function(res) {
				return res.data;
			});
		},
		playerSetup: function(positionsArray) {
			return $http.put('/api/setup', {positionsArray: positionsArray})
			.then(function(res) {
				return res.data;
			});
		},
		playerMove: function(position) {
			return $http.put('/api/player', {position: position})
			.then(function(res) {
				return res.data;
			});
		},
		getCpuMove: function() {
			return $http.get('/api/cpu')
			.then(function(res) {
				return res.data;
			});
		},
		deleteGame: function() {
			return $http.delete('/api/game')
			.then(function(res) {
				return res.data;
			});
		},
	}
});