(function(exports) {

	var Corpus = {}; //require('fielddb/api/corpus/Corpus');
	Corpus.Orthography = {};
	Corpus.Orthography.Tokenizer = require('../tokenizer').Tokenizer;

	exports.Corpus = Corpus;

})(typeof exports === 'undefined' ? this['Corpus'] = {} : exports);
