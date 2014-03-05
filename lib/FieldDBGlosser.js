var d3 = d3 || require("d3");
var _ = _ || require("underscore");
var XMLHttpRequest = XMLHttpRequest || require("xmlhttprequest").XMLHttpRequest;

/*
 * FieldDBGlosser
 * https://github.com/OpenSourceFieldlinguistics/FieldDB/issues/milestones?state=closed
 *
 * Copyright (c) 2013 FieldDB contributors
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {

  'use strict';

  var Glosser  = function(options) {

  var console = console || {
    log: function() {}
  };
  var OPrime = OPrime || {
    debugMode: true,
    bug: function(message){
      console.log(message);
    },
    debug: function(message, message2, message3, message4) {
      if (this.debugMode) {
        console.log(message);

        if (message2) {
          console.log(message2);
        }
        if (message3) {
          console.log(message3);
        }
        if (message4) {
          console.log(message4);
        }
      }
    },
    makeCORSRequest: function(options) {
      OPrime.debugMode = false;
      if (!options.method) {
        options.method = options.type || "GET";
      }
      if (!options.url) {
        OPrime.bug("There was an error. Please report this.");
      }
      if (!options.data) {
        options.data = "";
      }
      options.dataToSend = JSON.stringify(options.data).replace(/,/g, "&").replace(/:/g, "=").replace(/"/g, "").replace(/[}{]/g, "");

      if (options.method === "GET" && options.data) {
        options.url = options.url + "?" + options.dataToSend;
      }
      /*
       * Helper function which handles IE
       */
      var createCORSRequest = function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }
        return xhr;
      };

      var xhr = createCORSRequest(options.method, options.url);
      if (!xhr) {
        OPrime.bug('CORS not supported, your browser is unable to contact the database.');
        return;
      }

      //  if(options.method === "POST"){
      //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.withCredentials = true;
      //  }

      xhr.onload = function(e, f, g) {
        var text = xhr.responseText;
        if (OPrime.debugMode) {
          OPrime.debug('Response from CORS request to ' + options.url + ': ' + text);
        }
        if (typeof options.success === "function") {
          if (text) {
            options.success(JSON.parse(text));
          } else {
            OPrime.bug("There was no content in the server's response text. Please report this.");
            options.error(e, f, g);
          }
        }
        OPrime.debugMode = false;
      };

      xhr.onerror = function(e, f, g) {
        if (OPrime.debugMode) {
          OPrime.debug(e, f, g);
        }
        OPrime.bug('There was an error making the CORS request to ' + options.url + " from " + window.location.href + " the app will not function normally. Please report this.");
        if (typeof options.error === "function") {
          options.error(e, f, g);
        }
      };
      if (options.method === "POST") {
        xhr.send(JSON.stringify(options.data));
      } else {
        xhr.send();
      }

    }
  };
  this.currentCorpusName = "";
  this.downloadPrecedenceRules = function(pouchname, glosserURL, callback) {
    if (!glosserURL || glosserURL === "default") {
      if (!window.app) {
        throw "Glosser cant be guessed, there is no app so the URL must be defined.";
      }
      var couchConnection = window.app.get("corpus").get("couchConnection");
      var couchurl = OPrime.getCouchUrl(couchConnection);
      glosserURL = couchurl + "/_design/pages/_view/precedence_rules?group=true";
    }
    var self = this;
    OPrime.makeCORSRequest({
      type: 'GET',
      url: glosserURL,
      success: function(rules) {
        localStorage.setItem(pouchname + "precendenceRules", JSON.stringify(rules.rows));

        // Reduce the rules such that rules which are found in multiple source
        // words are only used/included once.
        var reducedRules = _.chain(rules.rows).groupBy(function(rule) {
          return rule.key.x + "-" + rule.key.y;
        }).value();

        // Save the reduced precedence rules in localStorage
        localStorage.setItem(pouchname + "reducedRules", JSON.stringify(reducedRules));
        self.currentCorpusName = pouchname;
        if (typeof callback === "function") {
          callback();
        }
      },
      error: function(e) {
        console.log("error getting precedence rules:", e);
      },
      dataType: ""
    });
  };

  /**
   * Takes in an utterance line and, based on our current set of precendence
   * rules, guesses what the morpheme line would be. The algorithm is
   * very conservative.
   *
   * @param {String} unparsedUtterance The raw utterance line.
   *
   * @return {String} The guessed morphemes line.
   */
  this.morphemefinder = function(unparsedUtterance, pouchname, justCopyDontGuessIGT) {
    if(!unparsedUtterance){
      return "";
    }

    if (justCopyDontGuessIGT) {
      return unparsedUtterance;
    }

    if (!pouchname) {
      if (!window.app || !window.app.get("corpus")) {
        throw "Glosser can't be guessed, there is no app so the URL must be defined.";
      }
      pouchname = window.app.get("corpus").get("couchConnection").pouchname;
    }

    var potentialParse = '';
    // Get the precedence rules from localStorage
    var rules = localStorage.getItem(pouchname + "reducedRules");

    var parsedWords = [];
    if (rules) {
      // Parse the rules from JSON into an object
      rules = JSON.parse(rules);

      // Divide the utterance line into words
      var unparsedWords = unparsedUtterance.trim().split(/ +/);

      for (var word in unparsedWords) {
        // Add the start/end-of-word character to the word
        unparsedWords[word] = "@" + unparsedWords[word] + "@";

        // Find the rules which match in local precedence
        var matchedRules = [];
        for (var r in rules) {
          if (unparsedWords[word].indexOf(r.replace(/-/, "")) >= 0) {
            matchedRules.push({
              r: rules[r]
            });
          }
        }

        // Attempt to find the longest template which the matching rules can
        // generate from start to end
        var prefixtemplate = [];
        prefixtemplate.push("@");
        for (var i = 0; i < 10; i++) {
          if (prefixtemplate[i] === undefined) {
            break;
          }
          for (var j in matchedRules) {
            if (prefixtemplate[i] === matchedRules[j].r[0].key.x) {
              if (prefixtemplate[i + 1]) { // ambiguity (two potential following
                // morphemes)
                prefixtemplate.pop();
                break;
              } else {
                prefixtemplate[i + 1] = matchedRules[j].r[0].key.y;
              }
            }
          }
        }

        // If the prefix template hit ambiguity in the middle, try from the suffix
        // in until it hits ambiguity
        var suffixtemplate = [];
        if (prefixtemplate[prefixtemplate.length - 1] !== "@" || prefixtemplate.length === 1) {
          // Suffix:
          suffixtemplate.push("@");
          for (var ii = 0; ii < 10; ii++) {
            if (suffixtemplate[ii] === undefined) {
              break;
            }
            for (var jj in matchedRules) {
              if (suffixtemplate[ii] === matchedRules[jj].r[0].key.y) {
                if (suffixtemplate[ii + 1]) { // ambiguity (two potential
                  // following morphemes)
                  suffixtemplate.pop();
                  break;
                } else {
                  suffixtemplate[ii + 1] = matchedRules[jj].r[0].key.x;
                }
              }
            }
          }
        }

        // Combine prefix and suffix templates into one regular expression which
        // can be tested against the word to find a potential parse.
        // Regular expressions will look something like
        //    (@)(.*)(hall)(.*)(o)(.*)(wa)(.*)(n)(.*)(@)
        var template = [];
        template = prefixtemplate.concat(suffixtemplate.reverse());
        for (var slot in template) {
          template[slot] = "(" + template[slot] + ")";
        }
        var regex = new RegExp(template.join("(.*)"), "");

        // Use the regular expression to find a guessed morphemes line
        potentialParse = unparsedWords[word]
          .replace(regex, "$1-$2-$3-$4-$5-$6-$7-$8-$9") // Use backreferences to parse into morphemes
        .replace(/\$[0-9]/g, "") // Remove any backreferences that weren't used
        .replace(/@/g, "") // Remove the start/end-of-line symbol
        .replace(/--+/g, "-") // Ensure that there is only ever one "-" in a row
        .replace(/^-/, "") // Remove "-" at the start of the word
        .replace(/-$/, ""); // Remove "-" at the end of the word
        if (OPrime.debugMode) {
          OPrime.debug("Potential parse of " + unparsedWords[word].replace(/@/g, "") + " is " + potentialParse);
        }

        parsedWords.push(potentialParse);
      }
    }

    return parsedWords.join(" ");
  };

  this.glossFinder = function(morphemesLine, pouchname, justCopyDontGuessIGT) {
    if (!morphemesLine) {
      return "";
    }

    if (justCopyDontGuessIGT) {
      var justQuestionMarks = morphemesLine.trim().replace(/[^ -]+/g, "?");
      return justQuestionMarks;
    }

    if (!pouchname) {
      if (!window.app || !window.app.get("corpus")) {
        throw "Glosser can't be guessed, there is no app so the URL must be defined.";
      }
      pouchname = window.app.get("corpus").get("couchConnection").pouchname;
    }

    var lexiconNodes = localStorage.getItem(pouchname + "lexiconResults");
    if (!lexiconNodes) {
      return "";
    }

    lexiconNodes = JSON.parse(lexiconNodes);

    var glossGroups = [];
    var morphemeGroup = morphemesLine.split(/ +/);
    for (var group in morphemeGroup) {
      var morphemes = morphemeGroup[group].split("-");
      var glosses = [];
      for (var m in morphemes) {

        var matchingNodes = [];
        var node = lexiconNodes[morphemes[m]];
        if(node){
          matchingNodes.push(node);
        }
        node = lexiconNodes[morphemes[m].toLowerCase()];
        if(node){
          matchingNodes.push(node);
        }
        var gloss = "?"; // If there's no matching gloss, use question marks
        if (matchingNodes.length > 0) {
          // Take the first gloss for this morpheme
          console.log("Glosses which match: ", matchingNodes);
          try {
            gloss = matchingNodes[0][0].gloss;
          } catch(e) {
            OPrime.debug(matchingNodes);
          }
        }
        glosses.push(gloss);

      }

      glossGroups.push(glosses.join("-"));
    }

    // Replace the gloss line with the guessed glosses
    return glossGroups.join(" ");
  };

  this.guessUtteranceFromMorphemes = function(igt, justCopyDontGuessIGT){
    if(!igt.utterance && igt.morphemes){
      igt.utterance = igt.morphemes.replace(/[-.]/g,"");
    }
    return igt;
  };

  this.guessMorphemesFromUtterance = function(igt, justCopyDontGuessIGT){
    if (igt.morphemes) {
      return igt;
    }
    igt.morphemes = this.morphemefinder(igt.utterance, igt.pouchname, justCopyDontGuessIGT);
    if (!igt.gloss) {
      igt.gloss = this.glossFinder(igt.morphemes, igt.pouchname, justCopyDontGuessIGT);
    }
    return igt;
  };

  this.guessGlossFromMorphemes = function(igt, justCopyDontGuessIGT){
    if (igt.gloss) {
      return igt;
    }
    if (igt.morphemes) {
      igt.gloss = this.glossFinder(igt.morphemes, igt.pouchname, justCopyDontGuessIGT);
    } else {
      igt.gloss = this.glossFinder(igt.utterance, igt.pouchname, justCopyDontGuessIGT);
    }
    return igt;
  };


  /**
   * Takes as a parameters an array of rules which came from CouchDB precedence rule query.
   * Example Rule: {"key":{"x":"@","relation":"preceeds","y":"aqtu","context":"aqtu-nay-wa-n"},"value":2}
   */
  this.generateForceDirectedRulesJsonForD3 = function(rules, pouchname) {
    if (!pouchname) {
      pouchname = this.currentCorpusName;
    }
    if (!rules) {
      rules = localStorage.getItem(pouchname + "precendenceRules");
      if (rules) {
        rules = JSON.parse(rules);
      }
    }
    if (!rules) {
      return;
    }
    /*
     * Cycle through the precedence rules, convert them into graph edges with the morpheme index in the morpheme array as the source/target values
     */
    var morphemeLinks = [];
    var morphemes = [];
    for (var i in rules) {
      /* make the @ more like what a linguist recognizes for word boundaries */
      if (rules[i].key.x === "@") {
        rules[i].key.x = "#_";
      }
      if (rules[i].key.y === "@") {
        rules[i].key.y = "_#";
      }
      var xpos = morphemes.indexOf(rules[i].key.x);
      if (xpos < 0) {
        morphemes.push(rules[i].key.x);
        xpos = morphemes.length - 1;
      }
      var ypos = morphemes.indexOf(rules[i].key.y);
      if (ypos < 0) {
        morphemes.push(rules[i].key.y);
        ypos = morphemes.length - 1;
      }
      //To avoid loops?
      if (rules[i].key.y.indexOf("@") === -1) {
        morphemeLinks.push({
          source: xpos,
          target: ypos,
          value: 1 //TODO use the context counting to get a weight measure
        });
      }
    }

    /*
     * Build the morphemes into nodes and color them by their morpheme length, could be a good measure of outliers
     */
    var morphemenodes = [];
    for (var m in morphemes) {
      morphemenodes.push({
        name: morphemes[m],
        length: morphemes[m].length
      });
    }

    /*
     * Create the JSON required by D3
     */
    var rulesGraph = {};
    rulesGraph.links = morphemeLinks;
    rulesGraph.nodes = morphemenodes;
    this.rulesGraph = rulesGraph;

    return rulesGraph;
  };
  this.saveAndInterConnectInApp = function(callback) {

    if (typeof callback === "function") {
      callback();
    }
  };
  /*
   * Some sample D3 from the force-html.html example
   *
   */
  //this.rulesGraph = this.rulesGraph || {};
  this.visualizeMorphemesAsForceDirectedGraph = function(rulesGraph, divElement, pouchname) {

    if (pouchname) {
      this.currentCorpusName = pouchname;
    } else {
      throw ("Must provide corpus name to be able to visualize morphemes");
    }
    if (!rulesGraph) {
      rulesGraph = this.rulesGraph;
      if (rulesGraph) {
        if (rulesGraph.links.length === 0) {
          rulesGraph = this.generateForceDirectedRulesJsonForD3();
        }
      } else {
        rulesGraph = this.generateForceDirectedRulesJsonForD3();
      }
    }
    if (!rulesGraph) {
      return;
    }
    if (this.rulesGraph.links.length === 0) {
      return;
    }
    var json = rulesGraph;
    var width = 800,
      height = 300;

    /*
    Short morphemes will be blue, long will be red 
    */
    var color = d3.scale.linear()
      .range(['darkblue', 'darkred']) // or use hex values
    .domain([1, 8]);

    var x = d3.scale.linear()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([0, height - 40]);

    var force = d3.layout.force()
      .charge(-120)
      .linkStrength(0.2)
      .linkDistance(30)
      .size([width, height]);

    var svg = d3.select(divElement).append("svg")
      .attr("width", width)
      .attr('title', "Morphology Visualization for " + pouchname)
      .attr("height", height);

    var titletext = "Click to search morphemes in your corpus";
    if (rulesGraph.nodes.length < 3) {
      titletext = "Your morpheme visualizer will appear here after you have synced.";
    }
    //A label for the current year.
    var title = svg.append("text")
      .attr("class", "vis-title")
      .attr("dy", "1em")
      .attr("dx", "1em")
      .style("fill", "#cccccc")
    //    .attr("transform", "translate(" + x(1) + "," + y(1) + ")scale(-1,-1)")
    .text(titletext);

    var tooltip = null;

    //d3.json("./libs/rules.json", function(json) {
    force
      .nodes(json.nodes)
      .links(json.links)
      .start();

    var link = svg.selectAll("line.link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
        return Math.sqrt(d.value);
      });

    var node = svg.selectAll("circle.node")
      .data(json.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) {
        return color(d.length);
      })
      .on("mouseover", function(d) {
        tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "visible")
          .style("color", "#fff")
          .text(d.name);
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      })
      .on("click", function(d) {
        /* show the morpheme as a search result so the user can use the viz to explore the corpus*/
        if (window.app && window.app.router) {
          // window.app.router.showEmbeddedSearch(pouchname, "morphemes:"+d.name);
          var url = "corpus/" + pouchname + "/search/" + "morphemes:" + d.name;
          // window.location.replace(url);    
          window.app.router.navigate(url, {
            trigger: true
          });

        }
      })
      .call(force.drag);

    node.append("title")
      .text(function(d) {
        return d.name;
      });

    force.on("tick", function() {
      link.attr("x1", function(d) {
        return d.source.x;
      })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node.attr("cx", function(d) {
        return d.x;
      })
        .attr("cy", function(d) {
          return d.y;
        });
    });
    //});
  };
  return this;
};
  exports.Glosser = Glosser;


}(typeof exports === 'object' && exports || this));
