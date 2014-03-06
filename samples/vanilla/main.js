var firstdb = "glossersample-quechua";
var firstGlosser = new Glosser({
  pouchname: firstdb
});
firstGlosser.downloadPrecedenceRules(firstdb, "http://localhost:5984/" + firstdb + "/_design/pages/_view/precedence_rules?group=true", function() {
  var utterance = firstGlosser.guessUtteranceFromMorphemes({
    utterance: "",
    morphemes: "Kicha-nay-wa-n punqo-ta",
    allomorphs: "",
    gloss: "open-DES-1OM-3SG door-ACC",
    translation: "I feel like opening the door."
  });
  console.log(utterance);
  firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(null, document.getElementById("glosser"), firstdb);
});

var seconddb = "glossersample-cherokee";
var secondGlosser = new Glosser({
  pouchname: seconddb
});
secondGlosser.downloadPrecedenceRules(seconddb, "http://localhost:5984/" + seconddb + "/_design/pages/_view/precedence_rules?group=true", function() {
  secondGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(null, document.getElementById("glosser2"), seconddb);
});

var thirddb = "glossersample-inuktitut";
var thirdGlosser = new Glosser({
  pouchname: thirddb
});
thirdGlosser.downloadPrecedenceRules(thirddb, "http://localhost:5984/" + thirddb + "/_design/pages/_view/precedence_rules?group=true", function() {
  thirdGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(null, document.getElementById("glosser3"), thirddb);
});
