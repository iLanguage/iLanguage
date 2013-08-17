angular.module('app')
    .controller('MainCtrl', function ($scope, $location, benchmarkData) {
        $scope.benchmarks = benchmarkData.getAll();
        $scope.benchmark = null;
        $location.url('/');
        $scope.selectBenchmark = function (name) {
            $scope.benchmark = $scope.benchmarks[name];
            if ($scope.benchmark) {
                $location.url('/benchmark/' + name.replace(/ /, '-'));
            }
        }
    });