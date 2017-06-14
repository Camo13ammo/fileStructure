'use strict';

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('contracts', {
        cache: false,
        url: '/contracts/:name',
        controller: 'ContractsCtrl',
        templateUrl: 'browser/app/components/contracts/contracts.html',
        resolve: {
            name: ['$stateParams', function($stateParams) {
                return $stateParams.name ? $stateParams.name : '';
            }]
        }
    });
}]);
