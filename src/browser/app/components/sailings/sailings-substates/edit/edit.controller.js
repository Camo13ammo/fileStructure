'use strict';

app.controller('EditCtrl', ['$scope', 'offerId', ($scope, offerId) => {
    $scope.offerId = offerId;
}]);
