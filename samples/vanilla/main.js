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
      dontConnectWordBoundaries: !showWordBoundaries
    });
    lexicon.bindToView();
    var renderFirstGraph = function() {
      var glosserElement = document.getElementById("glosser");
      glosserElement.innerHTML = "";
      firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !showWordBoundaries);
    };
    rerenderIfWordBoundariesChange.push(renderFirstGraph);
    renderFirstGraph();
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
      dontConnectWordBoundaries: !showWordBoundaries
    });
    lexicon.bindToView();

    var renderSecondGraph = function() {
      var glosserElement = document.getElementById("glosser2");
      glosserElement.innerHTML = "";
      firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !showWordBoundaries);
    };
    rerenderIfWordBoundariesChange.push(renderSecondGraph);
    renderSecondGraph();
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
      dontConnectWordBoundaries: !showWordBoundaries
    });
    lexicon.bindToView();

    var renderThirdGraph = function() {
      var glosserElement = document.getElementById("glosser3");
      glosserElement.innerHTML = "";
      firstGlosser.visualizePrecedenceRelationsAsForceDirectedGraph(lexicon, glosserElement, !showWordBoundaries);
    };
    rerenderIfWordBoundariesChange.push(renderThirdGraph);
    renderThirdGraph();
  });

};

var refreshButton = document.getElementById("refreshButton");
refreshButton.onclick = loadExamples;


var showGlosserAsGraph = document.getElementById("showGlosserAsGraph");
showGlosserAsGraph.onchange = function(){
  document.getElementById("glosser").hidden = !showGlosserAsGraph.checked;
  document.getElementById("glosser2").hidden = !showGlosserAsGraph.checked;
  document.getElementById("glosser3").hidden = !showGlosserAsGraph.checked;
};


var showLexiconAsList = document.getElementById("showLexiconAsList");
showLexiconAsList.onchange = function(){
  document.getElementById("lexicon").hidden = !showLexiconAsList.checked;
  document.getElementById("lexicon2").hidden = !showLexiconAsList.checked;
  document.getElementById("lexicon3").hidden = !showLexiconAsList.checked;
};

loadExamples();
