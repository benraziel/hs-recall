'use strict';

var hsApp = angular.module('hearthstoneApp');

hsApp.controller('FilterCtrl', ['$scope', '$modalInstance', 'activeFilter',
        function ($scope, $modalInstance, activeFilter) {
            $scope.activeFilter = activeFilter;

            $scope.ok = function () {
                $modalInstance.close(activeFilter);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);

hsApp.controller('MainCtrl', ['$scope', '$http', 'HearthstoneService', '$timeout', '$modal',
    function ($scope, $http, HearthstoneService, $timeout, $modal) {
	$scope.categories = ['Reward', 'Promotion', 'Expert',
	  	'Basic', 'Curse of Naxxramas'];

            HearthstoneService.getData().then(function(data) {
            $scope.allCards = HearthstoneService.flattenJson(data, $scope.categories);

            $scope.cards = HearthstoneService.shuffle($scope.allCards);

            $scope.activeFilter = {
                'category': {'Basic': true, 'Expert': true, 'Curse of Naxxramas': true, 'Reward': true, 'Promotion': true},
                'class': {'Neutral': true, 'Mage': true, 'Warrior': true, 'Shaman': true, 'Priest': true, 'Paladin': true, 'Druid': true, 'Hunter': true, 'Warlock': true, 'Rogue': true},
                'rarity': {'Free': true, 'Common': true, 'Rare': true, 'Epic': true, 'Legendary': true},
                'type': {'Minion': true, 'Spell': true, 'Weapon': true}
            };
        });

        $scope.openFilterDialog = function() {
            $scope.prevFilter = JSON.parse(JSON.stringify($scope.activeFilter)); // clone the current filter object

            var modalInstance = $modal.open({
                templateUrl: 'filterDialog.html', // only an id - the actual dialog is embedded in index.html
                controller: 'FilterCtrl',
                resolve: {
                    activeFilter: function () {
                        return $scope.activeFilter;
                    }
                }
            });

            modalInstance.result.then(function (newFilter) {
                if (JSON.stringify($scope.prevFilter) == JSON.stringify($scope.activeFilter)) {
                    return; // nothing in the filter changed
                }

                $scope.cards = HearthstoneService.shuffle(HearthstoneService.filterCards($scope.allCards, $scope.activeFilter));

            }, function () {
                // modal dismissed (cancel button)
            });
        };

        /*$scope.nextCard = function () {
	  		if ($scope.currentPosition === $scope.cards.length-1) {
	  			$scope.currentPosition = 0;
	  		}
	  		else {
	  			$scope.currentPosition++;
	  		}
	  		$scope.goToCard($scope.currentPosition);
	  	};

	  	$scope.prevCard = function () {
	  		if ($scope.currentPosition === 0) {
	  			$scope.currentPosition = $scope.cards.length-1;
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
	  			$scope.currentCard = $scope.cards[position];
	  		}, delay);
	  	};*/
}]);