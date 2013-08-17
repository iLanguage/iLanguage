var express = require('express'),
    app = express(),
    grest = require("grest"),
    http = require("http"),
    Q = require("q"),
    Sequelize = require("sequelize"),
    performance = require("./lib/performance");
    

var type = grest.type;

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

var sequelize = new Sequelize('mcbenchjs', 'root', 'root', {
	dialect: 'sqlite',
	storage: './mcbench.sqlite'
});
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
    }
]);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
