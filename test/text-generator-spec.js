"use strict";

var randomOrthographicText = randomOrthographicText || require('../js/text-generator').randomOrthographicText;
var randomMorphologicalText = randomMorphologicalText || require('../js/text-generator').randomMorphologicalText;
var randomUnicodeWord = randomUnicodeWord || require('../js/text-generator').randomUnicodeWord;

describe("text generator", function() {

  it("should load", function() {
    expect(randomOrthographicText).toBeDefined();
    expect(randomUnicodeWord).toBeDefined();
  });

  xdescribe("char sets", function() {

    it("should use a-z by default", function() {
      var langOptions = randomOrthographicText.setLanguage();
      expect(langOptions.unicodeStartChar).toEqual(0x0061);
      expect(langOptions.unicodeRange).toEqual(26);
    });

    it("should accept any charset start and range", function() {
      var langOptions = randomOrthographicText.setLanguage({
        iso: "banana",
        unicodeStartChar: 0x000,
        unicodeRange: 2095
      });
      expect(langOptions.unicodeStartChar).toEqual(0x000);
      expect(langOptions.unicodeRange).toEqual(2095);
    });

    it("should know how to generate IPA charset", function() {
      var langOptions = randomOrthographicText.setLanguage("ipa");
      expect(langOptions.unicodeStartChar).toEqual(0x1D00);
      expect(langOptions.unicodeRange).toEqual(127);
    });

    it("should know how to generate nihõŋɡo charset", function() {
      var langOptions = randomOrthographicText.setLanguage("ja");
      expect(langOptions.unicodeStartChar).toEqual(0x3040);
      expect(langOptions.unicodeRange).toEqual(191);
    });

    it("should know how to generate ქართული charset start", function() {
      var langOptions = randomOrthographicText.setLanguage("ka");
      expect(langOptions.unicodeStartChar).toEqual(0x10A0);
      expect(langOptions.unicodeRange).toEqual(95);
    });

  });

  describe("random text", function() {

    it("should generate random orthographic words", function() {
      var smallUnicodeWord = randomUnicodeWord(3);
      expect(smallUnicodeWord).toBeDefined();
      console.log(smallUnicodeWord);
      expect(smallUnicodeWord.length).toEqual(3);
    });

    it("should generate random texts", function() {
      var smallUnicodeText = randomOrthographicText(8);
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(" ").length).toEqual(8);
    });

    it("should generate random IPA texts", function() {
      var smallUnicodeText = randomOrthographicText({
        wordCount: 23,
        iso: "ipa"
      });
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(" ").length).toEqual(23);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

    it("should generate random ქართული texts", function() {
      var smallUnicodeText = randomOrthographicText({
        wordCount: 32,
        iso: "ka"
      });
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(" ").length).toEqual(32);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

    it("should generate random nihõŋɡo texts", function() {
      var smallUnicodeText = randomOrthographicText({
        wordCount: 24,
        wordBoundary: "・",
        maxWordLength: 40,
        iso: "ja"
      });
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split("・").length).toEqual(24);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

  });

  describe("seperators", function() {

    it("should generate morphologically segmented texts", function() {
      var smallUnicodeText = randomMorphologicalText(3);
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(" ").length).toEqual(3);
      expect(smallUnicodeText).toContain("-");
    });

    it("should generate morphologically segmented ქართული-like texts", function() {
      var smallUnicodeText = randomMorphologicalText({
        wordCount: 6,
        iso: "ka",
        maxWordLength: 12,
        maxMorphemeLength: 9,
        maxMorphemesPerWord: 4
      });
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(" ").length).toEqual(6);
      expect(smallUnicodeText).toContain("-");
      expect(smallUnicodeText.split("-").length).toBeGreaterThan(6);
    });

    it("should support custom word boundaries", function() {
      var smallUnicodeText = randomOrthographicText({
        wordCount: 3,
        wordBoundary: "."
      });
      expect(smallUnicodeText).toBeDefined();
      console.log(smallUnicodeText);
      expect(smallUnicodeText.split(".").length).toEqual(3);
      expect(smallUnicodeText.split(" ").length).not.toEqual(3);
    });

  });

  describe("invalid input", function() {

    it("should return an empty word", function() {
      var emptyWord = randomUnicodeWord();
      expect(emptyWord).toBeDefined();
      expect(emptyWord).toEqual("");
    });

    it("should return an empty orthographic text", function() {
      var emptyText = randomOrthographicText();
      expect(emptyText).toBeDefined();
      expect(emptyText).toEqual("");
    });


    it("should return an empty morphological text", function() {
      var emptyText = randomMorphologicalText();
      expect(emptyText).toBeDefined();
      expect(emptyText).toEqual("");
    });

  });

});
