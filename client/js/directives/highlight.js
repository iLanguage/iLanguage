angular.module('app')
    .directive('matlabSrcSyntaxHighlighting', function ($http) {
        return {
            link: function (scope, element, attr) {

                var fibonacciSrc = "";


                var sources = {
                    //"fibonacci 1.0": fibonacciSrc
                };


                scope.$watch(attr.benchmarkName, function (name) {

                    if (sources.hasOwnProperty(name)) {
                        element.html(sources[name]);
                        prettyPrint();
                    } else {
                        var info = name.split(' ');
                        $http.post("http://184.107.193.50:8080/benchmarks/src", {
                            "benchmark": {
                                "name": info[0],
                                "version": info[1]
                            }
                        }).success(function (data) {
                                sources[name] = data.result;
                                element.html(sources[name]);
                                prettyPrint();
                                $http.get("http://184.107.193.50:8080/instrumentations/756271991/results")
                                    .success(function (data) {
                                        var lis = element.find("li:not(:last-child)");
                                        angular.forEach(data.result.data[0].lines, function (info) {
                                            var li = lis.eq(info.line-1);
                                            if (jQuery.trim(li.text())) {
                                                li.append('<span style="float: right">' + info.executed + '</span>');
                                            }
                                        });
                                    })
                            })
                    }

                });
            }
        };
    });