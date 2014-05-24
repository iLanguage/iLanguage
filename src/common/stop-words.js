(function(exports) {
  var StopWordsGenerator = require('./stop-words-generator').StopWordsGenerator;

  var defaults = {
    // From Jonathan Feinberg's cue.language, see https://github.com/jdf/cue.language/blob/master/license.txt.
    maxLength: 30,
    punctuation: /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
    wordSeparators: /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
    english: /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/
  };

  var processStopWords = function(userCloud) {

    // console.log("userCloud.stopWords", userCloud.stopWords);
    var processed = false;

    if (!userCloud.stopWords) {
      userCloud.inputText = userCloud.text;
      var autoCalculatedStopWords = StopWordsGenerator.calculateStopWords(userCloud);
      console.log("autoCalculatedStopWords", autoCalculatedStopWords);
      processed = true;
      userCloud.stopWords = new RegExp('^(' + autoCalculatedStopWords.join('|') + ')$');
      return userCloud;
    }
    // console.log("not autogen userCloud.stopWords ", userCloud.stopWords);

    var stringCheck = userCloud.stopWords.toString().substring(0, 20),
      commasOrSpaces = /[,\s]+/g;

    if (stringCheck.indexOf('/') === 0) {
      // user most likely provided regex of stop words
      processed = true;
      userCloud.stopWords = new RegExp(userCloud.stopWords);
      return userCloud;
    }

    if ((stringCheck.indexOf(',') !== -1) || (stringCheck.indexOf(',') === -1 && stringCheck.indexOf(' ') !== -1)) {
      // user most likely provided comma-separated or space-separated list of stop words
      processed = true;
      userCloud.stopWords = new RegExp('^(' + userCloud.stopWords.replace(commasOrSpaces, '|') + ')$');
      return userCloud;
    }

    if (!processed) {
      // user did not provide a parsable regex, throw error
      throw 'Invalid RegExp ' + userCloud.stopWords;
    }

  };

  var filterText = function(userCloud) {
    var text = userCloud.inputText.replace(defaults.punctuation, ' ');

    if (userCloud.caseInsensitive) {
      text = text.toLocaleLowerCase();
    }
    var filteredText = text.split(defaults.wordSeparators).map(function(word) {
      if (!userCloud.stopWords.test(word)) {
        if (userCloud.morphemes) {
          word = word.replace(userCloud.morphemes, "");
        }
        return word;
      } else {
        return "";
      }
    });
    userCloud.filteredText = filteredText.join(" ");
    return userCloud;
  };

  exports.StopWords = {
    processStopWords: processStopWords,
    defaults: defaults,
    StopWordsGenerator: StopWordsGenerator,
    filterText: filterText
  };

})(typeof exports === 'undefined' ? this['StopWords'] = {} : exports);
