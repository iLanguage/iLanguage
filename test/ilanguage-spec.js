'use strict';

try {
	var iLanguage = require('../js/ilanguage');
} catch (e) {
	console.log(e);
	console.log(e.stack);
}

describe('iLanguage', function() {

	it('should load', function() {
		expect(iLanguage).toBeDefined();
		expect(iLanguage.Corpus).toBeDefined();
		expect(iLanguage.Lexicon).toBeDefined();
	});

});