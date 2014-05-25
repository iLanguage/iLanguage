(function(exports) {
  var Tokenizer = require('./tokenizer').Tokenizer;

  Array.prototype.getUnique = function() {
    var u = {}, a = [];
    for (var i = 0, l = this.length; i < l; ++i) {
      if (u.hasOwnProperty(this[i])) {
        continue;
      }
      if (this[i]) {
        a.push(this[i]);
        u[this[i]] = 1;
      }
    }
    return a;
  };

  var calculateStopWords = function(obj) {
    var stopWords = obj.stopWordsArray || [];

    if (!obj.inputText) {
      return;
    }

    var cutoffPercent = obj.cutoff || 0.015,
      parsedText = Tokenizer.tokenizeInput(obj.inputText); //create array of words only

    var wordCounts = function(wordarray) {
      var history = {};
      for (var word = 0; word < wordarray.length; word++) {
        var currentWord = wordarray[word].toLowerCase().replace(/^\s+|\s+$/g, '');
        /* If the word is too short, automatically consider it a stop word */
        if (currentWord.length < 3) {
          stopWords.push(currentWord);
        }
        history[currentWord] ? // check if word already exists in history
        history[currentWord] += 1 : // if so, increase its count by one
        history[currentWord] = 1; // otherwise mark as first occurrence
      }
      return history;
    };

    var results = wordCounts(parsedText);
    var orderedResults = Object.keys(results).sort(function(a, b) {
      return -(results[a] - results[b]);
    });

    for (var o in orderedResults) {
      if ((results[orderedResults[o]] / parsedText.length) >= cutoffPercent) {
        stopWords.push(orderedResults[o]);
      }
    }

    return stopWords.getUnique().sort(function(a, b) {
      return a.localeCompare(b);
    });

  };

  exports.StopWordsGenerator = {
    calculateStopWords: calculateStopWords
  };

})(typeof exports === 'undefined' ? this['StopWordsGenerator'] = {} : exports);
