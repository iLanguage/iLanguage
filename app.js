var express = require('express'),
    app = express(),
    grest = require("grest"),
    http = require("http"),
    Q = require("q"),
    Sequelize = require("sequelize"),
    benchmarks = require ('./lib/benchmark'),
    backends = require('./lib/backend'),
    task = require ('./lib/task.js'),
    command = require("./lib/command.js"),
    performance = require("./lib/performance"),
    errors = require('./lib/errors'),
    appConfig = require('./appConfig.json'),
    path = require('path'),
    instrumentations = require("./lib/instrumentation.js"),
    fs = require('fs');
    

var type = grest.type;
var taskManager = new task.Manager();

var options = {
    dialect: "mysql",
    storage: "./mcbench.sqlite"
};

process.argv.forEach(function (val) {
    if (val === "--sqlite") {
        options.dialect = "sqlite";
    }
});


if (options.dialect === "sqlite") {
    var sequelize = new Sequelize('mcbenchjs', 'root', 'root', options);
} else if (options.dialect === "mysql") {
    var sequelize = new Sequelize('mcbenchjs', 'root', 'root', {dialect: 'mysql'});
}

function toHttpResponse(value, res) {
    if (res === undefined) {
        throw new errors.McBench("expected a valid http response object");
    }

    function error(e) {
        if (e.httpStatus === undefined) {
            throw new Error("Unsupported eor " + e);
        }

        var jsonError = {
            statusCode: e.httpStatus,
            error: e
        }

        if (e.stack !== undefined) {
            jsonError.stack = e.stack;
        }

        res.json(e.httpStatus, jsonError);
    }

    if (Q.isPromise(value)) {
        value 
        .then(function (result) {
            res.json(200, {
                statusCode: 200,
                result: result
            });
        })
        .fail(error)
        .done();
    } else if (value instanceof (errors.McBench)) {
        error(value); 
    } else {
        res.json(200, {
            statusCode: 200,
            result: value
        });
    }
}

function toErrorLog(value) {
    if (Q.isPromise(value)) {
        value
        .then(function () {}) // do nothing on success
        .fail(function (err) {
            console.log(new Date() + ": " + err);
        })
        .done();
    } else {
        console.log(value);
    }
}

performance.createDBSchema(sequelize, Sequelize);
sequelize.sync();


