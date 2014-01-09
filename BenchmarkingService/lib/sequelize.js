var type = require("grest").type;
var errors = require("../lib/errors");
var Q = require("q");

exports.JSToSequelize  = function (schema, o) {
    var sequelizeObj = {}; 

    for (var p in schema) {
        var t = schema[p];

        if (type.array.equals(t) && Object.prototype.hasOwnProperty.call(o, p)) {
            if (o[p].length === 0) {
                sequelizeObj[p] = null;
            } else {
                sequelizeObj[p] = o[p].join(",");    
            }
        } else if (Object.prototype.hasOwnProperty.call(o, p)) {
            sequelizeObj[p] = o[p];
        }
    }
    return sequelizeObj;
};


exports.SequelizeToJS = function (schema, o) {
    var jsObj = {}; 

    for (var p in schema) {
        var t = schema[p];

        if (type.array.equals(schema[p])) {
            if (o[p] !== null) {
                jsObj[p] = o[p].split(",");    
            } else {
                jsObj[p] = [];
            }
        } else {
            jsObj[p] = o[p];
        }
    }

    return jsObj;
};

exports.SequelizeToPromise = function (deferred, schema) {
    return function (err, data) {
        if (!err) {
            deferred.resolve(exports.SequelizeToJS(schema, data)); 
        } else {
            deferred.reject(new errors.DataBase(err));
        }
    }
};

var sequelize = {
    JSToSequelize: exports.JSToSequelize,
    SequelizeToJS: exports.SequelizeToJS,
    SequelizeToPromise: exports.SequelizeToPromise
};

exports.CRUD = function (exports, table, typeSchema) {

    function ensureTableInitialized() {
        if (table.connection === null ) throw new Error("Uninitialized '" + table.name + "' table");
    }

    var JSToSequelize = function (o) {
        return sequelize.JSToSequelize(typeSchema, o);
    };

    var SequelizeToJS = function (o) {
        return sequelize.SequelizeToJS(typeSchema, o);
    };

    function SequelizeToPromise(deferred) {
        return sequelize.SequelizeToPromise(deferred, typeSchema);
    }

    function add(attributes) {
        ensureTableInitialized();
        var deferred = Q.defer();
        var entry = table.connection.build(JSToSequelize(attributes));
        entry.save().done(SequelizeToPromise(deferred));
        return deferred.promise;
    }

    function getAll () {
        ensureTableInitialized();
        var deferred = Q.defer();
        table.connection.findAll().done(function (err, data) {
            if (!err) {
                deferred.resolve(data.map(SequelizeToJS)); 
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function get(id) {
        ensureTableInitialized();
        var deferred = Q.defer();
        table.connection.find(id).done(SequelizeToPromise(deferred));
        return deferred.promise;
    }

    function getSome(attributes) {
        ensureTableInitialized();
        var deferred = Q.defer();
        table.connection.findAll({where:JSToSequelize(attributes)}).done(function (err, data) {
            if (!err) {
                deferred.resolve(data.map(SequelizeToJS)); 
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function update(id, attributes) {
        ensureTableInitialized();
        var deferred = Q.defer();
        table.connection.find(id).done(function (err, entry) {
            if (!err) {
                if (entry !== null) {
                    entry.updateAttributes(JSToSequelize(attributes)).done(SequelizeToPromise(deferred));
                } else {
                    var e = new errors.NotFound("Entry '" + id + "' not found.");
                    e.id = id;
                    deferred.reject(e);
                }
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function remove(id) {
        ensureTableInitialized();
        var deferred = Q.defer();
        table.connection.find(id).done(function (err, entry) {
            if (!err) {
                if (entry !== null) {
                    entry.destroy().done(SequelizeToPromise(deferred));
                } else {
                    var e = new errors.NotFound("Entry '" + id + "' not found.");
                    e.id = id;
                    deferred.reject(e);
                }
            } else {
                deferred.reject(e);
            }
        });
        return deferred.promise;
    }

    exports.add = add; 
    exports.get = get;
    exports.getAll = getAll;
    exports.getSome = getSome;
    exports.update = update;
    exports.remove = remove;
};
