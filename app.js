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
    path = require('path');
    

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
]);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
