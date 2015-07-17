(function(exports) {
  var randomASCIIString = function(length) {
    return Math.random(1400).toString(36).substring(length);
  };

  var randomUnicodeWord = function(currentUnicodeText, length) {
    orthographicTextGenerator.unicodeStartChar = orthographicTextGenerator.unicodeStartChar || 0x1D00;
    orthographicTextGenerator.unicodeRange = orthographicTextGenerator.unicodeRange || 0x1D7F - 0x1D00;

    if (arguments.length < 2) {
      length = currentUnicodeText;
      currentUnicodeText = "";
    }
    if (length <= 0) {
      return currentUnicodeText
    }

    currentUnicodeText = currentUnicodeText + String.fromCharCode(orthographicTextGenerator.unicodeStartChar + Math.random() * (orthographicTextGenerator.unicodeRange));
    length--;
    return randomUnicodeWord(currentUnicodeText, length);
  };

  var orthographicTextGenerator = function(currentText, howManyMore, iso, seperator) {
    if (arguments.length < 2) {
      howManyMore = currentText;
      currentText = "";
    }
    if (howManyMore <= 0) {
      return currentText;
    }

    seperator = seperator || " ";

    currentText = currentText + (currentText ? seperator : "") + randomUnicodeWord(Math.random() * 10);
    howManyMore--;
    return orthographicTextGenerator(currentText, howManyMore);
  };

  var morphologicalTextGenerator = function(currentText, howManyMore, iso, seperator) {
    if (arguments.length < 2) {
      howManyMore = currentText;
      currentText = "";
    }
    if (howManyMore <= 0) {
      return currentText;
    }

    seperator = seperator || "-";

    currentText = currentText + (currentText ? seperator : "") + randomUnicodeWord(Math.random() * 10);
    howManyMore--;
    return morphologicalTextGenerator(currentText, howManyMore);
  };

  orthographicTextGenerator.setLanguage = function(iso) {
    if (iso === "ipa") {
      orthographicTextGenerator.unicodeStartChar = 0x1D00;
      orthographicTextGenerator.unicodeRange = 0x1D7F - 0x1D00;
    } else if (iso === "ja") {
      orthographicTextGenerator.unicodeStartChar = 0x3040;
      orthographicTextGenerator.unicodeRange = 0x30FF - 0x3040;
    } else if (iso === "ka") {
      orthographicTextGenerator.unicodeStartChar = 0x10A0;
      orthographicTextGenerator.unicodeRange = 0x10FF - 0x10A0;
    }

  };

  exports.textGenerator = orthographicTextGenerator;
  exports.orthographicTextGenerator = orthographicTextGenerator;

  exports.randomUnicodeWord = randomUnicodeWord;
})(typeof exports === 'undefined' ? this : exports);
