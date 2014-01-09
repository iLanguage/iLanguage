var exec = require("child_process").exec
, appConfig = require("../appConfig.json")
, murmurhash = require("murmurhash")
, Q = require("q")
, errors = require("../lib/errors");

function Command() {

}
Command.prototype.start = function () {
    return this;
}
Command.prototype.cancel = function () {
    return this;
}

function LocalCommand(executable, options, env) {
    this.status = "created";
    this.output = "";
    this.error = "";
    this.exitCode = null;
    this.executable = executable;
    this.options = options;
    this.env = env;
    this.childProcess = null;
    this.deferred = Q.defer();
}
LocalCommand.prototype = new Command();

LocalCommand.prototype.start = function () {
    this.started = "running";
    var self = this;
    this.childProcess = exec(this.executable, this.options, function (err, stdout, stderr) {
        self.error = err;
        if (err !== null) {
            self.status = "failed";
            var e = new errors.Process("Command '" + self.executable + "' failed, returned " + err);
            e.output = stdout.toString();
            e.error = stderr.toString();
            self.deferred.reject(e);
        } else {
            self.status = "completed";
            self.output = "" + stdout;    
            self.deferred.resolve(stdout);
        }
    });
    return this.deferred.promise;
};

LocalCommand.prototype.cancel = function () {
    this.childProcess.kill("SIGTERM");
    this.status = "canceled";
    var e = new errors.Process("Command '" + self.executable + " " + self.args + "' canceled");
    e.output = this.output;
    e.error = this.error;
    this.deferred.reject(e);
};

function InstrumentedCommand(cmd, env) {
    if (!(cmd instanceof LocalCommand)) {
        throw new errors.McBench("InstrumentedCommand requires a LocalCommand as argument");
    }
    this.command = cmd; 
    this.instrumentedCommand = new LocalCommand("/usr/bin/time -p " + cmd.executable + " 2>&1", cmd, env);
    this.env = env;
    this.runTime = 0;
    this.maxMemory = NaN;
    this.json = {};
};

InstrumentedCommand.prototype.start = function () {   
    var self = this;
    return this.instrumentedCommand.start().then(function () {
        var output = self.instrumentedCommand.output;
        var match = output.match(new RegExp("user +(\\d+\\.\\d+)"));
        if (match === null) {
            throw new errors.Process("Could not retrieve running time from command output:\n" + output);
        }
        self.runTime = Number(match[1]);

        var match = output.match(new RegExp("<json>(.*)</json>"));
        if (match !== null) {
            self.json = JSON.parse(match[1]);
        }

        return Q(self); 
    });
};

InstrumentedCommand.prototype.cancel = function () {
    return this.instrumentedCommand.cancel();
};

InstrumentedCommand.prototype.getJsonOutput = function () {
    return this.json; 
};

function RemoteCommand(executable, args, env) {

}
RemoteCommand.prototype = new Command();

exports.Local = LocalCommand;
exports.Remote = RemoteCommand;
exports.Instrumented = InstrumentedCommand;
