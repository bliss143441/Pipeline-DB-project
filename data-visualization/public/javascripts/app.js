angular.module('data-visualization', ["chart.js"])

.controller('mainController', ($scope, $http) => {
	console.log("Hello world");

	$scope.hashtagData = [];
	$scope.hashtagLabels = [];

	$http.get('api/hashtagsView')
	.then(function(success) {
		console.log(success.data);
		console.log('here')
		for (row in success.data) {
			console.log(success.data[row]);
			$scope.hashtagData.push(success.data[row].total);
			$scope.hashtagLabels.push(success.data[row].h);
		}
	})
	.then(function(error) {
		console.log("Error retrieving hashtags views" + error);
	});


});