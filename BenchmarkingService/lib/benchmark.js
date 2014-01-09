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

function add(attributes) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented add operation for benchmarks"));
    });
    
    return deferred.promise;
}

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

function getSome(attributes) {
    var deferred = Q.defer();

    process.nextTick(function () {
        function match(benchmark) {
            for (var p in attributes) {
                var pattern = attributes[p];
                var value = benchmark[p];

                if (p === "tags") {
                    var expected = arrayToSet(pattern);
                    var found = arrayToSet(value); 

                    for (var t in found) {
                        if (expected[t] !== true) return false;
                    }
                }

                if (benchmark[p] !== attributes[p]) return false;

                return true;
            }
        }
        
        var list = [];
        for (var id in benchmarks) {
            if (match(benchmarks[id])) {
                list.push(deepCopy(benchmarks[id]));
            }
        }

        return deferred.resolve(list);
    });

    return deferred.promise;
}

function update(id, attributes) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented update operation for benchmarks"));
    });
    
    return deferred.promise;
}

function remove(id) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented remove operation for benchmarks"));
    });
    
    return deferred.promise;
}

function getSrc(id) {
    var deferred = Q.defer();
    return get(id).then(function (benchmark) {
        var srcFile = "src/run.m";
        var srcPath = path.join(appConfig.benchmarks.path, benchmark.name, appConfig.benchmarks.runFile);
        fs.readFile(srcPath, 'utf8', function (err, data) {
          if (!err) {
            deferred.resolve(data);
          } else {
            deferred.reject(err);
          }
        });
        return deferred.promise;
    });
}

var benchmarkSchema = type.object({
    name: type.string        
});

exports.add = add;
exports.get = get;
exports.getAll = getAll;
exports.getSome = getSome;
exports.update = update;
exports.remove = remove;
exports.getId = createId;
exports.getSrc = getSrc;

exports.schema = benchmarkSchema;
