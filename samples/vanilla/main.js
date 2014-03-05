var firstdb = "glossersample-quechua";
Glosser.downloadPrecedenceRules(firstdb, "http://localhost:5984/" + firstdb + "/_design/pages/_view/precedence_rules?group=true", function() {
  var utterance = Glosser.guessUtteranceFromMorphemes({
    utterance: "",
    morphemes: "Kicha-nay-wa-n punqo-ta",
    allomorphs: "",
    gloss: "open-DES-1OM-3SG door-ACC",
    translation: "I feel like opening the door."
  });
  console.log(utterance);
  Glosser.visualizeMorphemesAsForceDirectedGraph(null, document.getElementById("glosser"), firstdb);
})

var seconddb = "glossersample-cherokee";
Glosser.downloadPrecedenceRules(seconddb, "http://localhost:5984/"+seconddb+"/_design/pages/_view/precedence_rules?group=true", function() {
  Glosser.visualizeMorphemesAsForceDirectedGraph(null, document.getElementById("glosser2"), seconddb);
})

var thirddb = "glossersample-inuktitut";
Glosser.downloadPrecedenceRules(thirddb, "http://localhost:5984/"+thirddb+"/_design/pages/_view/precedence_rules?group=true", function() {
  Glosser.visualizeMorphemesAsForceDirectedGraph(null, document.getElementById("glosser3"), thirddb);
})
