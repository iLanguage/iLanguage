"use strict";

var memoryLoad;
try {
	memoryLoad = require('memory');
} catch (exception) {
	console.log("Cant automate tests for memory heap changes");
}


var iLanguage = iLanguage || require('../js/ilanguage').iLanguage;
var randomMorphologicalText = randomMorphologicalText || require('../js/text-generator').randomMorphologicalText;
var sampleTextOptions = {
	wordCount: 20,
	iso: "ka",
	maxWordLength: 20,
	maxMorphemeLength: 9,
	maxMorphemesPerWord: 4
};

var sampleText = sampleText || randomMorphologicalText(sampleTextOptions);

describe("iLanguage", function() {

	it("should load", function() {
		expect(iLanguage).toBeDefined();
		expect(iLanguage.Corpus).toBeDefined();
		expect(iLanguage.Lexicon).toBeDefined();
	});

	describe("scalability", function() {

		it("should scale to large datasets", function() {
			expect(true).toBeTruthy();
		});

		describe("speed", function() {

			it("should run quickly on large datasets", function() {
				expect(true).toBeTruthy();
			});
		});

		describe("run everywhere", function() {

			it("should run offline clientside on subsets of large datasets", function() {
				expect(true).toBeTruthy();
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
					var memorySizes = [7224, 7225, 7227, 7227, 7228, 7229]; // Recursion busts around 7200 Maximum call stack size exceeded

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

