(function(exports) {
  var Tokenizer = require('./Tokenizer').Tokenizer;

  var getUnique = function(arrayObj) {
    var u = {}, a = [];
    for (var i = 0, l = arrayObj.length; i < l; ++i) {
      if (u.hasOwnProperty(arrayObj[i])) {
        continue;
      }
      if (arrayObj[i]) {
        a.push(arrayObj[i]);
        u[arrayObj[i]] = 1;
      }
    }
    return a;
  };

  var calculateWordFrequencies = function(obj) {
    var nonContentWords = obj.nonContentWordsArray || [];
    obj.vocabSize = 0;
    obj.textSize = 0;

    var tokensAsArray = obj.orthography;
    if (Object.prototype.toString.call(tokensAsArray) !== '[object Array]') {
      tokensAsArray = Tokenizer.tokenizeInput(obj.orthography);
    }

    var frequencyMap = {};
    for (var word = 0; word < tokensAsArray.length; word++) {
      var currentWord = tokensAsArray[word].toLowerCase().replace(/^\s+|\s+$/g, '');

      for (var functionToRun in obj.functionsPerWord) {
        if (!obj.functionsPerWord.hasOwnProperty(functionToRun)) {
          continue;
        }
        obj.functionsPerWord[functionToRun](currentWord); /* TODO dont loose caller's context */
      }

      if (frequencyMap[currentWord]) {
        frequencyMap[currentWord] += 1;
      } else {
        frequencyMap[currentWord] = 1;
        obj.vocabSize += 1;
      }
      obj.textSize += 1;

    }

    obj.wordFrequencies = frequencyMap;

    return obj;
  };

  var calculateNonContentWords = function(obj) {
    obj.nonContentWordsArray = obj.nonContentWordsArray || [];
    obj.buzzWordsArray = obj.buzzWordsArray || [];

    if (!obj.orthography) {
      return;
    }
    var nonContentWords = [];

    var wordFrequencies = obj.wordFrequencies || calculateWordFrequencies(obj).wordFrequencies;

    var cutoffPercent = obj.cutoff;
    if (!cutoffPercent) {
      var typology = obj.vocabSize / obj.textSize;
      /* If this language has alot of unique words, there is nothing we can do here (instead must do non content morphemes) */
      if (obj.textSize < 20) {
        cutoffPercent = 0.2;
      } else if (typology > 60) {
        cutoffPercent = 0.1;
      } else {
        cutoffPercent = 0.007;
      }
      console.log('Setting cutoffPercent automatically ' + typology);
    }

    var orderedWordFrequencies = Object.keys(wordFrequencies).sort(function(a, b) {
      return -(wordFrequencies[a] - wordFrequencies[b]);
    });

    for (var o in orderedWordFrequencies) {
      var wordRank = (wordFrequencies[orderedWordFrequencies[o]] / obj.vocabSize);
      // console.log("orderedWordFrequencies[o] " + orderedWordFrequencies[o] + ' ' + wordFrequencies[orderedWordFrequencies[o]] + ' ' + wordRank);
      if (wordRank > cutoffPercent) {
        nonContentWords.push(orderedWordFrequencies[o]);
      }
      /* If the word is too short, automatically consider it a stop word */
      if (orderedWordFrequencies[o].length < 3) {
        nonContentWords.push(orderedWordFrequencies[o]);
      }
    }
    /* don't push in long words, they are probably core to the text */
    var probablyNotBuzzWords = [];
    nonContentWords.map(function(word) {
      if (word.length <= 5) {
        probablyNotBuzzWords.push(word);
      } else {
        obj.buzzWordsArray.push(word);
      }
    });

    obj.nonContentWordsArray = obj.nonContentWordsArray.concat(probablyNotBuzzWords);
    obj.nonContentWordsArray = getUnique(obj.nonContentWordsArray);
    obj.nonContentWordsArray.sort(function(a, b) {
      return a.localeCompare(b);
    });

    obj.buzzWordsArray = getUnique(obj.buzzWordsArray);
    obj.buzzWordsArray.sort(function(a, b) {
      return a.localeCompare(b);
    });

    return obj;

  };


  exports.LexemeFrequency = {
    calculateWordFrequencies: calculateWordFrequencies,
    calculateNonContentWords: calculateNonContentWords,
    getUnique: getUnique
  };

})(typeof exports === 'undefined' ? this['LexemeFrequency'] = {} : exports);
