(function(exports) {

  var punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
    wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g;

  var tokenizeInput = function(text) {

    var words = [];

    text.split(wordSeparators).forEach(function(word) {
      word = word.replace(punctuation, '');
      words.push(word);
    });

    return words;

  };

  exports.tokenizeInput = tokenizeInput;

})(typeof exports === 'undefined' ? this['Tokenizer'] = {} : exports);
