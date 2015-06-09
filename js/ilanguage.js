(function(exports) {

	var iLanguage = {};
	iLanguage.Corpus = exports.Corpus || require('./corpus/Corpus').Corpus;
	iLanguage.Lexicon = exports.Lexicon || require('./lexicon/Lexicon').Lexicon;

	exports.iLanguage = iLanguage;
	console.log("Loaded iLanguage", iLanguage);
})(typeof exports === 'undefined' ? this : exports);
