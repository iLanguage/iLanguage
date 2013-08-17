exports.getCompileString = function (options) {
    return "";
};

exports.getRunString = function (options, args) {
    return "backends/octave-3.6.4/src/octave-3.6.4/run-octave --path " + options.sources + " " + options.runPath + " " + args.join(" ");

};
