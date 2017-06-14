'use strict';

app.config(['$stateProvider', ($stateProvider) => {
    $stateProvider
    .state('sailings', {
        cache: false,
        url: '/sailings',
        controller: 'SailingsCtrl',
        templateUrl: 'browser/app/components/sailings/sailings.html'
    })
    .state('sailings.market', {
        url: '/market/',
        controller: 'MarketCtrl',
        templateUrl: 'browser/app/components/sailings/sailings-substates/market/market.html'
    })
    .state('sailings.edit', {
        url: '/edit-offers/:offerId',
        templateUrl: 'browser/app/components/sailings/sailings-substates/edit/edit.html',
        controller: 'EditCtrl',
        resolve: {
            offerId: ['$stateParams', ($stateParams) => {
                return $stateParams.offerId || undefined;
            }]
        }
    })
    .state('sailings.create', {
        url: '/create-offers/',
        templateUrl: 'browser/app/components/sailings/sailings-substates/create/create.html'
    });
}]);
