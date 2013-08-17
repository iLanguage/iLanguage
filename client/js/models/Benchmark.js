angular.module('app')
    .factory('Benchmark', function () {
        function Benchmark(name, data) {
            this.name = name;
            this.data = data;
        }

        angular.extend(Benchmark.prototype, {

        });

        return Benchmark;
    });