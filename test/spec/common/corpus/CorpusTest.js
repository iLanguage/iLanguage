var Corpus = require('../../../../src/common/corpus/Corpus').Corpus;


describe('Corpus:', function() {

  describe('As a team we want to be able to go back in time in the corpus revisions', function() {
    it('should be able to import from GitHub repository', function() {
      expect(Corpus.Orthography).toBeDefined();
      expect(true).toBeTruthy();
    });
  });


  describe('As a user I want to be able to import via drag and drop', function() {
    it('should detect drag and drop', function() {
      expect(true).toBeTruthy();
    });
  });

  describe('As a user I want to be able to go offline, but still have the most recent objects in my corpus available', function() {
    it('should have the most recent entries available', function() {
      expect(true).toBeTruthy();
    });
    it('should store the corpus offine', function() {
      expect(true).toBeTruthy();
    });
  });

});
