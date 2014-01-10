(function(exports) {

	var iLanguage = {};
	iLanguage.Corpus = require('./corpus/Corpus').Corpus;
	iLanguage.Lexicon = require('./lexicon/Lexicon').Lexicon;

	exports.iLanguage = iLanguage;

})(typeof exports === 'undefined' ? this['iLanguage'] = {} : exports);