app.use(express.bodyParser());
app.set('port', process.env.PORT || 8080);
grest.rest(app, "", [
    "GET", ["test"], type.string,
    "Returns a test string",
    function (req, res) {
        res.send("hello world");
    },
    "GET", ["performance"], 
    type.array(performance.schema),
    "Returns all performance results",
    function (req, res) {
        toHttpResponse(performance.getAll(), res);
    },
    "POST", ["performance", "run"], 
    performance.schema,
    type.array(task.schema),
    "Creates performance tasks with the provided options. Return created tasks.", 
    function (req,res) {
        var benchmarkId = benchmarks.getId(req.body.benchmark);
        var backendId = backends.getId(req.body.backend);
        var scale = req.body.benchmark.scale;
        var iteration = req.body.benchmark.iteration;
        
        toHttpResponse(
            benchmarks
            .get(benchmarkId)
            .then(function (benchmark) {
                return backends
                .get(backendId)
                .then(function (backend) {
                    var sources = path.join(appConfig.benchmarks.path, benchmark.sources);
                    var runPath = path.join( appConfig.benchmarks.path, benchmark.runPath);

                    var t = taskManager.task(new command.Local(
                        backends.operations[backendId].getCompileString({
                            sources: sources,
                            runPath: runPath
                        }), 
                        appConfig.command
                    ));
                    var t2 = taskManager.task(new command.Instrumented(new command.Local(
                        backends.operations[backendId].getRunString({
                            sources: sources,
                            runPath: runPath
                        }, [scale, iteration]), 
                        appConfig.command
                    )));

                    toErrorLog(
                        t.start()
                        .then(t2)
                        .then(function (t2) {
                            return performance.add({
                                benchmarkName: benchmark.name,
                                benchmarkVersion: benchmark.version,
                                backendName: backend.name,
                                backendVersion: backend.version,
                                compile:true,
                                run:true,
                                scale:scale,
                                iteration:iteration,
                                runtime:t2.command.runTime,
                                startDate:t2.startTime,
                                endDate:t2.endTime
                            });
                        })
                    )
                    return task.TasksToJS([t, t2]);
                })
            }),
            res
        );
    },
    
    "GET", ["instrumentations"],
    type.array({
        "name": type.string,
        "version": type.string
    }),
    "Return the instrumentation data for a benchmark run",
    function (req, res) {
	toHttpResponse(instrumentations.getAll(), res);
    },

    "GET", ["instrumentations", type.integer("id")],
    {},
    "Return the instrumentation metadata for a benchmark run",
    function (req, res) {
	toHttpResponse(instrumentations.get(req.params.id), res);
    },

    "GET", ["instrumentations", type.integer("id"), "results"],
    {
        "status": type.string,
        "time": type.array({
            "iteration": type.integer,
            "value": type.number,
        }),
        "count": type.array({
            "line": type.integer,
            "value": type.integer     
        })
    },
    "Return the instrumentation results for a benchmark run",
    function (req, res) {
	toHttpResponse(instrumentations.getResults(req.params.id), res);
    },

    "POST", ["instrumentations", "run"],
    {
        "backend": {
            "name": type.string,
            "version": type.string
        }, 
        "benchmark": {
            "name": type.string,
            "version": type.string,
            "scale": type.integer,
            "iteration": type.integer
       }
    },
    type.array(task.schema),
    "Return the instrumentation data for a benchmark run",
    function (req, res) {
        var instrumentationId = benchmarks.getId(req.body.benchmark);
        var backendId = backends.getId(req.body.backend);
        var scale = req.body.benchmark.scale;
        var iteration = req.body.benchmark.iteration;
        
        toHttpResponse(
            instrumentations
            .get(instrumentationId)
            .then(function (instrumentation) {
                return backends
                .get(backendId)
                .then(function (backend) {
                    var sources = path.join(appConfig.instrumentations.path, instrumentation.sources);
                    var runPath = path.join( appConfig.instrumentations.path, instrumentation.runPath);
                    var resultPath = path.join(appConfig.instrumentations.path, instrumentation.results);

                    var t = taskManager.task(new command.Local(
                        backends.operations[backendId].getCompileString({
                            sources: sources,
                            runPath: runPath
                        }), 
                        appConfig.command
                    ));
                    var t2 = taskManager.task(new command.Instrumented(new command.Local(
                        backends.operations[backendId].getRunString({
                            sources: sources,
                            runPath: runPath
                        }, [scale, iteration]), 
                        appConfig.command
                    )));

                    toErrorLog(
                        t.start()
                        .then(t2)
                        .then(function (t2) {
		            var json = t2.command.getJsonOutput();
                            return Q.nfcall(fs.writeFile, resultPath, JSON.stringify({status:"done", data:[json]}, null, "    "));
                        })
                    )
                    return task.TasksToJS([t, t2]);
                })
            }),
            res
        );
   },

   "POST", ["benchmarks", "src"], {
    "benchmark": {
        "name": type.string,
        "version": type.string            
       }
   },
   type.string,
   "Returns the source code of the benchmark",
   function (req, res) {
    toHttpResponse(benchmarks.getSrc(benchmarks.getId(req.body.benchmark)), res);
   },

   "GET", ["tasks"], 
    type.array(task.schema),
    "Returns all tasks.",
    function (req,res) {
        toHttpResponse(task.TasksToJS(taskManager.getAll()), res);
    },

    "GET", ["tasks", "running"], 
    type.array(task.schema),
    "Returns all running tasks.",
    function (req,res) {
        toHttpResponse(task.TasksToJS(taskManager.getSome({status:"running"})), res);
    },

    "GET", ["tasks", type.integer("id")], 
    task.schema, 
    "Returns the task with matching identifier.",
    function (req,res) {
        var t = taskManager.get(req.params.id);
        if (t !== undefined) {
            toHttpResponse(task.TaskToJS(t), res);
        } else {
            toHttpResponse(new errors.NotFound("Task '" + req.params.id + "' could not be found"), res);
        }
    },
]);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
