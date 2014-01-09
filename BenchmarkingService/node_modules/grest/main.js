function Type(id,desc) { throw new Error("Invalid abstract type constructor");};
var typeDict = {};

function isOptional(t) {
    return t instanceof typeDict.opt.ctor;
}

function isType(t) {
    return t instanceof Type;
}

function isFormType(t) {
    return t instanceof typeDict.archive.ctor;
}

function isValidJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function ValidationError(expected, received) {
    this.expected = expected;
    this.received = received;
    this.path = [];
}
ValidationError.prototype.toString = function () { 
    if (this.path.length === 0) {
        return "Invalid '" + this.expected + "' value, received '" + this.received + "' instead."; 
    } else {
        return "Invalid '" + this.expected + "' value at '" + this.pathToString() + "', received '" + this.received + "' instead.";
    }
}
ValidationError.prototype.prependPath = function (property) {
    this.path.push(property);
    return this;
};
ValidationError.prototype.pathToString = function () {
    var path = this.path.slice(0);
    path.reverse();
    return path.join('.');
};

function PropertyError(status, expected) {
    this.status = status;
    this.expected = expected;
    this.path = [];
};

PropertyError.prototype = new ValidationError("","");

PropertyError.prototype.toString = function () {
    if (this.path.length === 0) {
        return this.status + " property '" + this.expected + "'.";
    } else {
        return this.status + " property '" + this.pathToString() + "." + this.expected + "'.";
    }
};

function BaseType(id,desc) { throw new Error("Invalid abstract type constructor"); };
BaseType.prototype = Object.create(Type.prototype);
BaseType.prototype.typeString = function () {
    return this.typeName;
};

function CompoundType(id,desc) { throw new Error("Invalid abstract type constructor"); };
CompoundType.prototype = Object.create(Type.prototype);
CompoundType.prototype.typeString = function () {
    return this.typeName;
};

function BaseTypeCtor(name, validator,convertor) {
    var ctor = function (id,desc) {
        if (typeof id !== "string") { 
            throw new Error("Invalid identifier for type");
        }
        if (typeof desc !== "string") {
            throw new Error("Invalid description for type");
        }
        this.id = id;
        this.desc = desc;
        this.convertible = false;
    };
    ctor.prototype = Object.create(BaseType.prototype);
    ctor.prototype.typeName = name;
    ctor.prototype.validator = function (value) {
        return validator.call(this,value) === true ? true : new ValidationError(name, value);
    };
    ctor.prototype.toString = function () {
        return "[type " + this.typeString() + "]";
    };
    ctor.prototype.clone = function () {
        var clone = new ctor(this.id, this.desc);
        return clone;
    };
    ctor.prototype.setConvertible = function (bool) {
        this.convertible = bool;
    };
    ctor.prototype.hasId = function () {
        return this.id !== "";
    };
    ctor.prototype.convertor = convertor;
    ctor.hasInstance = function (o) {
        return o instanceof ctor;
    };
        

    var f = function (id,desc) {
        if (id === undefined) { id = ""; }
        if (desc === undefined) { desc = ""; }
        return new ctor(id,desc);    
    };

    ctor.call(f, "", "");
    f.__proto__ = ctor.prototype;
    f.ctor = ctor;
    return f;
}

