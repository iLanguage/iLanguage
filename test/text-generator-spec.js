"use strict";

var textGenerator = textGenerator || require('../js/text-generator').textGenerator;
var randomUnicodeWord = randomUnicodeWord || require('../js/text-generator').randomUnicodeWord;

describe("text generator", function() {

  it("should load", function() {
    expect(textGenerator).toBeDefined();
    expect(randomUnicodeWord).toBeDefined();
  });

  it("should generate unicode strings", function() {
    var smallUnicodeWord = randomUnicodeWord(10);
    expect(smallUnicodeWord).toBeDefined();
    expect(smallUnicodeWord).toEqual(" ");
    expect(smallUnicodeWord.length).toEqual(10);
  });

  // http://billposer.org/Linguistics/Computation/UnicodeRanges.html
  describe("char sets", function() {

    it("should know how to generate IPA charset", function() {
      textGenerator.setLanguage("ipa");
      expect(textGenerator.unicodeStartChar).toEqual(0x1D00);
      expect(textGenerator.unicodeRange).toEqual(127);
    });

    it("should know how to generate nihõŋɡo charset", function() {
      textGenerator.setLanguage("ja");
      expect(textGenerator.unicodeStartChar).toEqual(0x3040);
      expect(textGenerator.unicodeRange).toEqual(191);
    });

    it("should know how to generate ქართული charset start", function() {
      textGenerator.setLanguage("ka");
      expect(textGenerator.unicodeStartChar).toEqual(0x10A0);
      expect(textGenerator.unicodeRange).toEqual(95);
    });

  });

  it("should generate random unicode texts", function() {
    var smallUnicodeText = textGenerator(8);
    expect(smallUnicodeText).toBeDefined();
    expect(smallUnicodeText).toEqual(" ");
    expect(smallUnicodeText.split(" ").length).toEqual(8);
  });

  describe("seperators", function() {

    it("should support morpheme seperators", function() {
      var smallUnicodeText = textGenerator(3, "-");
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split("-").length).toEqual(3);
      expect(smallUnicodeText.split(" ").length).not.toEqual(3);
    });

  });

});
