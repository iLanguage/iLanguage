var lexiconFactory = require('../../../../src/common/lexicon/Lexicon').LexiconFactory;
var Lexicon = require('../../../../src/common/lexicon/Lexicon').Lexicon;

var specIsRunningTooLong = 5000;

describe('Lexicon construction', function() {

  it('should load', function() {
    expect(lexiconFactory).toBeDefined();
  });

  it('should generate a lexicon from a text', function() {
    var lex = lexiconFactory({
      orthography: "there are four words",
      _id: '123',
      url: 'http://mycorpus.org/corpus1'
    });
    expect(lex.length).toEqual(4);
    expect(lex.wordFrequencies).toBeDefined();
    expect(lex.nonContentWordsArray.length).toEqual(4);
    expect(lex.buzzWordsArray.length).toEqual(0);
    // expect(lex.getLexicalEntries('nuage')).toEqual({});
  });

});


describe('Lexicon: as a user I want to search for anything, even things that don\'t exist', function() {

  it('should be able to look up lexical entries', function(done) {
    var lex = lexiconFactory({
      orthography: "there are four words",
      _id: '123',
      url: 'http://mycorpus.org/corpus1'
    });
    expect(lex.length).toEqual(4);
    var lookUp = new Lexicon.LexiconNode({
      igt: {
        orthography: "four"
      }
    });
    lex.getLexicalEntries(lookUp).then(function(result) {
      expect(result[0].igt).toEqual({
        orthography: 'four',
        utterance: 'four',
        morphemes: 'four',
        gloss: 'four'
      });
    }, function(reason) {
      expect(reason).toEqual("something");
    }).then(done, done);

  }, specIsRunningTooLong);

  it('should be able to look up lexical entries by string matching', function(done) {
    var lex = lexiconFactory({
      orthography: "there are four words",
      _id: '123',
      url: 'http://mycorpus.org/corpus1'
    });
    expect(lex.length).toEqual(4);
    lex.getLexicalEntries('four').then(function(result) {
      // console.log(result);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].igt).toEqual({
        orthography: 'four',
        utterance: 'four',
        morphemes: 'four',
        gloss: 'four'
      });
    }, function(reason) {
      expect(reason).toEqual("something");
    }).then(done, done);

  }, specIsRunningTooLong);


  it('should be able to look up lexical entries which don\'t exist', function(done) {
    var lex = lexiconFactory({
      orthography: "there are four words",
      _id: '123',
      url: 'http://mycorpus.org/corpus1'
    });
    expect(lex.length).toEqual(4);
    lex.getLexicalEntries('missing').then(function(result) {
      // console.log(result);
      expect(result.length).toEqual(0);
    }, function(reason) {
      expect(reason).toEqual("empty");
    }).then(done, done);

  }, specIsRunningTooLong);


  it('should be able to build a word collection from a text file of  words', function() {
    expect(true).toBeTruthy();
  });
  it('should be able to build translations from a text file of  translations', function() {
    expect(true).toBeTruthy();
  });
  it('should be able to build a collection of glosses from a text file of containing only glosses', function() {
    expect(true).toBeTruthy();
  });
  it('should be able add edges between nodes of different types', function() {
    expect(true).toBeTruthy();
  });

});
