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

    obj.wordFrequencies = [];

    for (var item in frequencyMap) {
      if (frequencyMap.hasOwnProperty(item)) {
        obj.wordFrequencies.push({
          orthography: item,
          count: frequencyMap[item]
        });
      }
    }
    obj.wordFrequencies = obj.wordFrequencies.sort(function(a, b) {
      return -(a.count - b.count);
    });

    return obj;
  };

  var calculateNonContentWords = function(obj) {
    obj.nonContentWordsArray = obj.nonContentWordsArray || [];
    obj.buzzWordsArray = obj.buzzWordsArray || [];

    if (!obj.orthography) {
      return;
    }
    var buzzWords = [];
    var probablyNotBuzzWords = [];

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

    for (var oIndex in wordFrequencies) {
      if (!wordFrequencies.hasOwnProperty(oIndex)) {
        continue;
      }
      var wordRank = (wordFrequencies[oIndex].count / obj.vocabSize);
      // console.log("wordFrequencies[oIndex] " + wordFrequencies[oIndex] + ' ' + wordFrequencies[oIndex] + ' ' + wordRank);
      if (wordRank > cutoffPercent) {
        if (wordFrequencies[oIndex].orthography.length > 5) {
          buzzWords.push(wordFrequencies[oIndex].orthography);
          wordFrequencies[oIndex].categories = ["buzzWord"];
        } else {
          probablyNotBuzzWords.push(wordFrequencies[oIndex].orthography);
          wordFrequencies[oIndex].categories = ["functionalWord"];
        }
      }
      /* If the word is too short, automatically consider it a stop word */
      if (wordFrequencies[oIndex].orthography.length < 3) {
        probablyNotBuzzWords.push(wordFrequencies[oIndex].orthography);
        wordFrequencies[oIndex].categories = ["functionalWord"];
      }
    }

    if (!obj.userSpecifiedNonContentWords) {
      obj.nonContentWordsArray = obj.nonContentWordsArray.concat(probablyNotBuzzWords);
      obj.nonContentWordsArray = getUnique(obj.nonContentWordsArray);
      obj.nonContentWordsArray.sort(function(a, b) {
        return a.localeCompare(b);
      });
    }
    if (!obj.userSpecifiedBuzzWords) {
      obj.buzzWordsArray = getUnique(buzzWords);
      obj.buzzWordsArray.sort(function(a, b) {
        return a.localeCompare(b);
      });
    }
    return obj;

  };


  exports.LexemeFrequency = {
    calculateWordFrequencies: calculateWordFrequencies,
    calculateNonContentWords: calculateNonContentWords,
    getUnique: getUnique
  };

})(typeof exports === 'undefined' ? this['LexemeFrequency'] = {} : exports);
