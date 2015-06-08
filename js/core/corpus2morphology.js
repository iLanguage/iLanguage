(function(exports) {

  var Corpus2Morphology = {
    LANGUAGE: "inuktitut",

    run: function() {
      console.log("Removing all files and memories...");
      // #./morphology2clean
      // ./morphology2clean $1 #if you want to remove the word lists too

      console.log("Creating a wordlist...");
      // ./corpus2wordlist $1

      console.log("Creating  rankedpossiblemorpheme lists...");
      // ./wordlist2rankedpossiblemorphs $1-suffixOrder

      console.log("Creating initial precedence relations...");
      // ./seedlist2precedencerelations $LANGUAGE-seedlist

      console.log("Creating an initial dense corpus...");
      console.log("      (contains a hard coded seed list, change this to follow from above step in later versions)");
      // ./seedlist2initialdensecorpus $1-suffixOrder

      console.log("Creating precedence relations between morphemes...");
      // ./initialdensecorpus2morphrelations.pl $LANGUAGE-densecorpus

      console.log("Creating a list of permissible morpheme boundaries ie, z > a, in xyz > abc ...");
      // ./morphrelations2phonotactics.pl $LANGUAGE-morphrelations-frequency

      // sort -r inuktitut-morphrelations-frequency  > inuktitut-morphrelations-frequency-sorted


      console.log("Creating a (new) template by generalizing individual morphs to their class...");
      // ./morphrelations2template.py $LANGUAGE-morphorelations-frequency-sorted

      console.log("Creating a new dense corpus...");
      // ./precedencerelations2densecorpus $1-suffixOrder
    }
  };

  exports.Corpus2Morphology;
  // }(typeof exports === 'object' && exports || this));
})(typeof exports === 'undefined' ? this['Corpus2Morphology'] = {} : exports);
