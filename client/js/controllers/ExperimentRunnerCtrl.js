angular.module('app')
    .controller('ExperimentRunnerCtrl', function($scope, $rootScope) {

        $scope.open = function () {
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