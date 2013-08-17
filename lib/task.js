var Q = require("q"),
    type = require("grest").type,
    errors = require("../lib/errors");

function Task(manager, cmd, env) {
    var self = function () {
        return self.start(); 
    }
    self.__proto__ = this.__proto__;

    self.id = Math.floor(Math.random() * 1000000000);
    self.status = "created";
    self.startTime = "";
    self.endTime = "";
    self.manager = manager;
    self.manager.add(self);
    self.command = cmd;
    self.environment = env;
    self.deferred = Q.defer();
    return self;
}

Task.prototype.status = function () {
    return this.status;
};

Task.prototype.start = function () {
    var self = this;
    self.status = "running";
    self.startTime = new Date();
    self.command.start()
    .then(function (output) {
        self.end(); 
    })
    .fail(function (err) {
        self.fail(err);
    })
    .done();
    return self.deferred.promise; 
};

Task.prototype.pause = function () {
    this.status = "pending";
};

Task.prototype.end = function () {
    this.status = "done";
    this.endTime = new Date();
    if (this.deferred === null) {
        throw new Error("Task has not been started yet");
    }
    this.deferred.resolve(this);
};

Task.prototype.cancel = function () {
    if (this.status === "done") {
        this.manager.remove(this.id);
    } else {
        this.status = "canceled";
        this.endTime = new Date();
        this.manager.remove(this.id);
        if (this.deferred === null) {
            throw new Error("Task has not been started yet");
        }
        this.deferred.reject(this);
    }
};

Task.prototype.fail = function (err) {
    this.status = "failed";
    this.endTime = new Date();
    this.error = err;
    if (this.deferred === null) {
        throw new Error("Task has not been started yet");
    }
    this.deferred.reject(err, this);
};

Task.prototype.promise = function () {
    return this.deferred.promise;
};

function TaskManager() {
    this.count = 0;
    this.collection = {};
}

TaskManager.prototype.add = function (t) {
    this.count++;
    if (this.collection[t.id] !== undefined) {
        throw new errors.McBench("TaskManager has already a task with id '" + t.id + "'");
    }
    this.collection[t.id] = t;    
};

TaskManager.prototype.remove = function (id) {
    this.count--;
    var t = this.collection[id];
    delete this.collection[id];
    return t;
};

TaskManager.prototype.get = function (id) {
    return this.collection[id];
};

TaskManager.prototype.getAll = function () {
    var list = [];
    for (var id in this.collection) {
        list.push(this.collection[id]);
    }
    return list;
};

TaskManager.prototype.getSome = function (attributes) {
    var list = [];
    for (var id in this.collection) {
        var t = this.collection[id];
        
        var match = true;
        for (var p in attributes) {
            if (t[p] !== attributes[p]) {
                match = false;
            }
        }

        if (match) list.push(this.collection[id]);
    }
    return list;
};

TaskManager.prototype.task = function (cmd, env) {
    return new Task(this, cmd, env);
};

TaskManager.prototype.gc = function () {
    var self = this;
    this.getAll().forEach(function (t) {
        if (t.status === "done" ||
            t.status === "failed" || 
            t.status === "canceled") {
            self.remove(t);
        }
    });
};

function TaskQueue() {
    this.tasks = [];
}

TaskQueue.prototype.add = function (t) {
    this.tasks.push(t);
    return t;
};

TaskQueue.prototype.remove = function (t) {
    for (var i = 0; i < this.tasks.length; ++i) {
        if (this.tasks[i] === t) {
            break;
        }
    }

    if (i < this.tasks.length) {
        this.tasks.splice(i, 1);
    }
    return t;
};

TaskQueue.prototype.next = function () {
    if (this.tasks.length === 0) {
        return null;
    }
    return this.tasks.shift(); 
};

var taskSchema = {
    id: type.integer,
    status: type.string,
    startTime: type.string,
    endTime: type.string
};

function JSToTasks(manager, obj) {
    if (obj.id !== undefined) return [manager.get(obj.id)];
    return manager.getSome(obj);
};

function TaskToJS(t) {
    var jsObj = {};

    for (var p in taskSchema) {
        jsObj[p] = t[p];
    }

    return jsObj;
}

function TasksToJS(ts) {
    return ts.map(TaskToJS);
};


exports.Task = Task;
exports.Manager = TaskManager;
exports.Queue = TaskQueue;
exports.JSToTasks = JSToTasks;
exports.TasksToJS = TasksToJS;
exports.TaskToJS = TaskToJS;
exports.schema = taskSchema;
