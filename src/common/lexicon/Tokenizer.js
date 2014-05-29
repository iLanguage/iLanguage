(function(exports) {

  /* http://jrgraphix.net/research/unicode_blocks.php */
  var defaults = {
    punctuationArray: ['\u0021-\u002C', '\u002E-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E', '\u3031-\u3035', '\u309b', '\u309c', '\u30a0', '\u30fc', '\uff70', '\u2000-\u206F'],
    fineWordInternallyButNotExternallyArray: ['-', '\'', '-'],
    wordDelimitersArray: [],
    // morphemesRegExp = /[はをがはのに。、「」、。・]+/g;
    japaneseWordBoundaryMorphemes: ['\u3001-\u303F', '\u3040-\u309F', '\u30A0-\u30FF']
  };

  var tokenizeInput = function(doc) {
    if (!doc.orthography || !doc.orthography.length) {
      doc.orthographyArray = [];
      doc.orthographicWords = [];
      return doc;
    }
    var orthographicTokens = [],
      orthographicWords = [],
      text = doc.orthography.trim(),
      punctuationArray = doc.punctuationArray || defaults.punctuationArray,
      wordDelimitersArray = doc.wordDelimitersArray || defaults.wordDelimitersArray,
      wordBoundaryMorphemes = doc.wordBoundaryMorphemes,
      fineWordInternallyButNotExternallyArray = doc.fineWordInternallyButNotExternallyArray || defaults.fineWordInternallyButNotExternallyArray;

    if (doc.caseInsensitive) {
      text = text.toLocaleLowerCase();
    }

    doc.tokenizeOnTheseArray = punctuationArray.concat(wordDelimitersArray);
    doc.tokenizeOnTheseRegExp = new RegExp('([' + doc.tokenizeOnTheseArray.join('') + '])', 'g');

    if (wordBoundaryMorphemes && wordBoundaryMorphemes.length > 0) {
      doc.wordBoundaryMorphemesRegExp = new RegExp('([' + wordBoundaryMorphemes.join() + '])', 'g');
      text = text.replace(doc.wordBoundaryMorphemesRegExp, ' $1 ');
    }
    text = text.replace(doc.tokenizeOnTheseRegExp, ' $1 ');

    doc.wordExternalPunctuationRegExp = new RegExp('(' + '^[' + fineWordInternallyButNotExternallyArray.join('') + ']' + '|' + '[' + fineWordInternallyButNotExternallyArray.join('') + ']$' + ')', 'g');
    text.split(/\s/).map(function(wordOrSymbol) {
      wordOrSymbol = wordOrSymbol.replace(doc.wordExternalPunctuationRegExp, ' $1 ').trim();
      if (wordOrSymbol) {
        if (wordOrSymbol.length === 1) {
          orthographicTokens.push(wordOrSymbol);
        } else {
          var extraTokens = wordOrSymbol.split(' ');
          if (extraTokens.length === 1 /* there was no word external punctuation */ ) {
            orthographicTokens.push(wordOrSymbol);
            orthographicWords.push(wordOrSymbol);
          } else {
            for (var token in extraTokens) {
              if (extraTokens[token].length > 1 /* this is the word */ ) {
                orthographicTokens.push(extraTokens[token]);
                orthographicWords.push(extraTokens[token]);
              } else {
                orthographicTokens.push(extraTokens[token]);
              }
            }
          }
        }
      }
    });

    doc.orthographyArray = orthographicTokens;
    doc.orthographicWords = orthographicWords;
    return doc;

  };

  exports.Tokenizer = {
    tokenizeInput: tokenizeInput
  };

})(typeof exports === 'undefined' ? this['Tokenizer'] = {} : exports);
