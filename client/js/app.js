angular.module('app', [])
    .constant('partialUrl', './partials')
    .run(function ($rootScope, partialUrl) {
        $rootScope.partialUrl = partialUrl;
    });