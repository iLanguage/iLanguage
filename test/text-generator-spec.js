"use strict";

var randomOrthographicText = randomOrthographicText || require('../js/text-generator').randomOrthographicText;
var randomUnicodeWord = randomUnicodeWord || require('../js/text-generator').randomUnicodeWord;

describe("text generator", function() {

  it("should load", function() {
    expect(randomOrthographicText).toBeDefined();
    expect(randomUnicodeWord).toBeDefined();
  });

  describe("char sets", function() {

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
      expect(smallUnicodeWord).toEqual(" ");
      expect(smallUnicodeWord.length).toEqual(3);
    });

    it("should generate random texts", function() {
      var smallUnicodeText = randomOrthographicText(8);
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split(" ").length).toEqual(8);
    });

    it("should generate random IPA texts", function() {
      var smallUnicodeText = randomOrthographicText(8);
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split(" ").length).toEqual(8);
    });

    it("should generate random IPA texts", function() {
      var smallUnicodeText = randomOrthographicText({
        length: 4,
        iso: "ipa"
      });
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split(" ").length).toEqual(4);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

    it("should generate random IPA texts", function() {
      var smallUnicodeText = randomOrthographicText({
        length: 8,
        iso: "ka"
      });
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split(" ").length).toEqual(8);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

    it("should generate random IPA texts", function() {
      var smallUnicodeText = randomOrthographicText({
        length: 6,
        iso: "ja"
      });
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split(" ").length).toEqual(6);
      expect(smallUnicodeText.indexOf("a")).toEqual(-1);
    });

  });

  describe("seperators", function() {

    it("should support morpheme seperators", function() {
      var smallUnicodeText = randomOrthographicText({
        length: 3,
        seperator: "-"
      });
      expect(smallUnicodeText).toBeDefined();
      expect(smallUnicodeText).toEqual(" ");
      expect(smallUnicodeText.split("-").length).toEqual(3);
      expect(smallUnicodeText.split(" ").length).not.toEqual(3);
    });

  });

});
