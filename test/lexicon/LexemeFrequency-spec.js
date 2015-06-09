var LexemeFrequency = LexemeFrequency || require('../../js/lexicon/LexemeFrequency').LexemeFrequency;

// var specIsRunningTooLong = 5000;

xdescribe('LexemeFrequency construction', function() {

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


  it('should let the user remove noncontent words to be included', function() {
    var doc = LexemeFrequency.calculateNonContentWords({
      orthography: ' short word word word word and some more words to make a longer text'
    });
    expect(doc.wordFrequencies).toEqual([{
      orthography: 'word',
      count: 4,
      categories: ['functionalWord']
    }, {
      orthography: 'short',
      count: 1
    }, {
      orthography: 'and',
      count: 1
    }, {
      orthography: 'some',
      count: 1
    }, {
      orthography: 'more',
      count: 1
    }, {
      orthography: 'words',
      count: 1
    }, {
      orthography: 'to',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'make',
      count: 1
    }, {
      orthography: 'a',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'longer',
      count: 1
    }, {
      orthography: 'text',
      count: 1
    }]);

    /* run again with user letting one of the previous stop word through */
    doc.nonContentWordsArray = ['a', 'is'];
    doc.userSpecifiedNonContentWords = true;
    doc.wordFrequencies = null;
    LexemeFrequency.calculateNonContentWords(doc);
    expect(doc.wordFrequencies).toEqual([{
      orthography: 'word',
      count: 4
    }, {
      orthography: 'short',
      count: 1
    }, {
      orthography: 'and',
      count: 1
    }, {
      orthography: 'some',
      count: 1
    }, {
      orthography: 'more',
      count: 1
    }, {
      orthography: 'words',
      count: 1
    }, {
      orthography: 'to',
      count: 1
    }, {
      orthography: 'make',
      count: 1
    }, {
      orthography: 'a',
      count: 1,
      categories: ['functionalWord']
    }, {
      orthography: 'longer',
      count: 1
    }, {
      orthography: 'text',
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

describe('LexemeFrequency capitalization', function() {

  it('should automatically use the most popular case if caseSensitivity is not specified', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'we has a typo that We want to see We'
    });
    doc.wordFrequencies.map(function(entry) {
      if (entry.orthography.toLocaleLowerCase() === 'we') {
        expect(entry.orthography).toEqual('We');
      }
    });
  });

  it('should automatically use the most popular(first) case if caseSensitivity is not specified', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'we has a typo that We want to see'
    });
    doc.wordFrequencies.map(function(entry) {
      if (entry.orthography.toLocaleLowerCase() === 'we') {
        expect(entry.orthography).toEqual('we');
      }
    });
  });

  it('should use lower case if caseSensitivity is specified', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'We has a typo that We want to SEE',
      caseSensitivity: 'lower'
    });
    doc.wordFrequencies.map(function(entry) {
      if (entry.orthography.toLocaleLowerCase() === 'we') {
        expect(entry.orthography).toEqual('we');
      } else if (entry.orthography.toLocaleLowerCase() === 'see') {
        expect(entry.orthography).toEqual('see');
      }
    });
  });

  it('should let the user choose to have case sensitive', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'we has a typo that We want to see',
      caseSensitivity: 'preserve'
    });
    var foundWes = [];
    doc.wordFrequencies.map(function(entry) {
      if (entry.orthography.toLocaleLowerCase() === 'we') {
        foundWes.push(entry.orthography);
      }
    });
    expect(foundWes.indexOf('we')).toBeGreaterThan(-1);
    expect(foundWes.indexOf('We')).toBeGreaterThan(-1);
  });


});

describe('LexemeFrequency robustness', function() {

  it('should process code snippits without Uncaught TypeError: number is not a function', function() {
    var doc = LexemeFrequency.calculateWordFrequencies({
      orthography: 'this hasOwnProperty is reserved'
    });
    expect(doc.wordFrequencies[1].orthography).toEqual('hasOwnProperty');
  });

});
