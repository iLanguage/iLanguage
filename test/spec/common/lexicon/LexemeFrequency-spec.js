var LexemeFrequency = require('../../../../src/common/lexicon/LexemeFrequency').LexemeFrequency;

// var specIsRunningTooLong = 5000;

describe('LexemeFrequency construction', function() {

  it('should load', function() {
    expect(LexemeFrequency).toBeDefined();
  });

  it('should sort prefixes by length', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'undo untie under',
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
