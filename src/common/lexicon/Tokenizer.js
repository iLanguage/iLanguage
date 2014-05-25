(function(exports) {

  var punctuation = /[!"&()'*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
    wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70\u3000-\u303F\u3040-\u309F\u30A0-\u30FF]+/g,
    // suffixes = /[はをがはのに。、「」、。・]+/g;
    suffixes = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF]+/g;

  var tokenizeInput = function(text) {

    var words = [];

    text.split(wordSeparators).forEach(function(word) {
      word = word.replace(punctuation, ' ');
      word = word.replace(suffixes, ' ');
      words.push(word);
    });

    return words;

  };

  exports.Tokenizer = {
    tokenizeInput: tokenizeInput
  };

})(typeof exports === 'undefined' ? this['Tokenizer'] = {} : exports);
