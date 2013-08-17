angular.module('app')
    .service('benchmarkData', function ($http, $q, Benchmark) {
        var benchmarks = [];
        // 184.107.193.50:8080/performance
        return {
            getAll: function () {
                $http.get("http://184.107.193.50:8080/performance").success(function (data) {
                    var benchmarkByName = {};
                    benchmarks.length = 0;

                    angular.forEach(data.result, function (benchmark) {
                        var name = benchmark.benchmarkName + " " + benchmark.benchmarkVersion;
                        if (!benchmarkByName[name]) {
                            benchmarkByName[name] = [];
                        }

                        benchmarkByName[name].push(benchmark);
                    });

                    angular.forEach(benchmarkByName, function (data, name) {
                        benchmarks.push(new Benchmark(name, data));
                    });
                });
                return benchmarks;
            }
        }
    });