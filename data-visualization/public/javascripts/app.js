angular.module('data-visualization', ["chart.js", 'angularMoment'])

.controller('mainController', ($scope, $http) => {
	console.log("Hello world");

	$scope.HashtagsView = [];
	$scope.hashtagData = [];
	$scope.hashtagLabels = [];
	$scope.allHashtagData = [];
	$scope.allHashtagLabels = [];

	$scope.showAllHashtags = 0;

	$scope.TimingHashtagsView = [];
	$scope.TimingLabels = [];
	$scope.TimingSeries = [];
	$scope.TimingData = [];


	$http.get('api/hashtagsView')
	.then(function(success) {
		console.log("Success receiving hashtags view");
		var i = 0;
		for (row in success.data) {
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
	}).then(function(error) {
		console.log("Error retrieving hashtags views" + error);
	});

	$http.get('api/timingHashtags')
	.then(function(success) {
		console.log("Get timing hashtags");
		console.log(success);
		var i = 0;
		for (row in success.data) {
			var rawMinutes = success.data[row].minuteofarrival
			var minuteOfArrival = new moment(rawMinutes).fromNow();
			if ($scope.TimingLabels.indexOf(minuteOfArrival) == -1) $scope.TimingLabels.push(minuteOfArrival);
			var newData = {};
			newData.label = minuteOfArrival;
			newData.hashtag = success.data[row].h;
			newData.quantity = success.data[row].quantity;
			$scope.TimingHashtagsView.push(newData)
		}

		while($scope.hash5 == undefined);
		$scope.refreshHashtagsList();
	})
	.then(function(error) {
		console.log("Error retrieving timing hashtags views" + error);
	});


	$scope.refreshHashtagsList = function() {
		$scope.hashtagLabels = [];
		$scope.hashtagData = [];
		$scope.TimingSeries = [];
		$scope.TimingData = [];
		console.log("refreshHashtagsList function");

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

		$scope.TimingSeries.push($scope.hash1);
		$scope.TimingSeries.push($scope.hash2);
		$scope.TimingSeries.push($scope.hash3);
		$scope.TimingSeries.push($scope.hash4);
		$scope.TimingSeries.push($scope.hash5);

		var seriesPos = 0;
		for (serie in $scope.TimingSeries) {
				var jsonSerie = $scope.TimingSeries[serie];
				$scope.TimingData[seriesPos] = [];
				for (label in $scope.TimingLabels) {
					var jsonLabel = $scope.TimingLabels[label];
					console.log(jsonSerie + jsonLabel);
					var quantity = findQuantity(jsonSerie, jsonLabel);		
					console.log(quantity);
					$scope.TimingData[seriesPos].push(quantity);		
				}
				++seriesPos;
		}


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

		console.log(JSON.stringify($scope.TimingSeries));
		console.log(JSON.stringify($scope.TimingLabels));
		console.log(JSON.stringify($scope.TimingData));

	}

	var findQuantity = function(hashtag, minute) {
		for (row in $scope.TimingHashtagsView) {
			var jsonRow = $scope.TimingHashtagsView[row]
			if (jsonRow.hashtag === hashtag && jsonRow.label === minute) return parseInt(jsonRow.quantity);
		}
		return 0;
	}

	$scope.lineOptions = {
		legend: { display : true }
	}

});