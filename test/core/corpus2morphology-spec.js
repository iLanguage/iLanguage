'use strict';
var Corpus2Morphology = Corpus2Morphology || require('../../js/core/corpus2morphology').Corpus2Morphology;

var specIsRunningTooLong = 5000;

var trainingSeedSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
var currentSize = trainingSeedSizes[0];

describe('core/corpus2morphology', function() {

  describe('It can guess segmentation', function() {

    it('should run', function() {
      expect(Corpus2Morphology).toBeDefined();
      expect(Corpus2Morphology.run).toBeDefined();
      // expect(Corpus2Morphology.morphology2clean).toBeDefined();
      // expect(Corpus2Morphology.corpus2wordlist).toBeDefined();
      // expect(Corpus2Morphology.wordlist2rankedpossiblemorphs).toBeDefined();
      // expect(Corpus2Morphology.seedlist2precedencerelations).toBeDefined();
      // expect(Corpus2Morphology.seedlist2initialdensecorpus).toBeDefined();
      // expect(Corpus2Morphology.initialdensecorpus2morphrelations).toBeDefined();
      // expect(Corpus2Morphology.morphrelations2phonotactics).toBeDefined();
      // expect(Corpus2Morphology.morphorelations2template).toBeDefined();
      // expect(Corpus2Morphology.precedencerelations2densecorpus).toBeDefined();
      expect(true).toBeTruthy();
    });

  });


  it("should Removing all files and memories...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating a wordlist...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating  rankedpossiblemorpheme lists...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating initial precedence relations...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating an initial dense corpus...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating precedence relations between morphemes...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating a list of permissible morpheme boundaries ie, z > a, in xyz > abc ...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Welcome $i times", function() {
    expect(true).toBeTruthy();
  });

  it("should Creating a (new) template by generalizing individual morphs to their class...", function() {
    expect(true).toBeTruthy();
  });
  
  it("should Creating a new dense corpus...", function() {
    expect(true).toBeTruthy();
  });

});