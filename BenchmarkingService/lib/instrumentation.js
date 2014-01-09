var fs = require("fs"),
    path = require("path"),
    appConfig = require("../appConfig.json"),
    type = require("grest").type,
    errors = require("../lib/errors"),
    murmurhash = require('murmurhash'),
    Q = require("q");

function deepCopy(obj) {
    if (typeof obj !== "object")
        return obj;

    if (obj instanceof Array) {
        return obj.map(deepCopy);
    }

    var clone = {};
    for (var p in obj) {
        clone[p] = obj[p];
    }

    return clone;
}

function arrayToSet(a) {
    var set = {};
    a.forEach(function (x) {
        set[x] = true;
    });
    return set;
}

function createId (instrumentation) {
    return parseInt(murmurhash.v2(instrumentation.name + instrumentation.version), 10);
}

var instrumentations = {};
var instrumentationResults = {};
var operations = {};

fs.readdirSync(appConfig.instrumentations.path).forEach(function (dir) {
    var info = JSON.parse(fs.readFileSync(path.join(appConfig.instrumentations.path, dir, appConfig.instrumentations.metadata)));
    var id = createId(info);
    info.id = id;
    instrumentations[id] = info;
    var results = JSON.parse(fs.readFileSync(path.join(appConfig.instrumentations.path, dir, appConfig.instrumentations.result)));
    instrumentationResults[id] = results;
    //operations[id] = require("../" + path.join(appConfig.instrumentations.path, dir, appConfig.instrumentations.operationPath));
});

function add(attributes) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented add operation for instrumentations"));
    });
    
    return deferred.promise;
}

function get(id) {
    var deferred = Q.defer();
    process.nextTick(function () {
        if (Object.prototype.hasOwnProperty.call(instrumentations, id)) {
            deferred.resolve(deepCopy(instrumentations[id]));
        } else {
            deferred.reject(new errors.NotFound("instrumentation '" + id + "' could not be found"));
        }
    });
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
    process.nextTick(function () {
        deferred.resolve(deepCopy(instrumentations));
    });
    return deferred.promise;
}

function getSome(attributes) {
    var deferred = Q.defer();
    process.nextTick(function () {
        function match(backend) {
            for (var p in attributes) {
                var pattern = attributes[p];
                var value = backend[p];

                if (p === "tags") {
                    var expected = arrayToSet(pattern);
                    var found = arrayToSet(value); 

                    for (var t in found) {
                        if (expected[t] !== true) return false;
                    }
                }

                if (backend[p] !== attributes[p]) return false;

                return true;
            }
        }
        
        var list = [];
        for (var id in instrumentations) {
            if (match(instrumentations[id])) {
                list.push(deepCopy(instrumentations[id]));
            }
        }

        deferred.resolve(list);
    });
    return deferred.promise;
}

function update(id, attributes) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented update operation for instrumentations"));
    });
    
    return deferred.promise;
}

function remove(id) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented remove operation for instrumentations"));
    });
    
    return deferred.promise;
}

function getResults(id) {
    var deferred = Q.defer();
    process.nextTick(function () {
        if (Object.prototype.hasOwnProperty.call(instrumentationResults, id)) {
            var resultPath = path.join(appConfig.instrumentations.path, instrumentations[id].results);
            var jsonResult = JSON.parse(fs.readFileSync(resultPath).toString());
            deferred.resolve(jsonResult);
        } else {
            deferred.reject(new errors.NotFound("instrumentation '" + id + "' could not be found"));
        }
    });
    return deferred.promise;
}

var instrumentationSchema = type.object({
   name: type.string,
   version: type.string,
});

exports.add = add;
exports.get = get;
exports.getAll = getAll;
exports.getSome = getSome;
exports.update = update;
exports.remove = remove;
exports.getId = createId;
exports.getResults = getResults;

exports.schema = instrumentationSchema;

