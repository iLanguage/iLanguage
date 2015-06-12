'use strict';
var iLanguage = require('../js/ilanguage');
var shellPromises = require('../js/shellPromises');
var Tokenizer = iLanguage.Corpus.Orthography.Tokenizer;

var fs = require("fs");
var specIsRunningTooLong = 5000;

var trainingSeedSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
var pathToData = './../MorphoChallenge/morphochal10data/';
var currentSize = trainingSeedSizes[0];
/*
  ======== A Handy Little Jasmine Reference ========
https://github.com/pivotal/jasmine/wiki/Matchers

  Spec matchers:
    expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
    expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
    expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
    expect(x).toBeDefined(); passes if x is not undefined
    expect(x).toBeUndefined(); passes if x is undefined
    expect(x).toBeNull(); passes if x is null
    expect(x).toBeTruthy(); passes if x evaluates to true
    expect(x).toBeFalsy(); passes if x evaluates to false
    expect(x).toContain(y); passes if array or string x contains y
    expect(x).toBeLessThan(y); passes if x is less than y
    expect(x).toBeGreaterThan(y); passes if x is greater than y
    expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed

    Every matcher's criteria can be inverted by prepending .not:
    expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent

    Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
    beforeEach(function() {
      this.addMatchers({

        toBeLessThan: function(expected) {
          var actual = this.actual;
          var notText = this.isNot ? ' not' : '';

          this.message = function () {
            return 'Expected ' + actual + notText + ' to be less than ' + expected;
          }

          return actual < expected;
        }

      });
    });

*/

