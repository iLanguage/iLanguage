'use strict';
var iLanguage = require('../../../src/common/ilanguage').iLanguage;

var Q = require("q");
var fs = require("fs");

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

  describe('It has useful content for infoviz', function() {

    it('should automatically clean the text to create informative wordclouds', function() {
      expect(iLanguage.Corpus).toBeDefined();
      expect(iLanguage.Lexicon).toBeDefined();
      expect(true).toBeTruthy();
    });

    it('should guess negative words for this text', function() {
      expect(true).toBeTruthy();
    });

    it('should guess buzz words for this text', function() {
      expect(true).toBeTruthy();
    });

  });

  describe('It is not English oriented', function() {

    it('should adapt to any language typology', function() {
      expect(true).toBeTruthy();
    });

  });

  describe('train morphological segmenters', function() {

    var trainingSeedSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    var pathToData = './../MorphoChallenge/morphochal10data/';
    var currentSize = trainingSeedSizes[0];
    var counter = 0;
    var wordhash = {};

    var wordlist = fs.readFileSync(pathToData + 'wordlist.tur', 'utf8').trim().split('\n');
    wordlist.map(function(row) {
      if (counter > currentSize) {
        return;
      }
      counter++;
      var twoPieces = row.split(/ +/);
      wordhash[twoPieces[1]] = parseInt(twoPieces[0], 10);
    });

    var goldStandardTrainingWordList = fs.readFileSync(pathToData + 'goldstd_trainset.segmentation.tur', 'utf8').trim().split('\n');
    var trainingWords = {};
    counter = 0;
    goldStandardTrainingWordList.map(function(row) {
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
          }
        });
      });
      trainingWords[word] = {
        'alternates': alternates
      };
    });


    // var goldStandardDevelopmentWordPairs = fs.readFileSync(pathToData + 'goldstd_develset.wordpairs.tur', 'utf8').trim().split('\n');
    // var developmentWordPairs = {};
    // counter = 0;
    // goldStandardDevelopmentWordPairs.map(function(row) {
    //   if (counter > currentSize) {
    //     return;
    //   }
    //   counter++;
    //   var twoPieces = row.split(/\t/);
    //   var word = twoPieces[0];
    //   var relatedWords = twoPieces[1];
    //   developmentWordPairs[word] = {
    //     'relatedWords': relatedWords
    //   };
    // });

    it('should be load the wordlist', function() {
      expect(wordlist[6]).toEqual('1 CCok');
      expect(wordlist.length).toEqual(617298);
      expect(wordhash['CIGlIklarIna']).toEqual(4);
    });

    it('should be load the training data', function() {
      expect(goldStandardTrainingWordList[0]).toEqual('CIkarsanIz\tCIk:CIk ar:+TNS_ar sa:+if_SUF nIz:+PER2P_niz, CIkar:CIkar sa:+TNS_sa nIz:+PER2P_niz, CIkar:CIkar sa:+if_SUF nIz:+PER2P_niz, CIk:CIk ar:+TNS_ar sa:+TNS_sa nIz:+PER2P_niz');
      expect(goldStandardTrainingWordList.length).toEqual(1000);
      expect(trainingWords['OdediGine'].alternates.length).toEqual(2);
      expect(trainingWords['OdediGine'].alternates[0]).toEqual([{
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

    xit('should be load the development data', function() {
      expect(goldStandardDevelopmentWordPairs[0]).toEqual('CIkarmasIydI\tCIkarImlar [CIkar] puanlamanIn [+NOUN_ma] temelindeki [+POS3] anlaSamIyordu [+PAST_hikaye]');
      expect(goldStandardDevelopmentWordPairs.length).toEqual(300);
      expect(developmentWordPairs['devrelerinde']).toEqual(9);

    });

    describe('train the default segmenter', function() {

      it('should be able to train the default segmenter', function() {
        expect(true).toBeTruthy();
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

    describe('evaulate the default segmenter', function() {

      it('should be able to evaulate the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

    describe('evaulate the morfessor 2013 segmenter', function() {

      it('should be able to evaulate the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

    describe('evaulate the CRF 2013 segmenter', function() {

      it('should be able to evaulate the default segmenter', function() {
        expect(true).toBeTruthy();
      });

    });

  });

});
