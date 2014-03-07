var bind = require("frb/bind");
var SortedMap = require("collections/sorted-map");
var UniqueSet = require("collections/set");

(function(exports) {

  var Lexicon = function(values, equals, compare, getDefault) {
    console.log("\tConstructing Lexicon... ");
    // SortedMap.apply(this, [values, equals, compare, getDefault]);
    SortedMap.apply(this, Array.prototype.slice.call(arguments, 1));
    // if (!compare) {
    //   this.contentCompare = this.__proto__.igtCompare;
    // }
    // if (!equals) {
    //   this.contentEquals = this.__proto__.igtEqual;
    // }
  };

  Lexicon.prototype = Object.create(SortedMap.prototype, {
    constructor: {
      value: Lexicon
    },
    expandedIGTFields: {
      value: ["morphemes", "gloss", "allomorphy", "phonetic"]
    },
    igtEqual: {
      value: function(a, b) {
        var equal = false;
        var field;

        for (field in a.igt) {
          if (a.igt.hasOwnProperty(field)) {
            if (a.igt[field] === b.igt[field]) {
              equal = true;
            }
          }
        }
        return equal;
      }
    },
    sortBy: {
      value: "morphemes"
    },
    contentEquals: {
      value: function(a, b) {
        this.igtEqual(a, b);
      },
      writable: true
    },
    contentCompare: {
      value: function(a, b) {
        this.igtCompare(a, b);
      },
      writable: true
    },
    igtCompare: {
      value: function(a, b) {
        var equal = false;
        var result = 0;
        if ((typeof(a.igt[this.sortBy]) === 'number') && (typeof(b.igt[this.sortBy]) === 'number')) {
          result = a.igt[this.sortBy] - b.igt[this.sortBy];
        } else if ((typeof(a.igt[this.sortBy]) === 'string') && (typeof(b.igt[this.sortBy]) === 'string')) {
          if (a.igt[this.sortBy] < b.igt[this.sortBy]) {
            result = -1;
          } else if (a.igt[this.sortBy] > b.igt[this.sortBy]) {
            result = 1;
          } else {
            result = 0;
          }
        } else if (typeof(a.igt[this.sortBy]) === 'string') {
          result = 1;
        } else {
          result = -1;
        }
        return result;
      }
    },
    bindToView: {
      value: function() {
        var element,
          binding,
          bindings = [],
          entryvalue,
          entrykey,
          entries,
          entry,
          entryIndex,
          listElement,
          listItem,
          fieldLabelElement,
          fieldElement,
          fieldList,
          headword,
          definition,
          contexts,
          field,
          classList;

        element = this.element;
        if (!element) {
          return;
        }
        listElement = document.createElement("ul");
        entries = this.entries();
        for (entryIndex in entries) {
          // entrykey = entries[entryIndex][0];
          entryvalue = entries[entryIndex][0];
          listItem = document.createElement("li");
          binding = bind(listItem, "__data__", {
            "<->": "igt",
            "source": entryvalue
          });
          bindings.push(binding);

          headword = document.createElement("span");
          headword.contentEditable = 'true';
          headword.classList.add("headword");
          definition = document.createElement("span");
          definition.contentEditable = 'true';
          definition.classList.add("definition");
          fieldList = document.createElement("dl");
          for (field in entryvalue.igt) {
            if (entryvalue.igt.hasOwnProperty(field)) {
              if (field === "discussion") {
                continue;
              }
              headword.classList.add(field + ":" + entryvalue.igt[field]);
              definition.classList.add(field + ":" + entryvalue.igt[field]);

              fieldLabelElement = document.createElement("dt");
              fieldLabelElement.innerHTML = field;
              fieldLabelElement.classList.add("fieldlabel");
              fieldLabelElement.classList.add(field);
              fieldLabelElement.classList.add(entryvalue.igt[field]);
              fieldList.appendChild(fieldLabelElement);

              fieldElement = document.createElement("dd");
              fieldElement.contentEditable = 'true';
              fieldElement.classList.add("fieldvalue");
              fieldElement.classList.add(field);
              fieldElement.classList.add(entryvalue.igt[field]);
              fieldList.appendChild(fieldElement);
              binding = bind(fieldElement, "innerHTML", {
                "<->": "igt." + field,
                "source": entryvalue
              });
              bindings.push(binding);
            }
          }
          binding = bind(headword, "innerHTML", {
            "<->": "igt.morphemes",
            "source": entryvalue
          });
          entryvalue.igt.discussion = entryvalue.igt.discussion || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          binding = bind(definition, "innerHTML", {
            "<->": "igt.discussion",
            "source": entryvalue
          });
          bindings.push(binding);
          listItem.appendChild(headword);
          listItem.appendChild(definition);
          listItem.appendChild(fieldList);
          listItem.style.opacity = entryvalue.igt.confidence;

          // contexts = document.createElement("span");
          // binding = bind(contexts, "innerHTML", {
          //   "<->": "contexts.toObject",
          //   "source": entryvalue
          // });
          // bindings.push(binding);
          // listItem.appendChild(contexts);
          listElement.appendChild(listItem);
        }
        element.appendChild(listElement);

        // var model = {
        //   content: "Hello, World!"
        // };
        // if (options && options.lexiconElement) {

        // }
        // var cancelBinding = bind(document, "body.innerHTML", {
        //   "<-": "content",
        //   "source": model
        // });

        // model.content = "Farewell hi.";
        // cancelBinding();

      }
    },
    /**
     * Takes as a parameters an array of this.precedenceRelations which came from CouchDB precedence rule query.
     * Example Rule: {"key":{"x":"@","relation":"preceeds","y":"aqtu","context":"aqtu-nay-wa-n"},"value":2}
     */
    generatePrecedenceForceDirectedRulesJsonForD3: {
      value: function(dontConnectWordBoundaries) {
        /*
         * Cycle through the precedence rules, convert them into graph edges with the morpheme index in the morpheme array as the source/target values
         */
        var morphemeLinks = [];
        var morphemes = {};


        /*
         * Create the JSON required by D3
         */
        var precedenceGraph = {
          links: morphemeLinks,
          nodes: morphemes
        };
        this.precedenceGraph = precedenceGraph;

        return precedenceGraph;
      }
    }
  });

  var LexiconFactory = function(options) {
    // var lex = new Lexicon(null, Lexicon.prototype.igtEqual, Lexicon.prototype.igtCompare);
    var lex = new Lexicon();
    lex.precedenceRelations = new UniqueSet();
    if (options.precedenceRelations) {
      for (var i in options.precedenceRelations) {
        if (!options.precedenceRelations[i].key.previous || !options.precedenceRelations[i].key.subsequent) {
          console.log("skipping ", options.precedenceRelations[i].key);
          continue;
        }
        if (!options.precedenceRelations[i].key.previous.morphemes || !options.precedenceRelations[i].key.subsequent.morphemes) {
          console.log("skipping ", options.precedenceRelations[i].key);
          continue;
        }
        /* make the @ more like what a linguist recognizes for  word boundaries */
        if (options.precedenceRelations[i].key.previous.morphemes === "@") {
          if (options.dontConnectWordBoundaries) {
            continue;
          }
          options.precedenceRelations[i].key.previous.morphemes = "#_";
        }
        if (options.precedenceRelations[i].key.subsequent.morphemes === "@") {
          if (options.dontConnectWordBoundaries) {
            continue;
          }
          options.precedenceRelations[i].key.subsequent.morphemes = "_#";
        }
        // only consider immediate precedence
        if (options.precedenceRelations[i].key.distance > 1) {
          continue;
        }
        // only consider -> relations 
        if (options.precedenceRelations[i].key.relation !== "precedes") {
          continue;
        }
        // only confident morphemes 
        if (options.precedenceRelations[i].key.previous.confidence !== 1 || options.precedenceRelations[i].key.subsequent.confidence !== 1) {
          // continue;
        }
        //Add source target and value to the link
        // options.precedenceRelations[i].key.source = options.precedenceRelations[i].key.previous;
        // options.precedenceRelations[i].key.target = options.precedenceRelations[i].key.subsequent;
        options.precedenceRelations[i].key.utteranceContext = options.precedenceRelations[i].value;
        options.precedenceRelations[i].key.datumid = options.precedenceRelations[i].id;

        // Put the previous and subsequent morphemes into the morpheme nodes
        lex.add(options.precedenceRelations[i].key.context, {
          igt: options.precedenceRelations[i].key.previous
        });

        lex.add(options.precedenceRelations[i].key.context, {
          igt: options.precedenceRelations[i].key.subsequent
        });

        //To avoid loops
        if (options.precedenceRelations[i].key.subsequent.morphemes.indexOf("@") === -1) {
          lex.precedenceRelations.add(options.precedenceRelations[i].key);
        }
      }
    }

    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        lex[property] = options[property];
      }
    }
    return lex;
  };
  exports.Lexicon = Lexicon;
  global.Lexicon = Lexicon;

  exports.LexiconFactory = LexiconFactory;
  global.LexiconFactory = LexiconFactory;

}(typeof exports === 'object' && exports || this));
