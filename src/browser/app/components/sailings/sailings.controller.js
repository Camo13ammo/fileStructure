'use strict';

app.controller('SailingsCtrl', ['$scope', '$state', ($scope, $state) => {
    $scope.goMarket = () => {
        $state.go('sailings.market');
    };

    $scope.goEdit = () => {
        $state.go('sailings.edit', {offerId: null});
    };

    $scope.goCreate = () => {
        $state.go('sailings.create');
    };
}]);
