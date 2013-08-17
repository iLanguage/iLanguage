angular.module('app')
    .directive('highlight', function () {
        return function (scope, element) {
            hljs.highlightBlock(element[0]);
        }
    });