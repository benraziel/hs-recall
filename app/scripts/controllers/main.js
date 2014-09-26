'use strict';

var hsApp = angular.module('hearthstoneApp');

hsApp.controller('MainCtrl', ['$scope', '$rootScope', '$http', 'HearthstoneService', '$timeout', '$modal',
    function ($scope, $rootScope, $http, HearthstoneService, $timeout, $modal) {
	$scope.categories = ['Reward', 'Promotion', 'Expert', 'Basic', 'Curse of Naxxramas'];

    HearthstoneService.getData().then(function(data) {
        $scope.allCards = HearthstoneService.flattenJson(data, $scope.categories);
        $scope.cards = HearthstoneService.shuffle($scope.allCards);
        $scope.activeFilter = {
            'category': {'Basic': true, 'Expert': true, 'Curse of Naxxramas': true, 'Reward': true, 'Promotion': true},
            'class': {'Neutral': true, 'Mage': true, 'Warrior': true, 'Shaman': true, 'Priest': true, 'Paladin': true, 'Druid': true, 'Hunter': true, 'Warlock': true, 'Rogue': true},
            'rarity': [
                {'checked': true,'title': 'Free', 'color': '#000000'},
                {'checked': true,'title': 'Common', 'color': '#939393'},
                {'checked': true,'title': 'Rare', 'color': '#0070dd'},
                {'checked': true,'title': 'Epic', 'color': '#a335ee'},
                {'checked': true,'title': 'Legendary', 'color': '#ff8000'}
            ],            
            'type': {'Minion': true, 'Spell': true, 'Weapon': true}
        };
    });

    $scope.loadFilters = function() {
        $scope.prevFilter = JSON.parse(JSON.stringify($scope.activeFilter)); // clone the current filter object
    }

    $scope.activeFilter = function () {
        return $scope.activeFilter;
    }

    $scope.changeFilter = function (newFilter) {
        if (JSON.stringify($scope.prevFilter) == JSON.stringify($scope.activeFilter)) {
            return; // nothing in the filter changed
        }
        $rootScope.$broadcast('filterChanged');  
        $scope.cards = HearthstoneService.shuffle(HearthstoneService.filterCards($scope.allCards, $scope.activeFilter));
    };

    $rootScope.$on('cardChange', function() {
        for(var i = 0; i < $scope.cards.length; i++) {
            $scope.cards[i].active = false;
        }
    });
}]);