'use strict';

window.app = angular.module('testingApp', [
    'ui.router',
]);

app.config(($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) => {
    // $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider.rule(($injector, $location) => {
        const path = $location.path();
        const noTrailingSlash = path[path.length - 1] !== '/';

        if (noTrailingSlash) {
            return path + '/';
        }
    });
});
