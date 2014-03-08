var d3 = d3 || require("d3");
var _ = _ || require("underscore");
var LexiconFactory = require("./Lexicon").LexiconFactory;

/*
 * FieldDBGlosser
 * https://github.com/OpenSourceFieldlinguistics/FieldDB/issues/milestones?state=closed
 *
 * Copyright (c) 2013 FieldDB contributors
 * Licensed under the Apache 2.0 license.
 */
(function(exports) {

  'use strict';

  var Glosser = function(options) {
    var XMLHttpRequestLocal;

    // let XMLHttpRequestLocal be injected
    if (options && options.XMLHttpRequestLocal) {
      XMLHttpRequestLocal = options.XMLHttpRequestLocal;
    } else {
      XMLHttpRequestLocal = window.XMLHttpRequest;
    }

    // var console = console || {
    //   log: function() {}
    // };
    var OPrime = OPrime || {
      debugMode: true,
      bug: function(message) {
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
          var xhr = new XMLHttpRequestLocal();
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
          // localStorage.setItem(pouchname + "precendenceRules", JSON.stringify(rules.rows));

          // Reduce the rules such that rules which are found in multiple source
          // words are only used/included once.
          var reducedRules = _.chain(rules.rows).groupBy(function(rule) {
            return rule.key.x + "-" + rule.key.y;
          }).value();

          // Save the reduced precedence rules in localStorage
          // localStorage.setItem(pouchname + "reducedRules", JSON.stringify(reducedRules));
          self.currentCorpusName = pouchname;
          if (typeof callback === "function") {
            callback(rules.rows);
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
      if (!unparsedUtterance) {
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
          if (node) {
            matchingNodes.push(node);
          }
          node = lexiconNodes[morphemes[m].toLowerCase()];
          if (node) {
            matchingNodes.push(node);
          }
          var gloss = "?"; // If there's no matching gloss, use question marks
          if (matchingNodes.length > 0) {
            // Take the first gloss for this morpheme
            console.log("Glosses which match: ", matchingNodes);
            try {
              gloss = matchingNodes[0][0].gloss;
            } catch (e) {
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

    this.guessUtteranceFromMorphemes = function(igt, justCopyDontGuessIGT) {
      if (!igt.utterance && igt.morphemes) {
        igt.utterance = igt.morphemes.replace(/[-.]/g, "");
      }
      return igt;
    };

    this.guessMorphemesFromUtterance = function(igt, justCopyDontGuessIGT) {
      if (igt.morphemes) {
        return igt;
      }
      igt.morphemes = this.morphemefinder(igt.utterance, igt.pouchname, justCopyDontGuessIGT);
      if (!igt.gloss) {
        igt.gloss = this.glossFinder(igt.morphemes, igt.pouchname, justCopyDontGuessIGT);
      }
      return igt;
    };

    this.guessGlossFromMorphemes = function(igt, justCopyDontGuessIGT) {
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
      var lineColor = d3.scale.linear()
        .range(['#FFFFF', '#FFFF00']) // or use hex values
      .domain([1, 8]);

      var x = d3.scale.linear()
        .range([0, width]);

      var y = d3.scale.linear()
        .range([0, height - 40]);

      var force = d3.layout.force()
        .charge(-120)
      // .linkStrength(0.2)
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
        .style("stroke", function(d) {
          return lineColor(d.value);
        })
        .style("stroke-width", function(d) {
          return d.value;
        });

      var node = svg.selectAll("circle.node")
        .data(json.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .attr("data-details", function(d) {
          return d;
        })
        .style("fill", function(d) {
          if (d.igt.morphemes === "#_") {
            return '#00000';
          }
          if (d.igt.morphemes === "_#") {
            return '#ffffff';
          }
          return color(d.length);
        })
        .on("mouseover", function(d) {
          tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "visible")
            .style("color", "#fff")
            .text(d.igt.morphemes);
        })
        .on("mouseout", function() {
          tooltip.style("visibility", "hidden");
        })
        .on("click", function(d) {
          /* show the morpheme as a search result so the user can use the viz to explore the corpus*/
          if (window.app && window.app.router) {
            // window.app.router.showEmbeddedSearch(pouchname, "morphemes:"+d.igt.morphemes);
            var url = "corpus/" + pouchname + "/search/" + "morphemes:" + d.igt.morphemes;
            // window.location.replace(url);    
            window.app.router.navigate(url, {
              trigger: true
            });

          }
        })
        .call(force.drag);

      node.append("title")
        .text(function(d) {
          return d.igt.morphemes;
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

    /**
     * http://bl.ocks.org/mbostock/1153292
     * http://alignedleft.com/tutorials/d3/binding-data
     *
     * @param  {[type]} rulesGraph [description]
     * @param  {[type]} divElement [description]
     * @param  {[type]} pouchname  [description]
     * @return {[type]}            [description]
     */
    this.visualizePrecedenceRelationsAsForceDirectedGraph = function(lexicon, divElement, dontConnectOnWordBoundaries) {

      var precedenceGraph = {
        links: [],
        nodes: []
      };

      lexicon.precedenceGraph = lexicon.precedenceRelations.filter(function(relation) {
        if (!relation.key.previous || !relation.key.subsequent) {
          // console.log("skipping ", relation.key);
          return;
        }
        if (!relation.key.previous.morphemes || !relation.key.subsequent.morphemes) {
          // console.log("skipping ", relation.key);
          return;
        }
        /* make the @ more like what a linguist recognizes for  word boundaries */
        if (relation.key.previous.morphemes === "@") {
          if (dontConnectOnWordBoundaries) {
            return;
          }
          relation.key.previous.morphemes = "#_";
        }
        if (relation.key.subsequent.morphemes === "@") {
          if (dontConnectOnWordBoundaries) {
            return;
          }
          relation.key.subsequent.morphemes = "_#";
        }
        // only consider immediate precedence
        if (relation.key.distance > 1) {
          return;
        }
        // only consider -> relations 
        if (relation.key.relation !== "precedes") {
          return;
        }
        // only confident morphemes 
        if (relation.key.previous.confidence !== 1 || relation.key.subsequent.confidence !== 1) {
          return;
        }
        relation.key.source = relation.key.previous;
        relation.key.target = relation.key.subsequent;
        precedenceGraph.links.push(relation.key);
      });
      lexicon.precedenceGraph = precedenceGraph;

      if (!lexicon.precedenceGraph) {
        return;
      }
      if (lexicon.precedenceGraph.links.length === 0) {
        return;
      }

      var width = divElement.clientWidth,
        height = 600;

      // Get the complete node for the links.
      lexicon.precedenceGraph.links.forEach(function(link) {
        link.source = lexicon.precedenceGraph.nodes[link.source.morphemes] || (lexicon.precedenceGraph.nodes[link.source.morphemes] = {
          igt: link.source
        });
        link.target = lexicon.precedenceGraph.nodes[link.target.morphemes] || (lexicon.precedenceGraph.nodes[link.target.morphemes] = {
          igt: link.target
        });
      });

      var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .html("");

      var linkArc = function(d) {
        var dx = d.source.x - d.target.x,
          dy = d.source.y - d.target.y,
          dr = Math.sqrt(dx * dx + dy * dy); //uncomment to curve the lines
        // dr = 0;
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      };

      var transform = function(d) {
        if (d.igt.morphemes === "_#") {
          d.x = width - 20;
          d.y = height / 2;
        }
        if (d.igt.morphemes === "#_") {
          d.x = 20;
          d.y = height / 2;
        }
        return "translate(" + d.x + "," + d.y + ")";
      };

      /*
      Short morphemes will be blue, long will be red 
      */
      var color = d3.scale.linear()
        .range(['darkblue', 'darkred']) // or use hex values
      .domain([1, 8]);

      var lineColor = d3.scale.linear()
        .range(['#FFFFF', '#FFFF00']) // or use hex values
      .domain([1, 8]);

      // var force = d3.layout.force()
      //   .charge(-120)
      //   .linkStrength(0.2)
      //   .linkDistance(30)
      //   .size([width, height]);

      var force = d3.layout.force()
        .nodes(d3.values(lexicon.precedenceGraph.nodes))
        .links(lexicon.precedenceGraph.links)
        .size([width, height])
        .linkStrength(0.5)
        .linkDistance(60)
        .charge(-400);

      var svg = d3.select(divElement).append("svg")
        .attr("width", width)
        .attr("height", height);

      // Per-type markers, as they don't inherit styles.
      svg.append("defs").selectAll("marker")
        .data(["precedes"])
      // .data(["suit", "licensing", "resolved"])
      .enter()
        .append("marker")
        .attr("id", function(d) {
          return d;
        })
        .style("opacity", function(d) {
          // return color(d.igt.morphemes.length);
          return 0.5;
        })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

      var path = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class", function(d) {
          return "link " + d.relation + " distance" + d.distance;
        })
        .attr("marker-end", function(d) {
          return "url(#" + d.relation + ")";
        });

      var circle = svg.append("g").selectAll("circle")
        .data(force.nodes())
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d) {
          if (d.igt.morphemes === "#_") {
            return '#00000';
          }
          if (d.igt.morphemes === "_#") {
            return '#ffffff';
          }
          return color(d.igt.morphemes.length);
          // return color(d.igt.confidence * 10);
        })
        .style("opacity", function(d) {
          // return color(d.igt.morphemes.length);
          return d.igt.confidence ? d.igt.confidence / 2 : 1;
        })
        .on("mouseover", function(object) {
          var findNode = document.getElementById(object.igt.morphemes);
          if (findNode) {
            findNode = findNode.innerHTML + "<p>" + findNode.getAttribute("title") + "<p>";
          } else {
            findNode = "Morpheme: " + object.igt.morphemes + "<br/> Gloss: " + object.igt.gloss + "<br/> Confidence: " + object.igt.confidence;
          }
          return tooltip
            .style("visibility", "visible")
            .html("<div class='node_details_tooltip lexicon'>" + findNode + "</div>");
        })
        .on("mousemove", function(object) {
          /*global  event */
          return tooltip.style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function(object) {
          return tooltip
            .style("visibility", "hidden");
        })
        .on("click", function(d) {
          /* show the morpheme as a search result so the user can use the viz to explore the corpus*/
          if (window.app && window.app.router) {
            // window.app.router.showEmbeddedSearch(pouchname, "morphemes:"+d.igt.morphemes);
            var url = "corpus/" + lexicon.pouchname + "/search/" + "morphemes:" + d.igt.morphemes;
            // window.location.replace(url);    
            window.app.router.navigate(url, {
              trigger: true
            });

          }
        })
        .call(force.drag);

      var text = svg.append("g").selectAll("text")
        .data(force.nodes())
        .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .style("opacity", function(d) {
          // return color(d.igt.morphemes.length);
          return d.igt.confidence ? d.igt.confidence / 2 : 1;
        })
        .style("color", function(d) {
          if (d.igt.morphemes === "#_") {
            return '#00000';
          }
          if (d.igt.morphemes === "_#") {
            return '#ffffff';
          }
          return color(d.igt.morphemes.length);
          // return color(d.igt.confidence * 10);
        })
        .text(function(d) {
          return d.igt.morphemes;
        });


      // Use elliptical arc path segments to doubly-encode directionality.
      var tick = function() {
        path.attr("d", linkArc);
        circle.attr("transform", transform);
        text.attr("transform", transform);
      };

      force
        .on("tick", tick)
        .start();


    };
    return this;
  };
  exports.Glosser = Glosser;
  global.Glosser = Glosser;

}(typeof exports === 'object' && exports || this));