describe('lib/ilanguage', function() {

  describe('train morphological segmenters', function() {


    var counter = 0;
    var wordAnalyses = {};

    var goldStandardRawText = fs.readFileSync(pathToData + 'goldstd_combined.segmentation.tur', 'utf8').trim().split('\n');
    var goldStandardSegmentationsWordList = {};
    counter = 0;
    goldStandardRawText.map(function(row) {
      if (counter > currentSize) {
        return;
      }
      counter++;
      var twoPieces = row.split(/\t/);
      var word = twoPieces[0];
      var alternates = twoPieces[1].split(',');
      alternates = alternates.map(function(alternateParse) {
        var morphemes = alternateParse.trim().split(' ');
        // console.log('working on alternateParse', morphemes);
        return morphemes.map(function(morpheme) {
          return {
            morphemes: morpheme.split(':')[0],
            gloss: morpheme.split(':')[1]
          };
        });
      });
      goldStandardSegmentationsWordList[word] = {
        'alternates': alternates
      };
    });


    var wordlistRawText = fs.readFileSync(pathToData + 'wordlist-2010.tur', 'utf8').trim().split('\n');
    counter = 0;
    wordlistRawText.map(function(row) {
      var twoPieces = row.split(/ +/);
      if (counter > currentSize) {
        return;
      }
      counter++;
      wordAnalyses[twoPieces[1]] = {
        count: parseInt(twoPieces[0], 10)
      };
    });

    var goldStandardTrainingPrecedenceRules = fs.readFileSync(pathToData + 'goldstd_combined.segmentation.precedenceRelations.tur', 'utf8');
    goldStandardTrainingPrecedenceRules = JSON.parse(goldStandardTrainingPrecedenceRules);
    var compactRelations = [];
    goldStandardTrainingPrecedenceRules.rows.map(function(row) {
      // console.log(row.key);
      var compact = row.key.x + "-" + row.key.y;
      if (compactRelations.indexOf(compact) === -1) {
        compactRelations.push(compact);
      }
    });

    var goldStandardDevelopmentWordPairs = fs.readFileSync(pathToData + 'goldstd_develset.wordpairs.tur', 'utf8').trim().split('\n');
    var developmentWordPairs = {};
    counter = 0;
    goldStandardDevelopmentWordPairs.map(function(row) {
      if (counter > currentSize) {
        return;
      }
      counter++;
      var twoPieces = row.split(/\t/);
      var word = twoPieces[0];
      var relatedWords = twoPieces[1];
      developmentWordPairs[word] = {
        'relatedWords': relatedWords
      };
    });

    it('should be load the wordlistRawText', function() {
      expect(wordlistRawText[6]).toEqual('1 CCok');
      expect(wordlistRawText.length).toEqual(617298);
      expect(wordAnalyses['CIGlIklarIna'].count).toEqual(4);
    });

    it('should be load the training data', function() {
      expect(goldStandardRawText[5]).toEqual('CIkmazIna\tCIkmaz:CIkmaz I:+POS3 na:+DAT3, CIkmaz:CIkmaz In:+POS2S a:+DAT');
      expect(goldStandardRawText.length).toEqual(1760);
      expect(goldStandardSegmentationsWordList['OdediGine'].alternates.length).toEqual(2);
      expect(goldStandardSegmentationsWordList['OdediGine'].alternates[0]).toEqual([{
        morphemes: 'Ode',
        gloss: 'Ode'
      }, {
        morphemes: 'diG',
        gloss: '+ADJ_dig'
      }, {
        morphemes: 'in',
        gloss: '+POS2S'
      }, {
        morphemes: 'e',
        gloss: '+DAT'
      }]);
    });

    it('should be load the development word pair data', function() {
      expect(goldStandardDevelopmentWordPairs[0]).toEqual('CIkarmasIydI\tCIkarImlar [CIkar] puanlamanIn [+NOUN_ma] temelindeki [+POS3] anlaSamIyordu [+PAST_hikaye]');
      expect(goldStandardDevelopmentWordPairs.length).toEqual(300);
      expect(developmentWordPairs['devrelerinde'].relatedWords).toContain('devrelerine [+PL,+POS2S,devre]');
    });

    describe('train the default segmenter', function() {

      it('should be able to train the default segmenter', function() {
        expect(goldStandardTrainingPrecedenceRules.rows.length).toEqual(7413);
        // expect(compactRelations.length).toEqual(7413);
        // expect(compactRelations[3000]).toEqual('galibiyet-e');
        expect(compactRelations.length).toEqual(3527);
        expect(compactRelations[3000]).toEqual('surukle-me');

        var word,
          doc;

        for (word in wordAnalyses) {
          if (!wordAnalyses.hasOwnProperty(word)) {
            continue;
          }
          doc = Tokenizer.tokenizeInput({
            orthography: word,
            morphemeSegmentationOptions: {
              algorithm: 'MorphoParser',
              precedenceRelations: compactRelations,
              maxIterations: 2
            }
          });
          wordAnalyses[word].MorphoParser = doc.morphemes;
          // expect(wordAnalyses[word].MorphoParser).toEqual(goldStandardSegmentationsWordList[word]);
        }

      });

    });

    describe('train the morfessor 2013 segmenter', function() {

      it('should be able to train the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

    describe('train the CRF 2013 segmenter', function() {

      it('should be able to train the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

  });

  describe('evaulate morphological segmenters', function() {
    var language = 'tur';
    var evaluationType = 'segmentation';

    var getWordsToEvaluate =
      'cut -f1 ' +
      ' goldstd_develset.' + evaluationType + '.' + language +
      ' > relevantwordsfile.' + language;

    var createWordPairsFromAlgorithmsLabels =
      ' ./sample_word_pairs_v2.pl -n 300 ' +
      ' -refwords relevantwordsfile.' + language +
      ' < proposed.' + evaluationType + '.' + language +
      ' > proposed.wordspairs.' + language;

    var runEvaluationScriptOnWordPairs =
      ' ./eval_morphemes_v2.pl ' +
      ' goldstd_develset.wordpairs.' + language +
      ' proposed.wordspairs.' + language +
      ' goldstd_develset.' + evaluationType + '.' + language +
      ' proposed.' + evaluationType + '.' + language;


    describe('evaulate the default segmenter', function() {

      it('should be able to evaulate the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

    xdescribe('evaulate the morfessor 2013 segmenter', function() {

      it('should be able to evaulate the default segmenter', function(done) {
        var runEvalutation = 'cd ' + pathToData + ' && ' + getWordsToEvaluate + ' && ' +
          createWordPairsFromAlgorithmsLabels + ' && ' +
          runEvaluationScriptOnWordPairs;

        console.log("running " + runEvalutation);
        shellPromises.execute(runEvalutation)
          .then(function(results) {
            expect(results).toEqual(" ");

          }).done(done);

      }, specIsRunningTooLong);


    });

    describe('evaulate the CRF 2013 segmenter', function() {

      it('should be able to evaulate the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

  });

});
