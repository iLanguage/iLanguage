exports.getCompileString = function (options) {
    return "";
};

exports.getRunString = function (options, args) {
    return "octave --path " + options.sources + " " + options.runPath + " " + args.join(" ");
};