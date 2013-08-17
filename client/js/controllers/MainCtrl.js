angular.module('app')
    .controller('MainCtrl', function ($scope, benchmarkData) {
        $scope.benchmarks = benchmarkData.getAll();
    });