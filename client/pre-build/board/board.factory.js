app.factory('boardFactory', function($http){
	return {
		sendPosition: function(position) {
			return $http.post('/position', {position: position})
			.then(function(res) {
				return res.data;
			});
		}
	}
});