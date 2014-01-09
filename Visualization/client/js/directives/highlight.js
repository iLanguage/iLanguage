angular.module('app')
    .directive('matlabSrcSyntaxHighlighting', function ($http) {
        return {
            link: function (scope, element, attr) {

                var fibonacciSrc = ""
				+"correct = [1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155];"
				+""
				+"arg_list = argv();\n"
				+"scale = str2num(arg_list{1});\n"
				+"iteration = str2num(arg_list{2});\n"
				+""
				+"% Fibonacci.m by David Terr, Raytheon, 5-11-04\n"
				+""
				+"function fib = Fibonacci(n)\n"
				+""
				+"if ( n ~= floor(n) )\n"
				+"    error('Argument must be an integer.');\n"
				+"    return;\n"
				+"end\n"
				+""
				+"if ~isreal(n)\n"
				+"    error('Argument must be an integer.');\n"
				+"    return;\n"
				+"end\n"
				+""
				+"if size(n,1) ~= 1 || size(n,2) ~= 1\n"
				+"    error('Argument must be an integer.');\n"
				+"    return;\n"
				+"end\n"
				+""
				+"if ( n == 0 )\n"
				+"    fib = 0;\n"
				+"    return;\n"
				+"end\n"
				+""
				+"if ( n == 1 )\n"
				+"    fib = 1;\n"
				+"    return;\n"
				+"end\n"
				+""
				+"if ( n < 0 )\n"
				+"    fib = (-1)^(n+1) * Fibonacci(-n);\n"
				+"    return;\n"
				+"end\n"
				+""
				+"fib = Fibonacci(n-1) + Fibonacci(n-2);\n"
				+""
				+"end\n"
				+"\n"
				+"\n"
				+"for n = 1:iteration\n"
				+"    value = Fibonacci(scale);\n"
				+"    if ((correct(scale) != value)) \n"
				+"        exit(1);\n"
				+"    end\n"
				+"end\n"
				+"exit(0);";




                var sources = {
                    "fibonacci 1.0": fibonacciSrc
                };

                function addExecutionByNumber() {
                    $http.get("http://184.107.193.50:8080/instrumentations/756271991/results")
                        .success(function (data) {
                            var lis = element.find("li:not(:last-child)");
                            angular.forEach(data.result.data[0].lines, function (info) {
                                var li = lis.eq(info.line-1);
                                if (jQuery.trim(li.text())) {
                                    li.append('<span style="float: right">' + info.executed + '</span>');
                                }
                            });
                        });
                }

                scope.$watch(attr.benchmarkName, function (name) {

                    if (sources.hasOwnProperty(name)) {
                        element.html(sources[name]);
                        prettyPrint();
                        addExecutionByNumber();
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
                            addExecutionByNumber();
                        });
                    }

                });
            }
        };
    });