app.factory('boardFactory', function($http){
	return {
		sendPosition: function(position) {
			return $http.put('/api/position', {position: position})
			.then(function(res) {
				return res.data;
			});
		},
		sendStrike: function(position) {
			return $http.post('/api/position', {position: position})
			.then(function(res) {
				return res.data;
			});
		},
		start: function() {
			return $http.get('/api/start')
			.then(function(res) {
				return res.data;
			});
		}
	}
});