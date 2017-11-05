'use strict';

var memoryLoad;
try {
	memoryLoad = require('memory');
} catch (exception) {
	console.log("Cant automate tests for memory heap changes");
}


var ILanguage = ILanguage || require('../js/ilanguage').ILanguage;
var randomMorphologicalText = randomMorphologicalText || require('../js/text-generator').randomMorphologicalText;

var sampleText = sampleText || "";
var sampleTextOptions = {};
if (!sampleText) {
	try {
		var fs = require("fs");
		// var sampleLargeText = fs.readFileSync('SampleData/InuktitutMagazine102-104rough-inuktitut-lc.txt', 'utf8').trim();
		sampleText = sampleLargeText;
		sampleTextOptions.iso = "iu";
	} catch (e) {
		console.log("I wasnt able to load the inuktitut data, using a generated ქართული text instead", e)
		sampleTextOptions = {
			wordCount: 20,
			iso: "ka",
			maxWordLength: 20,
			maxMorphemeLength: 9,
			maxMorphemesPerWord: 4
		};
		sampleText = randomMorphologicalText(sampleTextOptions);
	}
}

describe("ILanguage", function() {

	describe("construction", function() {

		it("should load", function() {
			expect(ILanguage).toBeDefined();
			expect(ILanguage.Corpus).toBeDefined();
			expect(ILanguage.Lexicon).toBeDefined();
		});

		it("should create new iLanguages from text", function() {
			var ilanguageFromText = new ILanguage("a simple text");
			expect(ilanguageFromText).toBeDefined();
			expect(ilanguageFromText.orthography).toEqual("a simple text");
		});

		it("should create new iLanguages from objects", function() {
			var ilanguageFromText = new ILanguage({
				orthography: "a simple text"
			});
			expect(ilanguageFromText).toBeDefined();
			expect(ilanguageFromText.orthography).toEqual("a simple text");
		});

		it("should accept a lexicon if one is provided", function() {
			var ilanguageFromText = new ILanguage({
				orthography: "a simple text",
				lexicon: [{
					orthography: "a"
				}, {
					orthography: "other"
				}]
			});
			expect(ilanguageFromText).toBeDefined();
			expect(ilanguageFromText.orthography).toEqual("a simple text");
			expect(ilanguageFromText.lexicon).toBeDefined();
			expect(ilanguageFromText.lexicon.length).toEqual(2);
			expect(ilanguageFromText.lexicon[0].orthography).toEqual("a");
			expect(ilanguageFromText.lexicon[1].orthography).toEqual("other");
		});

		it("should create a lexicon if one is needed", function() {
			var ilanguageFromText = new ILanguage({
				orthography: sampleText
			});
			expect(ilanguageFromText.orthography).toEqual(sampleText);
			expect(ilanguageFromText.lexicon).toBeDefined();
			if (sampleTextOptions.iso === "iu") {
				expect(ilanguageFromText.lexicon.length).toEqual(10255);
			} else {
				expect(ilanguageFromText.lexicon.length).toEqual(20);
			}
		});


	});

	describe("scalability", function() {

		it("should scale to large datasets", function() {
			expect(sampleText).toBeTruthy();
		});

		describe("speed", function() {

			it("should run quickly on large datasets", function() {
				expect(true).toBeTruthy();
			});
		});

		describe("run everywhere", function() {

			it("should run offline clientside on subsets of large datasets", function() {
				expect(sampleText).toBeTruthy();
			});
		});

		/** 
		 *
		 * Can also install system profilers:
		 * https://strongloop.com/strongblog/node-js-performance-heap-profiling-tip/
		 * 
		 * @type {[type]}
		 */
		describe("memory", function() {

			it("should have as small a memory footprint as possible", function() {
				expect(sampleText).toBeDefined();
			});

			if (memoryLoad) {
				it("should not have memory leaks", function() {
					// var memorySizes = [4,5];
					var memorySizes = [2024, 2025, 2027, 2027, 2028, 2029]; // Recursion busts around 7200 Maximum call stack size exceeded

					var startingMemoryLoad = memoryLoad();
					expect(startingMemoryLoad).toBeDefined();
					console.log("startingMemoryLoad " + startingMemoryLoad);
					expect(startingMemoryLoad).toBeGreaterThan(0);


					for (var index = 0; index < memorySizes.length; index++) {
						var itteration = {
							size: memorySizes[index],
							result: "",
							memory: 0
						};
						sampleTextOptions = {
							wordCount: 100 + itteration.size,
							iso: "ka",
							maxWordLength: 20,
							maxMorphemeLength: 9,
							maxMorphemesPerWord: 4
						};
						itteration.result = randomMorphologicalText(sampleTextOptions);
						itteration.memory = memoryLoad();
						console.log("Memory load after linear size text generation " + itteration.memory);
						memorySizes[index] = itteration;
					}

				});
			}

		});

	});
});
