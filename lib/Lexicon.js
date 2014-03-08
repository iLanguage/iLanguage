var bind = require("frb/bind");
var SortedSet = require("collections/sorted-set");
var UniqueSet = require("collections/set");

(function(exports) {


  var LexiconNode = function(options) {
    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        this[property] = options[property];
      }
    }
    Object.call(this);
  };

  LexiconNode.prototype = Object.create(Object.prototype, {
    constructor: {
      value: LexiconNode
    },
    equals: {
      value: function(b) {
        var a = this;
        var equal = false;
        var fieldIndex;
        var field;

        for (fieldIndex in this.expandedIGTFields) {
          field = this.expandedIGTFields[fieldIndex];
          if (a.igt.hasOwnProperty(field)) {
            if (a.igt[field] === b.igt[field]) {
              equal = true;
            }
          }
        }
        // If the nodes are "equal" then make sure they have the same combineFieldsIfEqual
        if (equal) {
          for (fieldIndex in this.combineFieldsIfEqual) {
            field = this.combineFieldsIfEqual[fieldIndex];
            if (a.hasOwnProperty(field)) {
              tmpArray = [];
              a[field] = a[field].concat(b[field]);
              a[field].map(function(item) {
                if (tmpArray.indexOf(item) === -1) {
                  tmpArray.push(item);
                }
              });
              a[field] = tmpArray;
              b[field] = tmpArray;
            }
          }
          if (a.confidence && b.confidence) {
            a.confidence = (parseFloat(a.confidence, 10) + parseFloat(b.confidence, 10)) / 2;
          }
        }
        return equal;
      }
    },
    expandedIGTFields: {
      value: ["morphemes", "gloss", "allomorphy", "phonetic"]
    },
    combineFieldsIfEqual: {
      value: ["datumids", "utteranceContext"]
    },
    sortBy: {
      value: "morphemes",
      writable: true
    },
    compare: {
      value: function(b) {
        var a = this;
        var result = 0;
        if (!b || !b.igt || !b.igt[this.sortBy]) {
          return -1;
        }
        if (!a || !a.igt || !a.igt[this.sortBy]) {
          return 1;
        }
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
    }
  });


  var Lexicon = function(values, equals, compare, getDefault) {
    console.log("\tConstructing Lexicon... ");
    // SortedSet.apply(this, [values, equals, compare, getDefault]);
    SortedSet.apply(this, Array.prototype.slice.call(arguments, 1));
    // if (!compare) {
    //   this.contentCompare = this.__proto__.igtCompare;
    // }
    // if (!equals) {
    //   this.contentEquals = this.__proto__.igtEqual;
    // }
  };

  Lexicon.prototype = Object.create(SortedSet.prototype, {
    constructor: {
      value: Lexicon
    },
    sortBy: {
      value: "morphemes"
    },
    bindToView: {
      value: function() {
        var element,
          binding,
          bindings = [],
          entryvalue,
          entrykey,
          iterate,
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
        // iterate = this.iterate(this.min(), this.max());
        // entries = this.keys();
        this.forEach(function(entry) {
          // for(entryIndex in entries){
          // while (entryvalue = iterate.next()) {
          // entrykey = entries[entryIndex][0];
          entryvalue = entry;
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
              try{
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

              }catch(e){
                console.warn(e);
              }
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
          listItem.style.opacity = entryvalue.igt.confidence;

          contexts = document.createElement("span");
          contexts.classList.add("utteranceContext");
          binding = bind(contexts, "innerHTML", {
            "<->": "utteranceContext.join(',  ')",
            "source": entryvalue
          });
          bindings.push(binding);

          listItem.appendChild(headword);
          listItem.appendChild(contexts);
          // listItem.appendChild(definition);
          listItem.appendChild(fieldList);
          listElement.appendChild(listItem);
        });
        // }
        element.appendChild(listElement);
        binding = bind(listElement, "hidden", {
          "<-": "igt.confidence < document.getElementById('lexiconConfidenceThreshold').value / 10",
          "source": entryvalue
        });
        bindings.push(binding);


        var jsonElement = document.getElementById("lexiconJSON");
        binding = bind(jsonElement, "innerHTML", {
          "<-": "toJSON()",
          "source": this
        });
        bindings.push(binding);
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
    toJSON: {
      value: function() {
        return JSON.stringify(this.toObject(), null, 2);
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
    lex.references = new UniqueSet();
    if (options.precedenceRelations) {
      for (var i in options.precedenceRelations) {
        try{
          //Add source target and value to the link
          delete options.precedenceRelations[i].key.previous.utterance;
          delete options.precedenceRelations[i].key.subsequent.utterance;
          options.precedenceRelations[i].key.utteranceContext = options.precedenceRelations[i].key.context.utterance;
          options.precedenceRelations[i].key.datumid = options.precedenceRelations[i].id;

          // Put the previous and subsequent morphemes into the morpheme nodes
          // lex.add(options.precedenceRelations[i].key.context.utterance, new LexiconNode({
          //   igt: options.precedenceRelations[i].key.previous
          // }));
          lex.add(new LexiconNode({
            igt: options.precedenceRelations[i].key.previous,
            datumids: [options.precedenceRelations[i].key.context.id],
            utteranceContext: [options.precedenceRelations[i].key.context.utterance]
          }));

          // lex.add(options.precedenceRelations[i].key.context.utterance, new LexiconNode({
          //   igt: options.precedenceRelations[i].key.previous
          // }));
          lex.add(new LexiconNode({
            igt: options.precedenceRelations[i].key.subsequent,
            datumids: [options.precedenceRelations[i].key.context.id],
            utteranceContext: [options.precedenceRelations[i].key.context.utterance]
          }));
          lex.references.add(options.precedenceRelations[i].key.context.id);

          //To avoid loops
          if (options.precedenceRelations[i].key.subsequent.morphemes.indexOf("@") === -1) {
            lex.precedenceRelations.add(options.precedenceRelations[i].key);
          }

        }catch(e){
          console.warn(e);
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
