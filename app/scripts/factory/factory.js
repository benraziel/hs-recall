'use strict';

angular.module('hearthstoneApp')
    .factory('HearthstoneService', function ($http) {  
        var myService = {
		    getData: function() {
		    	var result = [];
		      	var promise = $http.get('AllSets.json').then(function (response) {
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

                        if (!card.playerClass) {
                            card.playerClass = 'Neutral';
                        }

                        card.category = categories[i];
	  					result.push(card);
	  				});
	  			}
	  			return result;	
	  		},

            filterCards: function(cards, filter) {
                var result = [];

                cards.forEach(function(element, index, array) {
                    //console.log("filter class: ",filter.class);
                    //console.log("element class: ",element.playerClass);
                    //console.log("filter.category[element.category]: ",filter.category[element.category]);

                    if (filter.type[element.type] &&
                        (filter.class[element.playerClass] || filter.class["Neutral"]) &&
                        filter.category[element.category] &&
                        filter.rarity[element.rarity]) {

                        result.push(element)
                    }
                });

                console.log("number of cards after filter: ",result.length);
                return result;
            },

	  		shuffle: function(o) {
	  			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	  			return o;	
	  		},
		};
		return myService;
    });