var firstdb = "glossersample-quechua";
var firstGlosser = new Glosser({
  pouchname: firstdb
});
firstGlosser.downloadPrecedenceRules(firstdb, "http://localhost:5984/" + firstdb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(rules) {
  var utterance = firstGlosser.guessUtteranceFromMorphemes({
    utterance: "",
    morphemes: "Kicha-nay-wa-n punqo-ta",
    allomorphs: "",
    gloss: "open-DES-1OM-3SG door-ACC",
    translation: "I feel like opening the door."
  });
  console.log(utterance);
  firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(rules, document.getElementById("glosser"), firstdb, null, "dont connect on word boundaries so we can see templates in paradigms");
});

var seconddb = "glossersample-cherokee";
var secondGlosser = new Glosser({
  pouchname: seconddb
});
secondGlosser.downloadPrecedenceRules(seconddb, "http://localhost:5984/" + seconddb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(rules) {
  secondGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(rules, document.getElementById("glosser2"), seconddb, document.getElementById("lexicon2"));
});

var thirddb = "glossersample-inuktitut";
var thirdGlosser = new Glosser({
  pouchname: thirddb
});
thirdGlosser.downloadPrecedenceRules(thirddb, "http://localhost:5984/" + thirddb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(rules) {
  thirdGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(rules, document.getElementById("glosser3"), thirddb, null , "dont connect on word boundaries so we can see templates in paradigms");
});
