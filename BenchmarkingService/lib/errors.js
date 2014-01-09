var util = require('util');

function AbstractError(msg, ctor) {
    Error.captureStackTrace(this, ctor || this);
    this.message = msg || "Error";
}
util.inherits(AbstractError, Error);
AbstractError.prototype.name = "Abstract Error";

function McBenchError(s) {
    McBenchError.super_.call(this, s, this.constructor);
}
util.inherits(McBenchError, AbstractError);
McBenchError.prototype.name = "McBench Error";
McBenchError.prototype.httpStatus = 500;
exports.McBench = McBenchError;

function FSError(s) {
    FSError.super_.call(this, s, this.constructor);
}
util.inherits(FSError, McBenchError);
FSError.prototype.name = "File System Error";
FSError.prototype.httpStatus = 500;
exports.FileSystem = FSError;

function DBError(s) {
    DBError.super_.call(this, s, this.constructor);
}
util.inherits(DBError, McBenchError);
DBError.prototype.name = "Database Error";
DBError.prototype.httpStatus = 500;
exports.DataBase = DBError;

function ProcessError(s) {
    ProcessError.super_.call(this, s, this.constructor);
}
util.inherits(ProcessError, McBenchError);
ProcessError.prototype.name = "Process Error";
ProcessError.prototype.httpStatus = 500;
exports.Process = ProcessError;

function ValidationError(s) {
    this.message = s;
}
util.inherits(ValidationError, McBenchError);
ValidationError.prototype.name = "Validation Error";
ValidationError.prototype.httpStatus = 400;
exports.Validation = ValidationError;

function NotFoundError(s) {
    this.message = s;
}
util.inherits(NotFoundError, McBenchError);
NotFoundError.prototype.name = "Not Found Error";
NotFoundError.prototype.httpStatus = 404;
exports.NotFound = NotFoundError;

function NotImplementedError(s) {
    this.message = s;
}
util.inherits(NotImplementedError, McBenchError);
NotImplementedError.prototype.name = "Not Implemented Error";
NotImplementedError.prototype.httpStatus = 501;
exports.NotImplemented = NotImplementedError;

function NetworkError(s) {
    NetworkError.super_.call(this, s, this.constructor);
}
util.inherits(NetworkError, McBenchError);
NetworkError.prototype.name = "Network Error";
NetworkError.prototype.httpStatus = 500;
exports.Network = NetworkError;