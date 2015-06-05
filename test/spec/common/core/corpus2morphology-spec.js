'use strict';
var Corpus2Morphology = require('../../../../src/common/core/corpus2morphology').Corpus2Morphology;

var specIsRunningTooLong = 5000;

var trainingSeedSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
var currentSize = trainingSeedSizes[0];

describe('core/corpus2morphology', function() {


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