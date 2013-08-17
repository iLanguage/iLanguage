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

function createId (backend) {
    return parseInt(murmurhash.v2(backend.name + backend.version), 10);
}

var backends = {};
var operations = {};

fs.readdirSync(appConfig.backends.path).forEach(function (dir) {
    var info = JSON.parse(fs.readFileSync(path.join(appConfig.backends.path, dir, appConfig.backends.metadata)));
    var id = createId(info);
    info.id = id;
    backends[id] = info;
    operations[id] = require("../" + path.join(appConfig.backends.path, dir, appConfig.backends.operationPath));
});

function add(attributes) {
    var deferred = Q.defer();
    
    process.nextTick(function () {
        deferred.reject(new errors.NotImplemented("Unimplemented add operation for backends"));
    });
    
    return deferred.promise;
}

function get(id) {
    var deferred = Q.defer();
    process.nextTick(function () {
        if (Object.prototype.hasOwnProperty.call(backends, id)) {
            deferred.resolve(deepCopy(backends[id]));
        } else {
            deferred.reject(new errors.NotFound("backend '" + id + "' could not be found"));
        }
    });
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
    process.nextTick(function () {
        deferred.resolve(deepCopy(backends));
    });
    return deferred.promise;
}


var backendSchema = type.object({
   name: type.string,
   version: type.string,
   compileCommand: type.string,
   runCommand: type.string,
   tags: type.array(type.string)
});

exports.get = get;
exports.getAll = getAll;

exports.schema = backendSchema;
exports.operations = operations;
