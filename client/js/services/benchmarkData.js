angular.module('app')
    .service('benchmarkData', function ($http, $q, Benchmark) {
        var benchmarks = [];
        // 184.107.193.50:8080/performance
        return {
            getAll: function () {
                $http.get("http://184.107.193.50:8080/performance").success(function (data) {
                    var benchmarkByName = {};

                    angular.forEach(data.result, function (benchmark) {
                        var name = benchmark.benchmarkName + " " + benchmark.benchmarkVersion;
                        if (!benchmarkByName[name]) {
                            benchmarkByName[name] = [];
                        }

                        benchmarkByName[name].push(benchmark);
                    });

                    var existingBenchmarks = {};
                    angular.forEach(benchmarks, function (benchmark) {
                        existingBenchmarks[benchmark.name] = benchmark;
                    });

                    angular.forEach(benchmarkByName, function (allData, name) {
                        if (!existingBenchmarks.hasOwnProperty(name)) {
                            benchmarks.push(new Benchmark(name, allData));
                        } else {
                            var benchmark = existingBenchmarks[name];
                            angular.forEach(allData, function (data) {
                                if (!benchmark.hasEntry(data)) {
                                    benchmark.addEntry(data);
                                }
                            });
                        }
                    });
                });
                return benchmarks;
            }
        }
    });