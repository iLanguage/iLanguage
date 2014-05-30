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
    obj.prefixesArray = obj.prefixesArray || [];
    obj.suffixesArray = obj.suffixesArray || [];

    var wordsArrayForMorphemeCalculation = [];
    var currentWord,
      currentMorpheme,
      stem;
    var tokensAsArray = obj.orthography;
    if (Object.prototype.toString.call(tokensAsArray) !== '[object Array]') {
      tokensAsArray = Tokenizer.tokenizeInput(obj).orthographicWords;
    }

    var frequencyMap = {};
    for (var word = 0; word < tokensAsArray.length; word++) {
      currentWord = tokensAsArray[word];

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
        wordsArrayForMorphemeCalculation.push(currentWord);
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
    /* sort the morphems by length */
    obj.prefixesArray.sort(function(a, b) {
      return b.length - a.length;
    });
    obj.suffixesArray.sort(function(a, b) {
      return b.length - a.length;
    });

    if ((obj.prefixesArray && obj.prefixesArray.length > 0) || (obj.suffixesArray && obj.suffixesArray > 0)) {
      obj.lexicalExperience = {};
      var wordsOrderedByPrefix = wordsArrayForMorphemeCalculation.sort(function(a, b) {
        return a.localeCompare(b);
      });
      for (var wordIndex = 0; wordIndex < wordsArrayForMorphemeCalculation.length; wordIndex++) {
        currentWord = wordsArrayForMorphemeCalculation[wordIndex];
        // if (obj.lexicalExperience[currentWord] /* lexical blocking, dont decompose words which are whole */ ) {
        //   console.log('  Not decomposing known word: ' + currentWord);
        //   continue;
        // }
        /* see if any suffixes apply to this word */
        for (var suffixIndex = 0; suffixIndex < obj.suffixesArray.length; suffixIndex++) {
          currentMorpheme = obj.suffixesArray[suffixIndex].replace(/-/, '');
          // stem = currentWord.replace(new RegExp(currentMorpheme + '$', i), '');
          stem = currentWord.replace(currentMorpheme, '');
          if (currentWord.indexOf(currentMorpheme) === currentWord.length - currentMorpheme.length && stem.length > 2 /* only consider roots longer than 2 characterse */ ) {
            obj.lexicalExperience[currentMorpheme] = obj.lexicalExperience[currentMorpheme] || [];
            obj.lexicalExperience[currentMorpheme].push(stem + '-' + currentMorpheme);

            obj.lexicalExperience[stem] = obj.lexicalExperience[stem] || [];
            obj.lexicalExperience[stem].push(stem + '-' + currentMorpheme);

            // console.log('  Found a suffix ' + currentMorpheme);
            // console.log('  Found a stem ' + stem);
          }
        }

        /* see if any prefixes apply to this word */
        for (var prefixIndex = 0; prefixIndex < obj.prefixesArray.length; prefixIndex++) {
          currentMorpheme = obj.prefixesArray[prefixIndex].replace(/-/, '');
          stem = currentWord.replace(currentMorpheme, '');
          if (currentWord.indexOf(currentMorpheme) === 0 && stem.length > 2 /* only consider roots longer than 2 characterse */ ) {
            obj.lexicalExperience[currentMorpheme] = obj.lexicalExperience[currentMorpheme] || [];
            obj.lexicalExperience[currentMorpheme].push(currentMorpheme + '-' + stem);

            obj.lexicalExperience[stem] = obj.lexicalExperience[stem] || [];
            obj.lexicalExperience[stem].push(currentMorpheme + '-' + stem);

            // console.log('  Found a prefix ' + currentMorpheme);
            // console.log('  Found a stem ' + stem);
          }
        }

      }
    }
    console.log(obj.lexicalExperience);

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
      // console.log('wordFrequencies[oIndex] ' + wordFrequencies[oIndex] + ' ' + wordFrequencies[oIndex] + ' ' + wordRank);
      if (wordRank > cutoffPercent) {
        if (wordFrequencies[oIndex].orthography.length > 5) {
          buzzWords.push(wordFrequencies[oIndex].orthography);
          wordFrequencies[oIndex].categories = ['buzzWord'];
        } else {
          probablyNotBuzzWords.push(wordFrequencies[oIndex].orthography);
          wordFrequencies[oIndex].categories = ['functionalWord'];
        }
      }
      /* If the word is too short, automatically consider it a stop word */
      if (wordFrequencies[oIndex].orthography.length < 3) {
        probablyNotBuzzWords.push(wordFrequencies[oIndex].orthography);
        wordFrequencies[oIndex].categories = ['functionalWord'];
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

    console.log(obj.nonContentWordsArray);
    return obj;

  };


  exports.LexemeFrequency = {
    calculateWordFrequencies: calculateWordFrequencies,
    calculateNonContentWords: calculateNonContentWords,
    getUnique: getUnique
  };

})(typeof exports === 'undefined' ? this['LexemeFrequency'] = {} : exports);
