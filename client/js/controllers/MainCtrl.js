angular.module('app')
    .controller('MainCtrl', function ($scope, $location, benchmarkData) {
        $scope.benchmarks = benchmarkData.getAll();
        $scope.benchmark = null;
        $location.url('/');
        
        $scope.selectBenchmark = function (benchmark) {
            $scope.benchmark = benchmark;
            if (benchmark) {
                $location.url('/benchmark/' + benchmark.name.replace(/ /, '-'));
            }
        }
    });