function CompoundTypeCtor(name, validatorCtor, typeStringCtor, convertor, autoConvert) {
    var ctor = function (types, id, desc) {
        if (isType(id)) { 
            throw new Error("Expected string identifier, not type '" + id.typeString() + "'. Multiple types should be provided in an array."); 
        }

        if (typeof id !== "string") { 
            throw new Error("Invalid type identifier '" + id + "'.");
        }
        if (typeof desc !== "string") {
            throw new Error("Invalid type description '" + desc + "'.");
        }
        this.id = id;
        this.desc = desc;

        if (autoConvert === automaticObjectToTypeConversion) {
            if (types instanceof Array) {
                for (var i = 0; i < types.length; ++i) {
                    if (!isType(types[i])) {
                        types[i] = typeDict.object(types[i]);
                    } 
                }
            } else {
                if (!isType(types)) {
                    types = typeDict.object(types);
                } 
            }
        }

        this.validator = validatorCtor(types);
        this.typeString = typeStringCtor(types);
        this.types = types;
        this.convertible = false;
    }
    ctor.prototype = Object.create(CompoundType.prototype);
    ctor.prototype.typeName = name;
    ctor.prototype.validator = function (value) { throw new Error("Uninitialized validator"); };
    ctor.prototype.toString = function () {
        return "[type " + this.typeString() + "]";
    };
    ctor.prototype.clone = function () {
        var clone = new ctor(this.types.map(function (c) { return c.clone(); }), this.id, this.desc);
        return clone;
    };
    ctor.prototype.setConvertible = function (bool) {
        this.convertible = bool;

        if (this.types instanceof Array) {
            this.types.forEach(function (t) {
                t.setConvertible(bool);
            });
        } else {
            this.types.setConvertible(bool);
        }
    };
    ctor.prototype.hasId = function () {
        return this.id !== "";
    };
    ctor.prototype.convertor = convertor;
    ctor.hasInstance = function (o) {
        return o instanceof ctor;
    };

    var f = function (types, id, desc) {
        if (id === undefined) { id = ""; }
        if (desc === undefined) { desc = ""; }
        
        return new ctor(types, id, desc);
    };
    f.ctor = ctor;
    return f;
}

function addBaseTypes(type, spec) {
    for (var i = 0; i < spec.length; ++i) {
        var name = spec[i];
        var validator = spec[++i];
        var convertor = spec[++i];
        var typeCtor = new BaseTypeCtor(name, validator, convertor);

        if (name instanceof Array) {
            if (name.length <= 1) {
                throw new Error("Invalid name path '" + name + "'");
            }

            var o = typeDict[name[0]];

            if (o === undefined) {
                throw new Error("Unknown type named '" + name[0] + "'");
            }
            for (var i = 1; i < name.length - 1; ++i) {
                o = o[name[i]];
                if (o === undefined) {
                    throw new Error("Unknown type named '" + name[i] + "'");
                }
            }
            o[name[i]] = typeCtor;
        } else if (typeof name === "string") {
            typeDict[name] = typeCtor;
        }
        typeCtor.equals = function (t) {
            return this.ctor.hasInstance(t);
        };
    }
}

function addCompoundTypes(type, spec) {
    for (var i = 0; i < spec.length; ++i) {
        var name = spec[i];
        var validatorCtor = spec[++i];
        var typeStringCtor = spec[++i];
        var convertor = spec[++i];
        var autoConvert = spec[++i];

        var typeCtor = new CompoundTypeCtor(name, validatorCtor, typeStringCtor, convertor, autoConvert);

        typeDict[name] = typeCtor; 
        typeCtor.equals = function (t) {
            return this.ctor.hasInstance(t);
        };
    }
}

function identity(value) { return value; }

addBaseTypes(typeDict,[
    "null", function (value) { return value === null; }, identity,
    "string", function (value) { return value !== undefined && value !== null && typeof value === "string"; }, String,
    "boolean", function (value) { 
        if (this.convertible === true) {
            value = Boolean(value);
        } 
        return value === true || value === false; 
    }, Boolean,
    "integer", function (value) {
        if (this.convertible === true) {
            var n = parseInt(value,10);
            return !isNaN(n);
        } else {
            return typeof value === "number" && parseFloat(value) === parseInt(value, 10) && !isNaN(value);
        }
    }, function (n) { return parseInt(n,10); }, 
    "number", function (value) { 
        if (this.convertible === true) {
            var n = Number(value); 
            return !Number.isNaN(n); 
        } else {
            return typeof value === "number" && !Number.isNaN(n);
        }
    }, Number,
    "email", function (value) { return typeof value === "string" && value.match(/\w+@\w+\.\w+/) !== null; }, identity,
    "archive", function (file) { return true; }, identity,
    "date", function (value) { return Date.parse(value) !== NaN; }, function (v) { return Date.parse(v); }
]);

function unimplementedConversion(value) { throw new Error("Unimplemented conversion for CompoundType"); }

var automaticObjectToTypeConversion = true;
var noAutoConversion = false;

