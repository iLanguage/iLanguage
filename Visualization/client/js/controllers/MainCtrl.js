angular.module('app')
    .controller('MainCtrl', function($scope, $location, benchmarkData) {
        $scope.benchmarks = benchmarkData.getAll();
        $scope.benchmark = null;

        $scope.useLogScaleForBubbleSize = false;
        $scope.toogleButtonScale = function() {
            $scope.useLogScaleForBubbleSize = !$scope.useLogScaleForBubbleSize;
        };

        $scope.selectBenchmark = function(benchmark) {
            $scope.benchmark = benchmark;
            if (benchmark) {
                $location.url('/benchmark/' + benchmarkUrl(benchmark));
            }
        };

        var stopBenchmarksWatch = $scope.$watch('benchmarks.length', function(length) {
            if (length) {
                if ($location.url().indexOf("/benchmark/") == 0) {
                    var benchmarkName = $location.url().match(/^\/benchmark\/(.+)/);
                    if (benchmarkName) {
                        benchmarkName = benchmarkName[1];
                        angular.forEach($scope.benchmarks, function(benchmark) {
                            if (benchmarkName === benchmarkUrl(benchmark)) {
                                $scope.selectBenchmark(benchmark);
                            }
                        });
                    } else {
                        $scope.selectBenchmark($scope.benchmarks[0]);
                    }
                } else {
                    $scope.selectBenchmark($scope.benchmarks[0]);
                }
                stopBenchmarksWatch();
            }
        });


        function benchmarkUrl(benchmark) {
            return encodeURIComponent(benchmark.name.replace(/ /, '-'));
        }
    });