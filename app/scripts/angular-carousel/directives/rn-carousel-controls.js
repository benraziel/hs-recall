angular.module('angular-carousel')

.directive('rnCarouselControls', ['$rootScope', '$document', function($rootScope, $document) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      items: '=',
      index: '='
    },
    link: function(scope, element, attrs) {
      scope.prev = function() {
        if (scope.index > 0){
          scope.index--;
          $rootScope.$broadcast('cardChange');  
        }
        
      };
      scope.next = function() {
        if (scope.index < scope.items.length-1) {
          scope.index++;
          $rootScope.$broadcast('cardChange');
        } 
        
      };

      angular.element($document).bind("keyup", function(event) {
        var ARROWS_LEFT = 37;
        var ARROWS_RIGHT = 39;
        var NUMPAD_LEFT = 100;
        var NUMPAD_RIGHT = 102;
        var WASD_LEFT = 65;
        var WASD_RIGHT = 68;

        if ((event.which === ARROWS_LEFT) || (event.which === NUMPAD_LEFT) || (event.which === WASD_LEFT)) {
          scope.prev();
          scope.$apply();
        }
        else if ((event.which === ARROWS_RIGHT) || (event.which === NUMPAD_RIGHT) || (event.which === WASD_RIGHT)) {
          scope.next();
          scope.$apply();
        }
      });
    },
    templateUrl: 'carousel-controls.html'
  };
}]);

angular.module('angular-carousel').run(['$templateCache', function($templateCache) {
  $templateCache.put('carousel-controls.html',
    '<div class="rn-carousel-controls">\n' +
    '  <span class="rn-carousel-control rn-carousel-control-prev" ng-click="prev()" ng-if="index > 0"></span>\n' +
    '  <span class="rn-carousel-control rn-carousel-control-next" ng-click="next()" ng-if="index < items.length - 1"></span>\n' +
    '</div>'
  );
}]);