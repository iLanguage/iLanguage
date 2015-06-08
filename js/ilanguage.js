(function(exports) {

	var iLanguage = {};
	iLanguage.Corpus = require('./corpus/Corpus').Corpus;
	iLanguage.Lexicon = require('./lexicon/Lexicon').Lexicon;

	exports.iLanguage = iLanguage;
	console.log("Loaded iLanguage", iLanguage);
})(typeof exports === 'undefined' ? this['iLanguage'] = {} : exports);
