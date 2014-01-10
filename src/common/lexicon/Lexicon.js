(function(exports) {

	var Lexicon = {}; //  require('fielddb/api/lexicon/Lexicon');
	Lexicon.StopWords = require('../stop-words').StopWords;

	exports.Lexicon = Lexicon;

})(typeof exports === 'undefined' ? this['Lexicon'] = {} : exports);
