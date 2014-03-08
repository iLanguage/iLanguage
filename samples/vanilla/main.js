var firstdb = "glossersample-quechua";
var firstGlosser = new Glosser({
  pouchname: firstdb
});
firstGlosser.downloadPrecedenceRules(firstdb, "http://localhost:5984/" + firstdb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
  var utterance = firstGlosser.guessUtteranceFromMorphemes({
    utterance: "",
    morphemes: "Kicha-nay-wa-n punqo-ta",
    allomorphs: "",
    gloss: "open-DES-1OM-3SG door-ACC",
    translation: "I feel like opening the door."
  });
  console.log(utterance);
  var lexicon = LexiconFactory({
    precedenceRelations: precedenceRelations,
    dbname: firstdb,
    element: document.getElementById("lexicon"),
    dontConnectWordBoundaries: true
  });
  lexicon.bindToView();
  firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, document.getElementById("glosser"), firstdb, "dont connect on word boundaries so we can see templates in paradigms");
});

var seconddb = "glossersample-cherokee";
var secondGlosser = new Glosser({
  pouchname: seconddb
});
secondGlosser.downloadPrecedenceRules(seconddb, "http://localhost:5984/" + seconddb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
  var lexicon = LexiconFactory({
    precedenceRelations: precedenceRelations,
    dbname: seconddb,
    element: document.getElementById("lexicon2"),
    dontConnectWordBoundaries: true
  });
  lexicon.bindToView();
  secondGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, document.getElementById("glosser2"), seconddb, "dontusewordboundaries");
});

var thirddb = "glossersample-inuktitut";
var thirdGlosser = new Glosser({
  pouchname: thirddb
});
thirdGlosser.downloadPrecedenceRules(thirddb, "http://localhost:5984/" + thirddb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
  var lexicon = LexiconFactory({
    precedenceRelations: precedenceRelations,
    dbname: thirddb,
    element: document.getElementById("lexicon3"),
    dontConnectWordBoundaries: true
  });
  lexicon.bindToView();
  thirdGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, document.getElementById("glosser3"), thirddb, "dont connect on word boundaries so we can see templates in paradigms");
});
