angular.module('app')
    .controller('ExperimentRunnerCtrl', function($scope, $rootScope, $http, benchmarkData) {
        $scope.data = {
            "backend": {
                "name": "Octave",
                "version": "3.4.3"
            },
            "benchmark": {
                "name": "escoufier",
                "version": "1.0",
                "iteration": 3,
                "scale": 22
            }
        };
        $scope.isPolling = false;

        $scope.sendRunCommand = function () {
            $scope.isPolling = true;

            $scope.data.benchmark.iteration = parseInt($scope.data.benchmark.iteration, 10);
            $scope.data.benchmark.scale = parseInt($scope.data.benchmark.scale, 10);
            $http.post('http://184.107.193.50:8080/performance/run', $scope.data)
                .success(function (response) {
                    var taskId = response.result[1].id,
                        intervalId = setInterval(pollTaskStatus, 2000);

                    function pollTaskStatus() {
                        jQuery.get('http://184.107.193.50:8080/tasks/' + taskId)
                            .success(function (response) {
                                console.log(response.result.status, response.result.status === "done");
                                if (response.result.status === "done") {
                                    clearInterval(intervalId);
                                    $scope.$apply(function() {
                                        benchmarkData.getAll();
                                        $scope.isPolling = false;
                                    });
                                } else if(response.result.status === "failed") {
                                    clearInterval(intervalId);
                                    $scope.$apply("isPollied = false");
                                }
                            })
                            .error(function () {
                                clearInterval(intervalId);
                                $scope.$apply("isPollied = false");
                            });
                    }
                }).error(function () {
                    alert('An error occurred!');
                    console.log('error running the tasks', arguments);
                    $scope.isPolling = false
                })
        };

        $scope.open = function (evt, data) {
            if (!data) {
                data = {
                    "benchmark": {
                        "name": $scope.benchmark.instances[0].benchmarkName,
                        "version": $scope.benchmark.instances[0].benchmarkVersion
                    }
                }
            }
            jQuery.extend(true, $scope.data, data);
            $scope.shouldBeOpen = true;
        };

        $rootScope.$on('openExperimentRunner', $scope.open);

        $scope.close = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
        };

        $scope.items = ['item1', 'item2'];

        $scope.opts = {
            backdropFade: true,
            dialogFade:true
        };
    });