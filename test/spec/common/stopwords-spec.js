'use strict';
var StopWords = require('../../../src/common/stop-words');

describe('lib/stopwords', function() {

  it('should load', function() {
    expect(StopWords).toBeDefined();
  });

  it('should accept a space seperated list', function() {
    var spaceSeparatedList = 'a an the he she    it  we go    be';
    var result = StopWords.processStopWords({
      stopWords: spaceSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should accept a comma seperated list', function() {
    var commaSeparatedList = 'a, an, the, he, she,    it,  we, go,    be';
    var result = StopWords.processStopWords({
      stopWords: commaSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should accept a regular expression', function() {
    var regexpSeparatedList = /^(a|an|the|he|she|it|we|go|be)$/;
    var result = StopWords.processStopWords({
      stopWords: regexpSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should throw an error if an invalid regex is provided', function() {
    var regexpSeparatedList = 'a|an|the|he|she|it|we|go|be';
    var e = 'Invalid RegExp a|an|the|he|she|it|we|go|be';

    expect(function() {
      StopWords.processStopWords({
        stopWords: regexpSeparatedList
      });
    }).toThrow(e);

  });

  it('should accept a text', function() {
    expect(true).toBeTruthy();
  });

  it('should accept a text and a weight', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a list of stopwords', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a filtered text', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a weighted list of words (rather than 0/1 stop vs content)', function() {
    expect(true).toBeTruthy();
  });

});
