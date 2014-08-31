'use strict';

angular.module('hearthstoneApp')
    .factory('HearthstoneService', function ($http) {  
        var myService = {
		    getData: function() {
		    	var result = [];
		      	var promise = $http.get('/AllSets.json').then(function (response) {
		        	return response.data;
		      	});
		      	return promise;
		    },

		    flattenJson: function(data, categories) {	  			
	  			var result = [];
	  			var typesToFilter = ['Enchantment', 'Hero'];
	  			for(var i=0; i < categories.length; i++) {
	  				var cardsInCategory = data[categories[i]];
	  				cardsInCategory.forEach(function(card) {
	  					var filterOutByType = typesToFilter.indexOf(card.type) !== -1; 
	  					var nonCollectable = card.collectible !== true;
	  					if (filterOutByType || nonCollectable) {
	  						return; 
	  					}
	  					card.category = categories[i]; 
	  					result.push(card);
	  				});
	  			}
	  			return result;	
	  		},

	  		generateCardList: function(numCards) {
	  			var result = [];
	  			for(var i = 0; i < numCards; i++) {
	  				var cardIndex = Math.floor(Math.random()*numCards);
	  				result.push(cardIndex);	
	  			}
	  			return result;
	  		},

	  		getLastCard : function(currentCard) {
	  			return myService.usedCardList[currentCard.index - 1];	
	  		},

	  		getPrevCard : function(currentCard) {
	  			return myService.usedCardList[currentCard.index - 1];	
	  		},
		};
		return myService;
    });