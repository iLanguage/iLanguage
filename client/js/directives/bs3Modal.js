angular.module('app')
    .directive('bs3Modal', function ($parse, $timeout) {
        return function (scope, element, attr) {
            var setter = $parse(attr.bs3Modal).assign;
            scope.$watch(attr.bs3Modal, function (value) {
                if (value) {
                    element.modal('show');
                } else {
                    element.modal('hide');
                }
            });
            element.on('show.bs.modal', setScopeValue(true));
            element.on('hide.bs.modal', setScopeValue(false));

            function setScopeValue(value) {
                return setter ? function () {
                    $timeout(function () {
                        setter(scope, value);
                    });
                } : angular.noop;
            }
        }
    });