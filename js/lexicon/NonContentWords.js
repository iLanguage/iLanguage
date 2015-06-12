(function(exports) {
  var LexemeFrequency = exports.LexemeFrequency || require('./LexemeFrequency').LexemeFrequency;
  var Tokenizer = exports.Tokenizer || require('./Tokenizer').Tokenizer;

  var defaults = {
    // From Jonathan Feinberg's cue.language, see https://github.com/jdf/cue.language/blob/master/license.txt.
    maxLength: 30,
    punctuation: /[!"'&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
    wordSeparators: /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70 ]+/g,
    english: /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/
  };

  var getUnique = function(arrayObj) {
    var u = {}, a = [];
    for (var i = 0, l = arrayObj.length; i < l; ++i) {
      if (u.hasOwnProperty(arrayObj[i])) {
        continue;
      }
      if (arrayObj[i]) {
        if (arrayObj[i].trim) {
          arrayObj[i] = arrayObj[i].trim();
        }
        a.push(arrayObj[i]);
        u[arrayObj[i]] = 1;
      }
    }
    return a;
  };

  var regExpEscape = function(s) {
    return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
    replace(/\x08/g, '\\x08');
  };

  var processNonContentMorphemes = function(userCloud) {
    var processed = false,
      stringCheck,
      commasOrSpaces = /[,\s]+/g;

    if (userCloud.prefixesArray) {
      stringCheck = userCloud.prefixesArray.toString().substring(0, 20);

      if (stringCheck.indexOf('/') === 0) {
        // user most likely provided regex of prefixes
        userCloud.prefixesArray = userCloud.prefixesArray.toString().replace('/^(', '').replace(')$/', '').split('|');
      } else if (Object.prototype.toString.call(userCloud.prefixesArray) === '[object Array]') {
        // user most likely provided an array of prefixes
      } else if ((stringCheck.indexOf(',') !== -1) || (stringCheck.indexOf(',') === -1 && stringCheck.indexOf(' ') !== -1)) {
        // user most likely provided comma-separated or space-separated list of prefixes
        userCloud.prefixesArray = userCloud.prefixesArray.split(commasOrSpaces);
      }
    } else {
      userCloud.prefixesArray = [];
    }

    if (userCloud.suffixesArray) {
      stringCheck = userCloud.suffixesArray.toString().substring(0, 20);

      if (stringCheck.indexOf('/') === 0) {
        // user most likely provided regex of prefixes
        userCloud.suffixesArray = userCloud.suffixesArray.toString().replace('/^(', '').replace(')$/', '').split('|');
      } else if (Object.prototype.toString.call(userCloud.suffixesArray) === '[object Array]') {
        // user most likely provided an array of prefixes
      } else if ((stringCheck.indexOf(',') !== -1) || (stringCheck.indexOf(',') === -1 && stringCheck.indexOf(' ') !== -1)) {
        // user most likely provided comma-separated or space-separated list of prefixes
        userCloud.suffixesArray = userCloud.suffixesArray.split(commasOrSpaces);
      }
    } else {
      userCloud.suffixesArray = [];
    }

    if (userCloud.morphemesArray) {
      stringCheck = userCloud.morphemesArray.toString().substring(0, 20);

      if (stringCheck.indexOf('/') === 0) {
        // user most likely provided regex of stop words
        userCloud.morphemesArray = userCloud.morphemesArray.toString().replace('/^(', '').replace(')$/', '').split('|');
      } else if (Object.prototype.toString.call(userCloud.morphemesArray) === '[object Array]') {
        // user most likely provided an array of stop words
      } else if ((stringCheck.indexOf(',') !== -1) || (stringCheck.indexOf(',') === -1 && stringCheck.indexOf(' ') !== -1)) {
        // user most likely provided comma-separated or space-separated list of stop words
        userCloud.morphemesArray = userCloud.morphemesArray.split(commasOrSpaces);
      }
    } else {
      userCloud.morphemesArray = [];
    }

    userCloud.morphemesArray = userCloud.morphemesArray.concat(userCloud.prefixesArray).concat(userCloud.suffixesArray);
    userCloud.morphemesArray = getUnique(userCloud.morphemesArray).sort(function(a, b) {
      return b.length - a.length;
    });
    if (userCloud.morphemesArray.length > 0) {
      // console.log(userCloud.morphemesArray);
      userCloud.morphemesRegExp = userCloud.morphemesArray.map(function(morpheme) {
        // console.log('morpheme ' + morpheme);
        if (morpheme.indexOf('-') === 0) {
          return morpheme.replace('-', '') + '$';
        }
        if (morpheme.indexOf('-') === morpheme.length - 1) {
          return '^' + morpheme.replace('-', '');
        }
      }).join('|');
      userCloud.morphemesRegExp = new RegExp('(' + userCloud.morphemesRegExp + ')');
    } else {
      userCloud.morphemesRegExp = null;
    }
    return userCloud;
  };

  var processNonContentWords = function(userCloud) {
    var processed = false,
      stringCheck,
      commasOrSpaces;

    processNonContentMorphemes(userCloud);

    if (!userCloud.userSpecifiedNonContentWords) {
      userCloud.wordFrequencies = null;
      userCloud.nonContentWordsArray = [];
      // console.log('Generating non content words array ...');
      userCloud.nonContentWordsArray = LexemeFrequency.calculateNonContentWords(userCloud).nonContentWordsArray;
    } else {
      stringCheck = userCloud.nonContentWordsArray.toString().substring(0, 20),
      commasOrSpaces = /[,\s]+/g;

      if (stringCheck.indexOf('/') === 0) {
        // user most likely provided regex of stop words
        processed = true;
        userCloud.nonContentWordsArray = userCloud.nonContentWordsArray.toString().replace('/^(', '').replace(')$/', '').split('|');
      } else if (Object.prototype.toString.call(userCloud.nonContentWordsArray) === '[object Array]') {
        // user most likely provided an array of stop words
        processed = true;
        userCloud.nonContentWordsArray = userCloud.nonContentWordsArray;
      } else if ((stringCheck.indexOf(',') !== -1) || (stringCheck.indexOf(',') === -1 && stringCheck.indexOf(' ') !== -1)) {
        // user most likely provided comma-separated or space-separated list of stop words
        processed = true;
        userCloud.nonContentWordsArray = userCloud.nonContentWordsArray.split(commasOrSpaces);
      } else if (!processed) {
        // user did not provide a parsable regex, throw error
        throw 'Invalid RegExp ' + userCloud.nonContentWordsArray;
      }
    }

    if (userCloud.nonContentWordsArray.length > 0) {
      userCloud.nonContentWordsRegExp = new RegExp('^(' + userCloud.nonContentWordsArray.join('|') + ')$');
    } else {
      userCloud.nonContentWordsRegExp = null;
    }

    if (userCloud.userRemovedWordsForAllDocumentsArray && userCloud.userRemovedWordsForAllDocumentsArray.length > 0) {
      userCloud.userRemovedWordsForAllDocumentsRegExp = new RegExp('^(' + userCloud.userRemovedWordsForAllDocumentsArray.join('|') + ')$');
      // console.log('userRemovedWordsForAllDocumentsRegExp ' + userCloud.userRemovedWordsForAllDocumentsRegExp);
    } else {
      userCloud.userRemovedWordsForAllDocumentsRegExp = null;
    }

    if (userCloud.userRemovedWordsForThisDocumentArray && userCloud.userRemovedWordsForThisDocumentArray.length > 0) {
      userCloud.userRemovedWordsForThisDocumentRegExp = new RegExp('^(' + userCloud.userRemovedWordsForThisDocumentArray.join('|') + ')$');
      // console.log('userRemovedWordsForThisDocumentRegExp ' + userCloud.userRemovedWordsForThisDocumentRegExp);
    } else {
      userCloud.userRemovedWordsForThisDocumentRegExp = null;
    }
    return userCloud;
  };

  var filterText = function(userCloud) {
    if (!userCloud.nonContentWordsRegExp) {
      processNonContentWords(userCloud);
    }
    if (!userCloud.nonContentWordsRegExp || !userCloud.nonContentWordsRegExp.test) {
      // console.log('Cannot produce filtered text.');
      return;
    }
    // console.log('nonContentWordsRegExp', userCloud.nonContentWordsRegExp);
    var filteredText = Tokenizer.tokenizeInput(userCloud).orthographicWords.map(function(word) {
      if (userCloud.nonContentWordsRegExp.test(word)) {
        return '';
      } else {
        if (userCloud.userRemovedWordsForThisDocumentRegExp && userCloud.userRemovedWordsForThisDocumentRegExp.test(word)) {
          return '';
        }
        if (userCloud.userRemovedWordsForAllDocumentsRegExp && userCloud.userRemovedWordsForAllDocumentsRegExp.test(word)) {
          return '';
        }
        if (userCloud.morphemesRegExp) {
          word = word.replace(userCloud.morphemesRegExp, '');
        }
        return word;
      }
    });
    userCloud.filteredText = filteredText.join(' ');
    return userCloud;
  };

  exports.NonContentWords = {
    processNonContentWords: processNonContentWords,
    defaults: defaults,
    LexemeFrequency: LexemeFrequency,
    filterText: filterText
  };

})(typeof exports === 'undefined' ? this : exports);
