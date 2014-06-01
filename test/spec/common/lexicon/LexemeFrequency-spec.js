var LexemeFrequency = require('../../../../src/common/lexicon/LexemeFrequency').LexemeFrequency;

// var specIsRunningTooLong = 5000;

describe('LexemeFrequency construction', function() {

  it('should load', function() {
    expect(LexemeFrequency).toBeDefined();
  });


  it('should let the user specify words which are not representative of this document', function() {
    var doc = LexemeFrequency.calculateNonContentWords({
      orthography: 'A cloud is in the atmosphere. See also  The Cloud (disambiguation)',
      userRemovedWordsForThisDocumentArray: ['disambiguation']
    });

    expect(doc.wordFrequencies).toEqual([{
      orthography: 'cloud',
      count: 2,
      alternates: {
        cloud: 1,
        Cloud: 1
      },
      categories: ['functionalWord']
    }, {
      orthography: 'the',
      count: 2,
      alternates: {
        the: 1,
        The: 1
      },
      categories: ['functionalWord']
    }, {
      orthography: 'A',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'is',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'in',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'atmosphere',
      count: 1
    }, {
      orthography: 'See',
      count: 1
    }, {
      orthography: 'also',
      count: 1
    }, {
      orthography: 'disambiguation',
      count: 1,
      categories: ['userRemovedWordAsUnrepresentativeOfThisDocument']
    }]);
  });

  it('should let the user specify words which are not desirable in any document', function() {
    var doc = LexemeFrequency.calculateNonContentWords({
      orthography: 'This document is about cars here is a vulgar word added in the comments about cars.',
      userRemovedWordsForAllDocumentsArray: ['vulgar']
    });

    expect(doc.wordFrequencies).toEqual([{
      orthography: 'is',
      count: 2,
      categories: ['functionalWord']
    }, {
      orthography: 'about',
      count: 2
    }, {
      orthography: 'cars',
      count: 2
    }, {
      orthography: 'This',
      count: 1
    }, {
      orthography: 'document',
      count: 1
    }, {
      orthography: 'here',
      count: 1
    }, {
      orthography: 'a',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'vulgar',
      count: 1,
      categories: ['userRemovedWordFromAllDocuments']
    }, {
      orthography: 'word',
      count: 1
    }, {
      orthography: 'added',
      count: 1
    }, {
      orthography: 'in',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'the',
      count: 1
    }, {
      orthography: 'comments',
      count: 1
    }]);
  });

  it('should let the user specify the case of words', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: ' Intense Hardworking  Easily-Found driven Helpful',
    });

    expect(doc.wordFrequencies).toEqual([{
      orthography: 'Intense',
      count: 1
    }, {
      orthography: 'Hardworking',
      count: 1
    }, {
      orthography: 'Easily-Found',
      count: 1
    }, {
      orthography: 'driven',
      count: 1
    }, {
      orthography: 'Helpful',
      count: 1
    }]);
  });

  it('should sort prefixes by length', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'undo untie under ',
      prefixesArray: ['un-', 'under-']
    });

    expect(doc.prefixesArray).toEqual(['under-', 'un-']);
    expect(doc.lexicalExperience).toEqual({
      un: ['un-der', 'un-tie'],
      der: ['un-der'],
      tie: ['un-tie']
    });
  });

  it('should process prefixes and suffixes', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'undo untie under untieing undoing undone untied unties',
      prefixesArray: ['un-', 'under-'],
      suffixesArray: ['-ing', '-ed', '-s']
    });

    expect(doc.prefixesArray).toEqual(['under-', 'un-']);
    expect(doc.lexicalExperience).toEqual({
      un: ['un-der', 'un-doing', 'un-done', 'un-tie', 'un-tied', 'un-tieing', 'un-ties'],
      der: ['un-der'],
      ing: ['undo-ing', 'untie-ing'],
      undo: ['undo-ing'],
      doing: ['un-doing'],
      done: ['un-done'],
      tie: ['un-tie'],
      ed: ['unti-ed'],
      unti: ['unti-ed'],
      tied: ['un-tied'],
      untie: ['untie-ing', 'untie-s'],
      tieing: ['un-tieing'],
      s: ['untie-s'],
      ties: ['un-ties']
    });
  });

});