addCompoundTypes(typeDict, [
    "array", function (type) { 
        return function (value) {
            if (!(value instanceof Array)) {
                return new ValidationError(this.typeString(), value);
            }

            for (var i = 0; i < value.length; ++i) {
                var result = type.validator(value[i]);
                if (result !== true) return result.prependPath(i);
            }

            return true;
        };
    }, function (type) {
        return function () {
            return "[array of " + type.typeString() + "]";
        };
    }, unimplementedConversion, automaticObjectToTypeConversion,
    "object", function (obj) {
        if (!(obj instanceof Object) || obj.__proto__ !== Object.prototype) {
            throw new Error("Invalid type: " + obj);
        }

        var optional = {};

        var schema = {};

        for (var p in obj) {
            var type = obj[p];

            if (!isType(type)) {
                type = typeDict.object(type);
            } 

            if (isOptional(type)) {
                optional[p] = true;
            } 

            schema[p] = type;
        }

        return function (value) {
            for (var p in schema) {
                if (!Object.prototype.hasOwnProperty.call(value, p)) {
                    if (optional[p] === true) {
                        continue;
                    }
                    return new PropertyError("Missing", p);
                }
                var result = schema[p].validator(value[p]);
                if (result !== true) { return result.prependPath(p); } 
            }

            for (var p in value) {
                if (!Object.prototype.hasOwnProperty.call(schema, p)) {
                    return new PropertyError("Unexpected",p);
                }
            }

            return true;
        };
    }, function (obj) {
        return function () {
            return "object";
        };
    }, unimplementedConversion, noAutoConversion,


    "or", function (types) { 
        return function (value) {
            for (var i = 0; i < types.length; ++i) {
                var result = types[i].validator(value);
                if (result === true) return true;
            }
            return new ValidationError(this.typeString(), value);
        };
    }, function (types) {
        var typeStrings = [];

        for (var i = 0; i < types.length; ++i) {
            typeStrings.push(types[i].typeString());
        }
        
        var typeString = typeStrings.join(" or ");

        return function () {
            return typeString; 
        };
    }, function (value) {
        for (var i = 0; i < this.types.length; ++i) {
            var result = this.types[i].validator(value);
            if (result === true) return this.types[i].convertor(value);
        }
        return new errors.McBench("Invalid convertion to '" + this.typeString() + "' for value '" + value + "'");
    }, automaticObjectToTypeConversion,

    "opt", function (type) { 
        return function (value) {
            return value === undefined || type.validator(value);
        };
    }, function (type) {
        var typeString = type.typeString();
        return function () {
            "[optional " + typeString + "]";
        };
    }, unimplementedConversion, automaticObjectToTypeConversion,

    "form", function (types) {
        for (var name in types) {
            var type = types[name];
        }

        return function (value,req) {
            for (var name in types) {
                var type = types[name];

                if (type instanceof typeDict.archive.ctor) {
                    var result = type.validator(req.files.name);
                    if (result !== true) return result;
                } else {
                    if (req.body[name] === undefined) return new Error("Missing form field '" + name + "'");
                    var string = decodeURIComponent(req.body[name]).split("+").join(" ");
                    if (!isValidJSON(string)) return new Error("Invalid JSON value for field '" + name + "'");
                    var value = JSON.parse(string);
                    var result = type.validator(value);
                    if (result !== true) return result;
                    req.body[name] = value;
                }
            }

            return true;
        }
    }, function (types) {
        return function () {
            return "[form]";
        };
    }, unimplementedConversion, noAutoConversion,
]);

function createUrl(prefix,url) {
    var strings = [prefix];
    var paramNb = 0;

    for (var i = 0; i < url.length; ++i) {
        var token = url[i];
        if (typeof token === "string") {
            strings.push(token);
        } else if (isType(token)) {
            strings.push(":" + paramNb++);
        } else  {
            throw new Error("Unsupported url token '" + token + "'");
        }
    }

    return strings.join("/"); 
}

function createUrlParamParser(url) {
    var paramNb = 0;
    var types = []; 
    for (var i = 0; i < url.length; ++i) {
        var token = url[i];
        if (typeof token === "string") {
            continue;
        } else if (isType(token)) {
            var clone = token.clone();
            clone.setConvertible(true);
            types.push(clone);
        } else  {
            throw new Error("Unsupported url token '" + token + "'");
        }
    }
    return function (req,res,next) {
        for (var i = 0; i < types.length; ++i) {
            var result = types[i].validator(req.params[i]);
            if (result !== true)  {
                res.status(400);
                res.send("Invalid argument for parameter '" + i + "': " + result.toString());
                break;
            } else if (types[i].hasId()) {
                req.params[types[i].id] = types[i].convertor(req.params[i]);
            } else {
                req.params[i] = types[i].convertor(req.params[i]);
            }
        }
        next();
    };
}


