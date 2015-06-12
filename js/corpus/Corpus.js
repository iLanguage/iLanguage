(function(exports) {

	var Corpus = {}; //require('fielddb/api/corpus/Corpus');
	Corpus.Orthography = {};
	Corpus.Orthography.Tokenizer = exports.Tokenizer || require('../lexicon/Tokenizer').Tokenizer;

	exports.Corpus = Corpus;

})(typeof exports === 'undefined' ? this : exports);
