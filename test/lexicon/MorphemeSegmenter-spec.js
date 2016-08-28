'use strict';
var MorphemeSegmenter = MorphemeSegmenter || require('../../js/lexicon/MorphemeSegmenter').MorphemeSegmenter;

// var specIsRunningTooLong = 5000;

describe('MorphemeSegmenter construction', function() {

  describe('construction', function() {

    it('should load', function() {
      expect(MorphemeSegmenter).toBeDefined();
    });

  });

  describe('segmentation', function() {

    it('should provide orthography as segmentation if if a segmenter\'s rules are not downloaded yet ', function() {
      var doc = MorphemeSegmenter.runSegmenter({
        orthography: 'noqata tusunaywanmi',
        ilanguage: 'kartuli-batumshi-georgi-beridze',
        morphemeSegmentationOptions: {
          algorithm: 'MorphoParser',
          maxIterations: 2
        }
      });
      expect(doc.morphemes).toEqual('noqata tusunaywanmi');
    });

    it('should provide a suggested segmentation if seeds are provided', function() {
      var doc = MorphemeSegmenter.runSegmenter({
        orthography: 'noqata tusunaywanmi',
        morphemeSegmentationOptions: {
          algorithm: 'MorphoParser',
          seeds: 'noqa-ta tusu-nay-wa-n-mi',
          maxIterations: 2
        }
      });
      expect(doc.morphemes).toEqual('noqa-ta tusu-nay-wa-n-mi');
    });

    it('should provide a suggested segmentation if precedence relations are provided', function() {
      var doc = MorphemeSegmenter.runSegmenter({
        orthography: 'noqata tusunaywanmi',
        morphemeSegmentationOptions: {
          algorithm: 'MorphoParser',
          precedenceRelations: ['ta-@', 'mi-@'],
          maxIterations: 2
        }
      });
      expect(doc.morphemes).toEqual('noqa-ta tusunaywan-mi');
    });

    xit('should use an ilanguage\'s segmentation model', function() {

      var doc = MorphemeSegmenter.runSegmenter({
        orthography: 'noqata tusunaywanmi',
        ilanguage: 'quechua-cusco-seberina-diaz',
        morphemeSegmentationOptions: {
          algorithm: 'MorphoParser',
          maxIterations: 2
        }
      });
      expect(doc.morphemes).toEqual('noqa-ta tusu-nay-wa-n-mi');
    });


    xdescribe('preserve user input', function() {

      it('should not modify segmentation if it was edited by the user', function() {
        var doc = MorphemeSegmenter.runSegmenter({
          orthography: 'noqata tusunaywanmi',
          morphemes: 'noqa-ta tusu-nay-wan-mi',
          morphemeSegmentationOptions: {
            algorithm: "MorphoParser",
            seeds: 'noqa-ta tusu-nay-wa-n-mi',
            maxIterations: 2
          }
        });
        expect(doc.morphemes).toEqual('noqa-ta tusu-nay-wan-mi');
      });

      it('should modify segmentation if it was not edited by the user', function() {
        var doc = MorphemeSegmenter.runSegmenter({
          orthography: 'noqata tusunaywanmi',
          morphemes: 'noqata tusunaywanmi',
          morphemeSegmentationOptions: {
            algorithm: 'MorphoParser',
            seeds: 'noqa-ta tusu-nay-wa-n-mi',
            maxIterations: 2
          }
        });
        expect(doc.morphemes).toEqual('noqa-ta tusu-nay-wa-n-mi');
      });

    });
  });

});
