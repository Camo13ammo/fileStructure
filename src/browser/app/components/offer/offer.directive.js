'use strict';

app.directive('offer', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'browser/app/components/offer/offer.html',
        link: function(scope, elem, attrs) {
            scope.price = (Math.random() * 2000) + 1000;
        }
    };
});

