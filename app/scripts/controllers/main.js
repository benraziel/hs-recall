'use strict';

var hsApp = angular.module('hearthstoneApp');

hsApp.controller('MainCtrl', ['$scope', '$rootScope', '$http', 'HearthstoneService', '$timeout', '$modal',
    function ($scope, $rootScope, $http, HearthstoneService, $timeout, $modal) {
	$scope.categories = ['Reward', 'Promotion', 'Expert', 'Basic', 'Curse of Naxxramas'];

    HearthstoneService.getData().then(function(data) {
        $scope.allCards = HearthstoneService.flattenJson(data, $scope.categories);
        $scope.cards = HearthstoneService.shuffle($scope.allCards);

        $scope.categories = ['All', 'Basic', 'Expert', 'Naxxramas', 'Reward', 'Promotion'];
        $scope.rarities = ['All', 'Free', 'Common', 'Rare', 'Epic', 'Legendary'];
        $scope.classes = ['All', 'Neutral', 'Mage', 'Warrior', 'Shaman', 'Priest', 'Paladin', 'Druid', 'Hunter', 'Warlock', 'Rogue'];
        $scope.types = ['All', 'Minion', 'Weapon', 'Spell'];

        $scope.activeFilter = {
            'class': 'All',
            'rarity': 'All',
            'type': 'All',
            'category': 'All'
        };

//        $scope.activeFilter = {
//            'category': {'Basic': true, 'Expert': true, 'Curse of Naxxramas': true, 'Reward': true, 'Promotion': true},
//            'class': {'Neutral': true, 'Mage': true, 'Warrior': true, 'Shaman': true, 'Priest': true, 'Paladin': true, 'Druid': true, 'Hunter': true, 'Warlock': true, 'Rogue': true},
//            'rarity': [
//                {'checked': true,'title': 'Free', 'color': '#000000'},
//                {'checked': true,'title': 'Common', 'color': '#939393'},
//                {'checked': true,'title': 'Rare', 'color': '#0070dd'},
//                {'checked': true,'title': 'Epic', 'color': '#a335ee'},
//                {'checked': true,'title': 'Legendary', 'color': '#ff8000'}
//            ],
//            'type': {'Minion': true, 'Spell': true, 'Weapon': true}
//        };
    });

    $scope.activeFilter = function () {
        return $scope.activeFilter;
    };

    $scope.changeFilter = function (newFilter) {
        $rootScope.$broadcast('filterChanged');  
        $scope.cards = HearthstoneService.shuffle(HearthstoneService.filterCards($scope.allCards, $scope.activeFilter));
    };

    $rootScope.$on('cardChange', function() {
        for(var i = 0; i < $scope.cards.length; i++) {
            $scope.cards[i].active = false;
        }

        // blur all the select elements. this prevents keyboard shortcuts from being "stolen" by a focused select box.
        document.getElementById("cardType").blur();
        document.getElementById("cardCategory").blur();
        document.getElementById("cardRarity").blur();
        document.getElementById("cardClass").blur();
    });

    $rootScope.$on('cardFlipKeyup', function(event, data) {
        var currentCard = $scope.cards[data.carouselIndex];

        currentCard.active = !currentCard.active;
    });
}]);