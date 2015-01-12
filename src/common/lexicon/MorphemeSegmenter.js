(function(exports) {

  var defaults = {
    algorithm: "default",
    maxIterations: 2
  };

  var MorphemeSegmenter = {


    runSegmenter: function(doc) {
      if (!doc.morphemeSegmentationOptions.segmenter) {
        console.warn("segmenter for this doc must be provided/injected.");
        return doc;
      }
      if (doc.morphemes) {
        console.log("morphemes were already guessed. returning.");
        return doc;
      }
      if (!doc.pouchname && !doc.dbname) {
        console.warn("I need a rule set to use. please specify a dbname");
        return doc;
      }
      if (!doc.utterance && !doc.orthography) {
        console.warn("I don't need to guess the segmentation of an empty string, it's just empty. ", doc.utterance);
        return doc;
      }
      doc.pouchname = doc.pouchname || doc.dbname;
      doc.utterance = doc.utterance || doc.orthography;
      // console.log("Running segmenter", doc);
      doc.morphemeSegmentationOptions.segmenter.guessMorphemesFromUtterance(doc);
      console.log("guessed ", doc);

      return doc;
    }
  };

  exports.MorphemeSegmenter = MorphemeSegmenter;

})(typeof exports === "undefined" ? this["MorphemeSegmenter"] = {} : exports);
