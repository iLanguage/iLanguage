var MorphemeSegmenter = require('./MorphemeSegmenter').MorphemeSegmenter;

(function(exports) {

  /* http://jrgraphix.net/research/unicode_blocks.php */
  var defaults = {
    punctuationArray: ['\u0021-\u002C', '\u002E-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E', '\u3031-\u3035', '\u309b', '\u309c', '\u30a0', '\u30fc', '\uff70', '\u2000-\u206F'],
    fineWordInternallyButNotExternallyArray: ['-', '\'', '-', '-'],
    wordDelimitersArray: [],
    // morphemesRegExp = /[はをがはのに。、「」、。・]+/g;
    japaneseWordBoundaryMorphemes: ['\u3001-\u303F', '\u3040-\u309F', '\u30A0-\u30FF']
  };
  // ^(@|https?:
  var regExpEscape = function(s) {
    return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
    replace(/\x08/g, '\\x08');
  };

  var tokenizeInput = function(doc) {
    if (!doc.orthography || !doc.orthography.length) {
      doc.orthographyArray = [];
      doc.orthographicWords = [];
      return doc;
    }
    if (doc.punctuationArray && doc.punctuationArray.length === 0) {
      doc.punctuationArray = null;
    }
    if (doc.wordDelimitersArray && doc.wordDelimitersArray.length === 0) {
      doc.wordDelimitersArray = null;
    }
    if (doc.fineWordInternallyButNotExternallyArray && doc.fineWordInternallyButNotExternallyArray.length === 0) {
      doc.fineWordInternallyButNotExternallyArray = null;
    }
    if (doc.morphemeSegmentationOptions) {
      doc = MorphemeSegmenter.runSegmenter(doc);
    }
    var orthographicTokens = [],
      orthographicWords = [],
      text = doc.orthography.trim(),
      punctuationArray = doc.punctuationArray || defaults.punctuationArray,
      wordDelimitersArray = doc.wordDelimitersArray || defaults.wordDelimitersArray,
      wordBoundaryMorphemes = doc.wordBoundaryMorphemes,
      fineWordInternallyButNotExternallyArray = doc.fineWordInternallyButNotExternallyArray || defaults.fineWordInternallyButNotExternallyArray;

    // fineWordInternallyButNotExternallyArray = fineWordInternallyButNotExternallyArray.concat(doc.punctuation); //TODO test this
    if (doc.caseSensitivity === "lower") {
      text = text.toLocaleLowerCase();
    }
    if (doc.userDefinedCleaningReWriteRules) {
      for (var rule in doc.userDefinedCleaningReWriteRules) {
        if (!doc.userDefinedCleaningReWriteRules.hasOwnProperty(rule)) {
          continue;
        }
        text = text.replace(
          new RegExp(doc.userDefinedCleaningReWriteRules[rule].source, 'g'),
          doc.userDefinedCleaningReWriteRules[rule].target);
      }
    }

    doc.tokenizeOnTheseArray = punctuationArray.concat(wordDelimitersArray);
    doc.tokenizeOnTheseRegExp = new RegExp('([' + doc.tokenizeOnTheseArray.join('') + '])', 'g');

    if (wordBoundaryMorphemes && wordBoundaryMorphemes.length > 0) {
      doc.wordBoundaryMorphemesRegExp = new RegExp('([' + wordBoundaryMorphemes.join() + '])', 'g');
      text = text.replace(doc.wordBoundaryMorphemesRegExp, ' $1 ');
    }
    text = text.replace(doc.tokenizeOnTheseRegExp, ' $1 ');

    doc.wordExternalPunctuationRegExp = new RegExp('(' + '^[' + fineWordInternallyButNotExternallyArray.join('') + ']' + '|' + '[' + fineWordInternallyButNotExternallyArray.join('') + ']$' + ')', 'g');
    // console.log("Regexp " + doc.tokenizeOnTheseRegExp);
    text.split(/\s/).map(function(wordOrSymbol) {
      // console.log('wordOrSymbol ' + wordOrSymbol);
      wordOrSymbol = wordOrSymbol.replace(doc.wordExternalPunctuationRegExp, ' $1 ').trim();
      if (wordOrSymbol) {
        // console.log('wordOrSymbol ' + wordOrSymbol);
        var escapedPunctuation = new RegExp('([' + regExpEscape(doc.tokenizeOnTheseArray.join('')) + '])', 'g');
        if (wordOrSymbol.length === 1) {
          orthographicTokens.push(wordOrSymbol);
          // if (!doc.tokenizeOnTheseRegExp.test(regExpEscape(wordOrSymbol)) && !doc.tokenizeOnTheseRegExp.test(wordOrSymbol) && !escapedPunctuation.test(wordOrSymbol) && !doc.wordExternalPunctuationRegExp.test(wordOrSymbol) && wordOrSymbol !== '.' && wordOrSymbol !== '‘' && wordOrSymbol !== ',' && wordOrSymbol !== '—') {
          if (!doc.tokenizeOnTheseRegExp.test(regExpEscape(wordOrSymbol)) && !doc.tokenizeOnTheseRegExp.test(wordOrSymbol) && !doc.wordExternalPunctuationRegExp.test(regExpEscape(wordOrSymbol)) && wordOrSymbol !== '-' && wordOrSymbol !== ',') {
            orthographicWords.push(wordOrSymbol);
            // console.log("This is probably a word: " + wordOrSymbol);

          } else {
            // console.log("This is probably not a word: " + wordOrSymbol);
          }

        } else {
          var extraTokens = wordOrSymbol.split(' ');
          if (extraTokens.length === 1 /* there was no word external punctuation */ ) {
            orthographicTokens.push(wordOrSymbol);
            orthographicWords.push(wordOrSymbol);
            // console.log("This is probably a real  word: " + wordOrSymbol);

          } else {
            for (var token in extraTokens) {
              if (!escapedPunctuation.test(extraTokens[token]) && !doc.wordExternalPunctuationRegExp.test(extraTokens[token]) /* this is the word */ ) {
                orthographicTokens.push(extraTokens[token]);
                // console.log("This is also probably a word: " + extraTokens[token]);
                orthographicWords.push(extraTokens[token]);
              } else {
                orthographicTokens.push(extraTokens[token]);
              }
            }
          }
        }
      }
    });

    doc.punctuationArray = punctuationArray;
    doc.orthographyArray = orthographicTokens;
    doc.orthographicWords = orthographicWords;
    return doc;

  };

  exports.Tokenizer = {
    tokenizeInput: tokenizeInput
  };

})(typeof exports === 'undefined' ? this['Tokenizer'] = {} : exports);
