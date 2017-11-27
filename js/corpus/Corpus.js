(function(exports) {

	var Corpus =  exports.FieldDB ? exports.FieldDB.ComputationalLinguisticsCorpus : require('fielddb/api/corpus/ComputationalLinguisticsCorpus').ComputationalLinguisticsCorpus;
	Corpus.Orthography = {};
	Corpus.Orthography.Tokenizer = exports.Tokenizer || require('../lexicon/Tokenizer').Tokenizer;

	exports.Corpus = Corpus;

})(typeof exports === 'undefined' ? this : exports);
