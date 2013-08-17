angular.module('app', ['ngRoute'])
    .constant('partialUrl', './partials')
    .run(function ($rootScope, partialUrl) {
        $rootScope.partialUrl = partialUrl;
    })

    .config(function ($routeProvider, partialUrl) {
        $routeProvider
            .when('/', {
                templateUrl: partialUrl + '/home.html'
            })
            .when('/benchmark/:name*', {
                templateUrl: partialUrl + '/benchmark-view.html',
                controller: 'BenchmarkViewCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });