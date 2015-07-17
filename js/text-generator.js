(function(exports) {

  var DEFAULT_MAX_WORD_LENGTH = 10;
  var DEFAULT_MAX_MORPHEME_LENGTH = 5;

  var randomASCIIString = function(length) {
    return Math.random(1400).toString(36).substring(length);
  };

  var randomUnicodeWord = function(options) {
    if (!options) {
      console.warn("randomUnicodeWord:  You must pass options to recieve a word. ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        wordLength: options
      };
    }

    if (options.wordLength <= 0) {
      var thisWord = options.word;
      options.word = "";
      return thisWord;
    }

    options = randomOrthographicText.setLanguage(options);
    options.word = options.word || "";

    options.word = options.word + String.fromCharCode(options.unicodeStartChar + Math.random() * (options.unicodeRange));

    // console.log("  randomUnicodeWord\n", options);
    options.wordLength--;
    return randomUnicodeWord(options);
  };

  var randomOrthographicText = function(options) {
    if (!options) {
      console.warn("randomOrthographicText:  You must pass options to recieve a text. ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        wordCount: options
      };
    }

    if (options.wordCount <= 0) {
      return options.orthography;
    }

    options.orthography = options.orthography || options.text || "";
    options.wordBoundary = options.wordBoundary || " ";
    options.wordLength = Math.random() * (options.maxWordLength || DEFAULT_MAX_WORD_LENGTH);

    options.orthography = options.orthography +
      (options.orthography ? options.wordBoundary : "") + randomUnicodeWord(options).replace(new RegExp(options.wordBoundary, "g"), "");

    console.log("  randomOrthographicText\n", options);
    options.wordCount--;
    return randomOrthographicText(options);
  };

  var randomMorphologicalText = function(options) {
    if (!options) {
      console.warn("randomMorphologicalText:  You must pass options to recieve a text from ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        wordCount: options,
        iso: "en"
      };
    }

    return randomMorphologicalWord(options);
  };

  var randomMorphologicalWord = function(options) {
    if (!options) {
      console.warn("randomMorphologicalWord:  You must pass options to recieve a text from ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        morphemeCount: options,
        iso: "en"
      };
    }

    if (options.morphemeCount <= 0) {
      return options.orthography;
    }

    options.orthography = options.orthography || options.text || "";
    options.morphemeBoundary = options.morphemeBoundary || "-";

    options.orthography = options.orthography + (options.orthography ? options.morphemeBoundary : "") + randomUnicodeWord(options.maxWordLength || Math.random() * DEFAULT_MAX_MORPHEME_LENGTH);
    // console.log("  randomOrthographicText\n", options);
    options.morphemeCount--;
    return randomMorphologicalWord(options);
  };
  /**
   *  Builds a naive unicode character range for a given language iso 
   *  (or accepts a range to be passed in). 
   *  
   *  While this usually isn't enough to make words
   *  which look like real words in x language, its enough to ensure the 
   *  texts will be in unicode.
   *
   *  See http://billposer.org/Linguistics/Computation/UnicodeRanges.html to add more ranges
   *  
   * @param {Object|String} options Either an iso code, or an object containing optionally an iso code,
   * or predefined character start and options.length of range.
   */
  randomOrthographicText.setLanguage = function(options) {
    // Reduce computation
    if (options && options.unicodeStartChar && options.unicodeRange) {
      return options;
    }

    var iso;

    if (!options) {
      options = {};
    } else if (typeof options === "string") {
      iso = options;
      options = {
        iso: iso
      };
    } else if (options.iso) {
      iso = options.iso;
    }

    if (!options.iso && !options.unicodeStartChar) {
      console.warn("NOTE: Using a-z by default. You can specify any language using a start and range length");
      iso = options.iso = "en";
    }

    if (iso === "en") {
      options.unicodeStartChar = options.unicodeStartChar || 0x0061;
      options.unicodeRange = options.unicodeRange || 0x007b - 0x0061;
    } else if (iso === "ipa") {
      options.unicodeStartChar = options.unicodeStartChar || 0x1D00;
      options.unicodeRange = options.unicodeRange || 0x1D7F - 0x1D00;
    } else if (iso === "ja") {
      options.unicodeStartChar = options.unicodeStartChar || 0x3040;
      options.unicodeRange = options.unicodeRange || 0x30FF - 0x3040;
    } else if (iso === "ka") {
      options.unicodeStartChar = options.unicodeStartChar || 0x10A0;
      options.unicodeRange = options.unicodeRange || 0x10FF - 0x10A0;
    }

    if (!options.unicodeRange) {
      options.unicodeRange = 95;
    }

    // console.log("  setLanguage\n", options);
    return options;
  };

  exports.textGenerator = randomOrthographicText;
  exports.randomOrthographicText = randomOrthographicText;
  exports.randomMorphologicalText = randomMorphologicalText;

  exports.randomUnicodeWord = randomUnicodeWord;
})(typeof exports === 'undefined' ? this : exports);