function createRequestParser(spec) {
    if (isType(spec)) {
        var t = spec;
    } else {
        var t = typeDict.object(spec);
    }

    if (t instanceof typeDict.form.ctor) {
        var expectedContentType = "multipart/form-data";
        var validateContentType = function (req) {
            return req.is(expectedContentType);    
        }
    } else {
        var expectedContentType = "application/json";
        var validateContentType = function (req) {
            return req.is(expectedContentType);    
        }
    }

    return function (req, res, next) {
        var result;
        if (!validateContentType(req)) {
            res.status(400);
            res.send("Invalid Content-Type, expected '" + expectedContentType + "'");
        } else if ((result = t.validator(req.body,req,res)) !== true) { 
            res.status(400);
            res.send(result.toString());
        } else { 
            next();
        }
    };
}

function handleError(err, req, res, next) {
    res.status(500);
    res.send(err.stack);
}

function noop(req, res, next) {
    next();
}

function validateResponse(spec) {
    if (isType(spec)) {
        var type = spec;
    } else {
        var type = typeDict.object(spec);
    }

    return function validateJson(req, res, next) {
        function validatedJson(obj) {
            var result = type.validator(obj);
            if (result !== true) {
                res.status(400);
                res.send("Invalid response: " + result.toString());
            } else {
                this.json(obj);
            }
        }

        res.validatedJson = validatedJson;
        next();
    }
}

function doNotValidateResponse(req, res, next) {
    res.validatedJson = res.json;
    next();
}

function rest(app,prefix,spec) {
    var bodyParserInstalled = false;
    // Make sure that express.bodyParser is installed
    for (var i = 0; i < app.stack.length; ++i) {
        var handle = app.stack[i].handle;
        if (handle.name === "bodyParser") {
            bodyParserInstalled = true;
            break;
        }
    }

    if (!bodyParserInstalled) {
        throw new Error("'app.use(express.bodyParser())' should be called before initializing the rest API");
    }


    var expressHttpType = {
        "GET":"get",
        "POST":"post",
        "PUT":"put",
        "DELETE":"delete"
    };
    
    for (var i = 0; i < spec.length; ++i) {
        var httpType = spec[i];

        if (httpType === "GET" || httpType === "DELETE" ||
            httpType === "POST" || httpType === "PUT") {
            var urlSchema = spec[++i];
            if (!(urlSchema instanceof Array)) { 
                throw new Error("Invalid route schema '" + urlSchema + "'"); 
            }

            var url = createUrl(prefix, urlSchema);
            var parseUrlParams = createUrlParamParser(urlSchema);

            if (httpType === "POST" || httpType === "PUT") {
                var parseRequest = createRequestParser(spec[++i]);
            } else {
                var parseRequest = noop;
            }

            var responseSchema = spec[++i];

            if (!isType(responseSchema) && typeof responseSchema !== "object") {
                throw new Error("Invalid response schema '" + responseSchema + "'");
            }

            var docString = spec[++i];

            if (typeof docString !== "string") {
                throw new Error("Invalid documentation string '" + docString + "'");
            }
            var processRequest = spec[++i];

            if (typeof processRequest !== "function" && !(processRequest instanceof Array)) {
                throw new Error("Invalid handler for route '" + httpType + " " + urlSchema + "', expected a function or array of functions");
            } else if (processRequest instanceof Array) {
                processRequest.forEach(function (x) {
                    if (typeof x !== "function") {
                        throw new Error("Invalid handler for route");
                    }
                });
            } else {
                processRequest = [processRequest];
            }
            
        } else {
            throw new Error("Unrecognized http type '" + httpType + "'");
        }

        var handlers = [url, parseUrlParams];

        if (parseRequest !== noop) { handlers.push(parseRequest); }

        if ("development" === app.get("env")) { 
            handlers.push(validateResponse(responseSchema)); 
        } else {
            handlers.push(doNotValidateResponse);
        }
        processRequest.forEach(function (x) {
            handlers.push(x);
        });
        handlers.push(handleError);

        app[expressHttpType[httpType]].apply(app, handlers);    
    }

    return app;
}

exports.type = typeDict;
exports.rest = rest;
