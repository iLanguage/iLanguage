(function(exports) {

	exports.Corpus = exports.Corpus || require('./corpus/Corpus').Corpus;
	exports.Lexicon = exports.Lexicon || require('./lexicon/Lexicon').Lexicon;

	try {
		globals.iLanguage = iLanguage;
	} catch (e) {
		console.log("cannot set iLanguage on globals");
		console.log(e.stack);
	}
	exports.iLanguage = exports.iLanguage || exports;
	console.log("Loaded iLanguage into exports", exports);
})(typeof exports === 'undefined' ? this : exports);