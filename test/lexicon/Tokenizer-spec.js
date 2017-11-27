'use strict';
var Tokenizer = Tokenizer || require('../../js/lexicon/Tokenizer').Tokenizer;

// var specIsRunningTooLong = 5000;

describe('Tokenizer construction', function() {

  it('should load', function() {
    expect(Tokenizer).toBeDefined();
  });

  it('should create an array of tokens (words and symbols) on white space', function() {
    var doc = Tokenizer.tokenizeInput({
      orthography: 'There\'s a user-defined text: with ‘some’ stuff. And another. -too,  2011- ᖑᑎᓪᓗᒍ. again.',
    });
    expect(doc.orthographyArray).toEqual(['There', '\'', 's', 'a', 'user-defined', 'text', ':', 'with', '‘', 'some', '’', 'stuff', '.', 'And', 'another', '.', '-', 'too', ',', '2011', '-', 'ᖑᑎᓪᓗᒍ', '.', 'again', '.']);
    expect(doc.orthographicWords).toEqual(['There', 's', 'a', 'user-defined', 'text', 'with', 'some', 'stuff', 'And', 'another', 'too', '2011', 'ᖑᑎᓪᓗᒍ', 'again']);
    // expect(doc.tokenizeOnTheseRegExp.toString()).toEqual('/[!-,.-/:-@[-`{-~〱-〵゛゜゠ーｰ\s]+/');
    // expect(doc.wordExternalPunctuationRegExp.toString()).toEqual('/(^[-\'\u2000-\u206F]+|[-\'\u2000-\u206F]+$)/');
  });

  it('should create an array of tokens (words and symbols word boundary morphemes) on white space', function() {
    var doc = Tokenizer.tokenizeInput({
      orthography: 'nospaceshere',
      wordBoundaryMorphemes: ['s']
    });
    expect(doc.orthographyArray).toEqual(['no', 's', 'pace', 's', 'here']);
  });

  it('should tokenize obvious punctuation in a word', function() {
    var doc = Tokenizer.tokenizeInput({
      orthography: ''
    });
    expect(doc.orthographyArray).toEqual([]);
  });

  it('should permit the user to define cleaning re-write rules prior to tokenization', function() {
    var doc = Tokenizer.tokenizeInput({
      orthography: 'This has AAA rewrite rules.',
      userDefinedCleaningReWriteRules: [{
        source: 'AAA',
        relation: 'isCleanedAs',
        target: 'BBB'
      }]
    });
    expect(doc.orthographicWords).toEqual(['This', 'has', 'BBB', 'rewrite', 'rules']);
  });

  describe('language detection', function() {
    describe('japanese', function() {
      it('should detect japanese', function() {
        var doc = Tokenizer.tokenizeInput({
          orthography: '伊豆の伊東にヒロポン屋というものが存在している。旅館の番頭にさそわれてヤキトリ屋へ一パイのみに行って、元ダンサーという女中を相手にのんでいると、まッ黒いフロシキ包み（一尺四方ぐらい）を背負ってはいってきた二十五六の青年がある。女中がついと立って何か話していたが、二人でトントン二階へあがっていった。 三分ぐらいで降りて戻ってきたが、男が立ち去ると、 「あの人、',
        });
        expect(doc.orthographicWords).toEqual([ '伊豆', 'の', '伊東', 'に', 'ヒロポン屋というも', 'の', 'が存在している', '旅館', 'の', '番頭', 'に', 'さそわれてヤキトリ屋へ一パイ', 'の', 'み', 'に', '行って', '元ダンサ', 'という女中を相手', 'に', 'の', 'んでいると', 'まッ黒いフロシキ包み（一尺四方ぐらい）を背負ってはいってきた二十五六', 'の', '青年がある', '女中がついと立って何か話していたが', '二人でトントン二階へあがっていった', '三分ぐらいで降りて戻ってきたが', '男が立ち去ると', 'あ', 'の', '人' ]);
      });
    });
  });

  describe('morphemeSegmentationOptions', function() {
    it('should create an array of words if a segmenter\'s rules are not downloaded yet ', function() {
      var doc = Tokenizer.tokenizeInput({
        orthography: 'noqata tusunayawanmi',
        ilanguage: 'lingllama-communitycorpus',
        morphemeSegmentationOptions: {
          algorithm: "MorphoParser",
          maxIterations: 2
        }
      });
      expect(doc.orthographyArray).toEqual(['noqata', 'tusunayawanmi']);
    });

    xit('should create an array of tokens (morphemes) if a segmenter\'s rules have been downloaded', function() {
      var doc = Tokenizer.tokenizeInput({
        orthography: 'noqata tusunayawanmi',
        ilanguage: 'lingllama-communitycorpus',
        morphemeSegmentationOptions: {
          algorithm: "MorphoParser",
          seeds: "noqa-ta tusu-na-y-wa-n-mi",
          maxIterations: 2
        }
      });
      expect(doc.orthographyArray).toEqual(['noqa', 'ta', 'tusu', 'na', 'y', 'wa', 'n', 'mi']);
    });
  });

});
