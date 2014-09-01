'use strict';

angular.module('hearthstoneApp')
  .controller('MainCtrl', ['$scope', '$http', 'HearthstoneService', '$timeout', 
    function ($scope, $http, HearthstoneService, $timeout) {
	  	$scope.categories = ['Reward', 'Promotion', 'Expert',
	  		'Basic', 'Curse of Naxxramas'];
	  	$scope.errorMessage = false;

	  	HearthstoneService.getData().then(function(data) {
	  		$scope.cards = HearthstoneService.shuffle(HearthstoneService.flattenJson(data, $scope.categories));
	  		$scope.cardPositions = HearthstoneService.generateCardList($scope.cards.length);
	  		$scope.currentPosition= 0 ;
	  		$scope.currentCard = $scope.cards[$scope.cardPositions[0]];
	  	});

	  	$scope.nextCard = function () {
	  		if ($scope.currentPosition === $scope.cardPositions.length-1) {
	  			$scope.currentPosition = 0;
	  		}
	  		else {
	  			$scope.currentPosition++;
	  		}
	  		$scope.goToCard($scope.currentPosition);	  		
	  	};

	  	$scope.prevCard = function () {
	  		if ($scope.currentPosition === 0) {
	  			$scope.currentPosition = $scope.cardPositions.length-1;
	  		}
	  		else {
	  			$scope.currentPosition--;
	  		}
	  		$scope.goToCard($scope.currentPosition);
	  	};

	  	$scope.goToCard = function (position) {
	  		var delay = $scope.active ? 600: 0;
	  		$scope.active = false;
	  		$timeout(function(){
	  			var cardIndex = $scope.cardPositions[position];
	  			$scope.currentCard = $scope.cards[cardIndex];	
	  		}, delay);
	  	};
  }]);