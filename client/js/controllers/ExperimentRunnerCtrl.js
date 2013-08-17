angular.module('app')
    .controller('ExperimentRunnerCtrl', function($scope, $rootScope, $http) {
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

        $scope.sendRunCommand = function () {
            $http.post('http://184.107.193.50:8080/performance/run', $scope.data)
                .success(function () {
                    console.log(arguments);
                }).error(function () {
                    console.log('err', arguments);
                })
        };

        $scope.open = function (evt, data) {
            jQuery.extend($scope.data, data);
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