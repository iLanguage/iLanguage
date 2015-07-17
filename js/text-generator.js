(function(exports) {
  var randomASCIIString = function(length) {
    return Math.random(1400).toString(36).substring(length);
  };

  var randomUnicodeWord = function(options) {
    if (typeof options === "number") {
      options = {
        length: options,
        iso: "en"
      };
    }

    if (options.length <= 0) {
      return options.orthography;
    }

    options = randomOrthographicText.setLanguage(options);
    options.orthography = options.orthography || options.text || "";

    options.orthography = options.orthography + String.fromCharCode(options.unicodeStartChar + Math.random() * (options.unicodeRange));
    // console.log("  randomUnicodeWord", options);
    options.length--;
    return randomUnicodeWord(options);
  };

  var randomOrthographicText = function(options) {
    if (!options) {
      console.warn("randomOrthographicText:  You must pass options to recieve a text. ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        length: options,
        iso: "en"
      };
    }

    if (options.length <= 0) {
      return options.orthography;
    }

    options.orthography = options.orthography || options.text || "";
    options.seperator = options.seperator || " ";

    options.orthography = options.orthography + (options.orthography ? options.seperator : "") + randomUnicodeWord(options.maxWordLength || Math.random() * 10);
    // console.log("  randomOrthographicText", options);
    options.length--;
    return randomOrthographicText(options);
  };


  var randomMorphologicalText = function(options) {
    if (!options) {
      console.warn("randomOrthographicText:  You must pass options to recieve a text from ");
      return "";
    }

    if (typeof options === "number") {
      options = {
        length: options,
        iso: "en"
      };
    }

    if (options.length <= 0) {
      return options.orthography;
    }

    options.orthography = options.orthography || options.text || "";
    options.seperator = options.seperator || "-";

    options.orthography = options.orthography + (options.orthography ? options.seperator : "") + randomUnicodeWord(options.maxWordLength || Math.random() * 10);
    // console.log("  randomOrthographicText", options);
    options.length--;
    return randomMorphologicalText(options);
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
    var iso;

    if (!options) {
      iso = "en";
      options = {
        iso: iso
      };
    } else if (typeof options === "string") {
      iso = options;
      options = {
        iso: iso
      };
    } else if (options.iso) {
      iso = options.iso;
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
    // console.log("  setLanguage", options);
    return options;
  };

  exports.textGenerator = randomOrthographicText;
  exports.randomOrthographicText = randomOrthographicText;
  exports.randomMorphologicalText = randomMorphologicalText;

  exports.randomUnicodeWord = randomUnicodeWord;
})(typeof exports === 'undefined' ? this : exports);
