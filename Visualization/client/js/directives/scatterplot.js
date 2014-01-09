angular.module('app')
    .directive('scatterPlot', function() {
        return {
            link: function(scope, element, attr) {
                var compiler_runs_data = [];
                var useLogBubbleSize = true;
                showUserThePerformanceTestDetails = function(json) {
                    var jsonForServer = {
                        "backend": {
                            "name": "Octave",
                            "version": "3.4.3",
                        },
                        "benchmark": {
                            "name": "escoufier",
                            "version": "1.0",
                            "iteration": 3,
                            "scale": 22,
                        }
                    };
                    jsonForServer.backend.version = json.backendVersion;
                    jsonForServer.backend.name = json.backendName;

                    jsonForServer.benchmark.name = json.benchmarkName;
                    jsonForServer.benchmark.version = json.benchmarkVersion;
                    jsonForServer.benchmark.iteration = json.iteration;
                    jsonForServer.benchmark.scale = json.scale;

                    scope.$apply(function () {
                        scope.$emit("openExperimentRunner", jsonForServer);
                    })
                };

                var drawScatterPlot = function() {

                    console.log(compiler_runs_data);

                    var clearPreviousPlots = true;
                    if (clearPreviousPlots) {
                        element.html("");
                    }
                    var w = element.width(),
                        h = 300,
                        pad = 20,
                        left_pad = 100;

                    var svg = d3.select(element[0])
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    /* Get the max values from the JSON to determine the axis lengths */
                    var max_value_of_x = Math.max.apply(Math,
                        compiler_runs_data.map(function(d) {
                            return d.scale;
                        }));
                    var max_value_of_y = Math.max.apply(Math,
                        compiler_runs_data.map(function(d) {
                            return d.runtime;
                        }));

                    var x = d3.scale.linear().domain([0, max_value_of_x]).range([left_pad, w - pad]),
                        y = d3.scale.linear().domain([max_value_of_y, 0]).range([pad, h - pad * 2]);


                    /* basic axis */
                    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                        yAxis = d3.svg.axis().scale(y).orient("left");

                    svg.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0, " + (h - pad) + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + (left_pad - pad) + ", 0)")
                        .call(yAxis);

                    /* Show Loading until the data loads */
                    svg.append("text")
                        .attr("class", "loading")
                        .text("Loading ...")
                        .attr("x", function() {
                            return w / 2;
                        })
                        .attr("y", function() {
                            return h / 2 - 5;
                        });


                    var max_r = d3.max(compiler_runs_data.map(
                        function(d) {
                            return d[2];
                        })),
                        r = d3.scale.linear()
                            .domain([0, d3.max(compiler_runs_data, function(d) {
                                return d[2];
                            })])
                            .range([0, 12]);


                    var getXFromJson = function(object) {
                        return x(object.scale);
                    };

                    var getYFromJson = function(object) {
                        return y(object.runtime);
                    };

                    var bubbleWeight = 1;
                    var getBubbleSizeFromJson = function(object) {
                        if (useLogBubbleSize) {
                            bubbleWeight = 10;
                        } else {
                            bubbleWeight = 1;
                        }
                        var radius = object.runtime / object.iteration * bubbleWeight
                        console.log("Run time: " + object.runtime);
                        console.log("Dataset size: " + object.iteration);
                        console.log("\tRadius: " + radius);
                        if (useLogBubbleSize) {
                            radius = Math.log(radius);
                        }
                        
                        // if (radius > 50){
                        //  radius = object.runtime/object.scale;
                        // }
                        if(object.runtime < 0.2){
                            return 2;
                        }
                        if(radius < 2){
                            return 2;
                        }
                        return radius;
                    };


                    /* Make a tooltip which can show the details */
                    var tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .html("");

                    var color = d3.scale.category20();

                    svg.selectAll(".loading").remove();
                    svg.selectAll("circle")
                        .data(compiler_runs_data)
                        .enter()
                        .append("circle")
                        .attr("class", "circle")
                        .attr("cx", getXFromJson)
                        .attr("cy", getYFromJson)
                        .attr("r", getBubbleSizeFromJson)
                        .style("fill", function(object, i) {
                            return color(i);
                        })
                        .style("opacity", function(object, i) {
                            return ".9";
                        })
                        .on("mouseover", function(object) {
                            return tooltip
                                .style("visibility", "visible")
                                .html("<div class='run_details_tooltip'>Benchmark: " + object.benchmarkName + "<br/> Time: " + object.runtime + "<br/> Iterations: " + object.iteration + "<br/> Dataset Size: " + object.scale + "</div>");
                        })
                        .on("mousemove", function(object) {
                            return tooltip.style("top", (event.pageY - 10) + "px")
                                .style("left", (event.pageX + 10) + "px");
                        })
                        .on("mouseout", function(object) {
                            return tooltip
                                .style("visibility", "hidden");
                        })
                        .on("click", function(object) {
                            showUserThePerformanceTestDetails(object);
                        });
                };
                scope.$watch(attr.useLogBubbleSize, function(newValue, oldValue){
                    useLogBubbleSize = newValue;
                    return drawScatterPlot();
                });

                scope.$watchCollection(attr.scatterPlot, function(newValue, oldValue){
                    compiler_runs_data = newValue;
                    return drawScatterPlot();
                });
                
            }
        }
    });