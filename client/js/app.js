angular.module('app', ['ngRoute'])
    .constant('partialUrl', './partials')
    .run(function ($rootScope, partialUrl) {
        $rootScope.partialUrl = partialUrl;
    })

    .config(function ($routeProvider) {

    });