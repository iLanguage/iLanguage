angular.module('app')
    .directive('scatterPlot', function () {
        return {
            link: function (scope, element, attr) {
                var w = element.width(),
                    h = 300,
                    pad = 20,
                    left_pad = 100;

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                /* TODO use the data to determine this */
                var max_value_of_x = 30;
                var max_value_of_y = 117;

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

                /* Show Loading */
                svg.append("text")
                    .attr("class", "loading")
                    .text("Loading ...")
                    .attr("x", function() {
                        return w / 2;
                    })
                    .attr("y", function() {
                        return h / 2 - 5;
                    });

                scope.$watchCollection(attr.scatterPlot, function (punchcard_data, oldData) {
                    var max_r = d3.max(punchcard_data.map(
                            function(d) {
                                return d[2];
                            })),
                        r = d3.scale.linear()
                            .domain([0, d3.max(punchcard_data, function(d) {
                                return d[2];
                            })])
                            .range([0, 12]);


                    var getXFromJson = function(object) {
                        return x(object.scale);
                    };

                    var getYFromJson = function(object) {
                        return y(object.runtime);
                    };

                    var showRunDetails = function(object) {
                        alert("Object " + object.runtime);

                        d3.select(this).enter().append("text")
                            .text(function(d) {
                                return d.runtime;
                            })
                            .attr("x", function(d) {
                                return x(d.scale);
                            })
                            .attr("y", function(d) {
                                return y(d.runtime);
                            });
                    };

                    var bubbleWeight = 10;
                    var getBubbleSizeFromJson = function(object) {
                        var radius = object.runtime / object.scale * bubbleWeight
                        console.log("Run time: " + object.runtime);
                        console.log("Dataset size: " + object.scale);
                        console.log("Radius: " + radius);
                        // if (radius > 50){
                        // 	radius = object.runtime/object.scale;
                        // }
                        return radius;
                    };


                    /* Make a tooltip which can show the details */
                    var tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .html("");

                    svg.selectAll(".loading").remove();
                    svg.selectAll("circle")
                        .data(punchcard_data)
                        .enter()
                        .append("circle")
                        .attr("class", "circle")
                        .attr("cx", getXFromJson)
                        .attr("cy", getYFromJson)
                        .attr("r", getBubbleSizeFromJson)
                        .on("mouseover", function(object) {
                            return tooltip
                                .style("visibility", "visible")
                                .html("<div class='run_details_tooltip'>Benchmark: " + object.benchmarkName
                                    + "<br/> Time: "+ object.runtime
                                    + "<br/> Dataset Size: "+object.runtime
                                    + "</div>");
                        })
                        .on("mousemove", function(object) {
                            return tooltip.style("top", (event.pageY - 10) + "px")
                                .style("left", (event.pageX + 10) + "px");
                        })
                        .on("mouseout", function(object) {
                            return tooltip
                                .style("visibility", "hidden");
                        });
                });
            }
        }
    });