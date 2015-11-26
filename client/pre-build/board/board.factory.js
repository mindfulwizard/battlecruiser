app.factory('boardFactory', function($http){
	return {
		sendPosition: function(position) {
			return $http.put('/position', {position: position})
			.then(function(res) {
				return res.data;
			});
		},
		sendStrike: function(position) {
			return $http.post('/position', {position: position})
			.then(function(res) {
				return res.data;
			});
		},
		start: function() {
			return $http.get('/start')
			.then(function(res) {
				return res.data;
			});
		}
	}
});