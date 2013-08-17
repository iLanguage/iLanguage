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

function createId (benchmark) {
    return parseInt(murmurhash.v2(benchmark.name + benchmark.version), 10);
}

var benchmarks = {};
fs.readdirSync(appConfig.benchmarks.path).forEach(function (dir) {
    var info = JSON.parse(fs.readFileSync(path.join(appConfig.benchmarks.path, dir, appConfig.benchmarks.metadata)));
    var id = createId(info);
    info.id = id;
    benchmarks[id] = info;
});

function get(id) {
    var deferred = Q.defer();
    process.nextTick(function () {
        if (Object.prototype.hasOwnProperty.call(benchmarks, id)) {
            deferred.resolve(deepCopy(benchmarks[id]));
        } else {
            deferred.reject(new errors.NotFound("benchmark '" + id + "' could not be found"));
        }
    });
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    process.nextTick(function () {
        deferred.resolve(deepCopy(benchmarks));
    });

    return deferred.promise;
}

var benchmarkSchema = type.object({
    name: type.string        
});

exports.get = get;
exports.getAll = getAll;

exports.schema = benchmarkSchema;
