(function(exports) {

  var calculateStopWords = function(inputText, cutoffPercent) {

    if (!inputText) {
      return;
    }

    cutoffPercent = cutoffPercent || 0.015;
    var parsedText = inputText.match(/[a-zA-Z]+/g); //create array of words only

    var wordCounts = function(wordarray) {
      var history = {};
      for (var word = 0; word < wordarray.length; word++) {
        var currentRecord = wordarray[word].toLowerCase();
        history[currentRecord] ? // check if word already exists in history
        history[currentRecord] += 1 : // if so, increase its count by one
        history[currentRecord] = 1; // otherwise mark as first occurrence
      }
      return history;
    };

    var results = wordCounts(parsedText);
    var orderedResults = Object.keys(results).sort(function(a, b) {return -(results[a] - results[b]);});
    var outputStops = [];

    for (var o in orderedResults) {
      if ((results[orderedResults[o]] / parsedText.length) >= cutoffPercent) {
        outputStops.push(orderedResults[o]);
      }
    }

    return outputStops;

  };

  exports.calculateStopWords = calculateStopWords;

})(typeof exports === 'undefined' ? this['calculateStopWords'] = {} : exports);
