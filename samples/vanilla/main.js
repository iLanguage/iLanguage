var loadExamples = function() {
  var graphWordBoundaries = document.getElementById("graphWordBoundaries");
  var showWordBoundaries;
  if (graphWordBoundaries && graphWordBoundaries.checked) {
    showWordBoundaries = true;
  } else {
    showWordBoundaries = false;
  }

  var rerenderIfWordBoundariesChange = [];
  graphWordBoundaries.onchange = function() {
    if (graphWordBoundaries && graphWordBoundaries.checked) {
      showWordBoundaries = true;
    } else {
      showWordBoundaries = false;
    }
    for (var functionToCall = 0; functionToCall < rerenderIfWordBoundariesChange.length; functionToCall++) {
      rerenderIfWordBoundariesChange[functionToCall]();
    }
  };

  // var firstdb = "elisekm-eti3_data_tutorial";
  // var firstGlosser = new Glosser({
  //   pouchname: firstdb
  // });
  // firstGlosser.downloadPrecedenceRules(firstdb, "https://localhost:6984/" + firstdb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
  //   var utterance = firstGlosser.guessUtteranceFromMorphemes({
  //     utterance: "",
  //     morphemes: "Kicha-nay-wa-n punqo-ta",
  //     allomorphs: "",
  //     gloss: "open-DES-1OM-3SG door-ACC",
  //     translation: "I feel like opening the door."
  //   });
  //   console.log(utterance);
  //   var lexicon = LexiconFactory({
  //     precedenceRelations: precedenceRelations,
  //     dbname: firstdb,
  //     element: document.getElementById("lexicon"),
  //     dontConnectWordBoundaries: !showWordBoundaries
  //   });
  //   lexicon.bindToView();
  //   var renderFirstGraph = function() {
  //     var glosserElement = document.getElementById("glosser");
  //     glosserElement.innerHTML = "";
  //     var confidenceThreshold = document.getElementById("lexiconConfidenceThreshold").value /10;
  //     firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !showWordBoundaries, confidenceThreshold);
  //   };
  //   rerenderIfWordBoundariesChange.push(renderFirstGraph);
  //   renderFirstGraph();
  // });

  var seconddb = "nemo814-group_data_entry_tutorial";
  var secondGlosser = new Glosser({
    pouchname: seconddb
  });
  secondGlosser.downloadPrecedenceRules(seconddb, "https://localhost:6984/" + seconddb + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true", function(precedenceRelations) {
    var lexicon = LexiconFactory({
      precedenceRelations: precedenceRelations,
      dbname: seconddb,
      element: document.getElementById("lexicon2"),
      dontConnectWordBoundaries: !showWordBoundaries
    });
    lexicon.bindToView();

    var renderSecondGraph = function() {
      var glosserElement = document.getElementById("glosser2");
      glosserElement.innerHTML = "";
      var confidenceThreshold = document.getElementById("lexiconConfidenceThreshold").value /10;
      secondGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !showWordBoundaries, confidenceThreshold);
    };
    rerenderIfWordBoundariesChange.push(renderSecondGraph);
    renderSecondGraph();
  });

};

var refreshButton = document.getElementById("refreshButton");
refreshButton.onclick = loadExamples;


var showGlosserAsGraph = document.getElementById("showGlosserAsGraph");
showGlosserAsGraph.onchange = function(){
  document.getElementById("glosser").hidden = !showGlosserAsGraph.checked;
  document.getElementById("glosser2").hidden = !showGlosserAsGraph.checked;
};


var showLexiconAsList = document.getElementById("showLexiconAsList");
showLexiconAsList.onchange = function(){
  document.getElementById("lexicon").hidden = !showLexiconAsList.checked;
  document.getElementById("lexicon2").hidden = !showLexiconAsList.checked;
};

loadExamples();
