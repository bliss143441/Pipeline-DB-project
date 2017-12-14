angular.module('data-visualization', ["chart.js"])

.controller('mainController', ($scope, $http) => {
	console.log("Hello world");

	$scope.HashtagsView = [];
	$scope.hashtagData = [];
	$scope.hashtagLabels = [];
	$scope.allHashtagData = [];
	$scope.allHashtagLabels = [];

	$scope.showAllHashtags = 0;


	$http.get('api/hashtagsView')
	.then(function(success) {
		console.log(success.data);
		console.log('here');
		var i = 0;
		for (row in success.data) {
			console.log(success.data[row]);
			$scope.HashtagsView.push(success.data[row]);
			$scope.allHashtagData.push(success.data[row].total);
			$scope.allHashtagLabels.push(success.data[row].h);
			if (i < 5) {
				$scope.hashtagData.push(success.data[row].total);
				$scope.hashtagLabels.push(success.data[row].h);
				if(i == 0) $scope.hash1 = success.data[row].h;
				else if(i == 1) $scope.hash2 = success.data[row].h;
				else if(i == 2) $scope.hash3 = success.data[row].h;
				else if(i == 3) $scope.hash4 = success.data[row].h;
				else if(i == 4) $scope.hash5 = success.data[row].h;
				++i
			}
		}
	})
	.then(function(error) {
		console.log("Error retrieving hashtags views" + error);
	});

	$http.get('api/timingHashtags')
	.then(function(success) {
		console.log("Get timing hashtags");
		console.log(success);
		var i = 0;
		for (row in success.data) {
			console.log(success.data[row]);
			$scope.TimingHashtagsView.push(success.data[row]);
		}
	})
	.then(function(error) {
		console.log("Error retrieving timing hashtags views" + error);
	});


	$scope.refreshHashtagsList = function() {
		$scope.hashtagLabels = [];
		$scope.hashtagData = [];

		$scope.hashtagLabels.push($scope.hash1);
		$scope.hashtagData.push($scope.allHashtagData[$scope.allHashtagLabels.indexOf($scope.hash1)]);
		$scope.hashtagLabels.push($scope.hash2);
		$scope.hashtagData.push($scope.allHashtagData[$scope.allHashtagLabels.indexOf($scope.hash2)]);
		$scope.hashtagLabels.push($scope.hash3);
		$scope.hashtagData.push($scope.allHashtagData[$scope.allHashtagLabels.indexOf($scope.hash3)]);
		$scope.hashtagLabels.push($scope.hash4);
		$scope.hashtagData.push($scope.allHashtagData[$scope.allHashtagLabels.indexOf($scope.hash4)]);
		$scope.hashtagLabels.push($scope.hash5);
		$scope.hashtagData.push($scope.allHashtagData[$scope.allHashtagLabels.indexOf($scope.hash5)]);

		$scope.hashtagSeries.push($scope.hash1);
		$scope.hashtagSeries.push($scope.hash2);
		$scope.hashtagSeries.push($scope.hash3);
		$scope.hashtagSeries.push($scope.hash4);
		$scope.hashtagSeries.push($scope.hash5);

		/*
		for (row in TimingHashtagsView) {
			int seriesNumber = checkSeries($scope.TimingHashtagsView[row]);
			if (seriesNumber >= 0) {
				$scope.TimingLabels.push($scope.TimingHashtagsView[row].minuteOfArrival);
			}
		}*/



	}

	$scope.checkShowAllHashtags = function() {
		$scope.showAllHashtags = !$scope.showAllHashtags
		console.log($scope.showAllHashtags);

		$scope.hashtagLabels = [];
		$scope.hashtagData = [];

		for (row in $scope.allHashtagData) {
			$scope.hashtagData.push($scope.allHashtagData[row]);
			$scope.hashtagLabels.push($scope.allHashtagLabels[row]);
		}

	}

});