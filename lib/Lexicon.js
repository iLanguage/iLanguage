var ObservableDOM = require("frb/dom");
var Bindings = require("frb/bindings");
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
        var fieldIndex,
          field,
          tmpArray;

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
              /*jshint loopfunc: true */
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
            b.confidence = a.confidence;
          }
          if (a.allomorphs || b.allomorphs) {
            var allomorphs = a.allomorphs ? a.allomorphs : "";
            allomorphs = allomorphs + allomorphs ? ", " : "";
            allomorphs = allomorphs + b.allomorphs ? b.allomorphs : "";
            a.allomorphs = allomorphs;
            b.allomorphs = allomorphs;
          }
        }
        return equal;
      }
    },
    expandedIGTFields: {
      value: ["morphemes", "gloss", "allomorphy", "phonetic", "orthography"]
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
          listElement,
          entryvalue,
          entrykey,
          iterate,
          entryIndex,
          listItem,
          fieldLabelElement,
          fieldDTElement,
          fieldDDElement,
          fieldElement,
          fieldList,
          headword,
          contexts,
          field,
          classList;

        element = this.element;
        if (!element) {
          return;
        }
        listElement = document.createElement("ul");
        element.appendChild(listElement);

        this.forEach(function(entry) {
          var discussion,
            field;

          entryvalue = entry;
          if (entryvalue.igt && entryvalue.igt.morphemes === "@") {
            return;
          }

          listItem = document.createElement("li");
          listItem.style.opacity = entryvalue.igt.confidence;
          if (entryvalue.igt.morphemes) {
            listItem.id = entryvalue.igt.morphemes;
          }
          console.log("\tCreating Node view for " + listItem.id);

          headword = document.createElement("span");
          headword.contentEditable = 'true';
          headword.classList.add("headword");
          entryvalue.igt.headword = entryvalue.igt.headword || entryvalue.igt.morphemes ? entryvalue.igt.morphemes : entryvalue.igt.gloss;

          contexts = document.createElement("span");
          contexts.classList.add("utteranceContext");

          discussion = document.createElement("span");
          discussion.contentEditable = 'true';
          discussion.classList.add("discussion");
          discussion.hidden = true;
          entryvalue.igt.discussion = entryvalue.igt.discussion || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          listItem.ondblclick = function(e) {
            discussion.hidden = false;
            delete discussion.hidden;
            /* If the user double clicks a node, they can investigate its data in the console */
            window.currentlySelectedNode = e.target;
            console.log(window.currentlySelectedNode.__data__);
            var jsonElement = document.getElementById("lexiconJSON");
            jsonElement.innerHTML = JSON.stringify(e.target.__data__, null, 2);
          };

          fieldList = document.createElement("dl");

          var component = {
            listItemView: listItem,
            headwordView: headword,
            contextsView: contexts,
            discussionView: discussion,
            fieldListView: fieldList,
            fieldViews: {},
            data: entryvalue
          };

          for (field in entryvalue.igt) {
            if (entryvalue.igt.hasOwnProperty(field)) {
              if (field === "discussion" || field === "headword") {
                continue;
              }
              try {
                headword.classList.add(field + ":" + entryvalue.igt[field]);
                discussion.classList.add(field + ":" + entryvalue.igt[field]);

                fieldDTElement = document.createElement("dt");
                fieldLabelElement = document.createElement("span");
                fieldLabelElement.innerHTML = field;
                fieldLabelElement.classList.add("fieldlabel");
                fieldLabelElement.classList.add(field);
                fieldLabelElement.classList.add(entryvalue.igt[field]);
                fieldDTElement.appendChild(fieldLabelElement);
                fieldList.appendChild(fieldDTElement);

                fieldDDElement = document.createElement("dd");
                fieldElement = document.createElement("span");
                fieldElement.contentEditable = 'true';
                fieldElement.classList.add("fieldvalue");
                fieldElement.classList.add(field);
                fieldElement.classList.add(entryvalue.igt[field]);
                component.fieldViews[field] = fieldElement;
                fieldDDElement.appendChild(fieldElement);
                fieldList.appendChild(fieldDDElement);

                var viewPath = "fieldViews." + field + ".value";
                var dataPath = "data.igt." + field;
                var bindSet = {};
                bindSet[viewPath] = {
                  "<-": dataPath
                };
                var bindTwoWay = {};
                bindTwoWay[dataPath] = {
                  "<->": viewPath
                };
                Bindings.defineBindings(component, bindSet);
                Bindings.defineBindings(component, bindTwoWay);

              } catch (e) {
                console.warn(e);
              }
            }
          }

          Bindings.defineBindings(component, {
            "headwordView.value": {
              "<-": "data.igt.headword"
            },
            "discussionView.value": {
              "<-": "data.igt.discussion"
            },
            "contextsView.innerHTML": {
              "<-": "' '+data.utteranceContext.join(',')+data.utteranceContext?data.utteranceContext.length : '0'"
            },
            "listItemView.title": {
              "<-": "'Example: '+data.utteranceContext.join(' Example: ')"
            },
            "listItemView.hidden": {
              "<-": "data.igt.confidence < document.getElementById('lexiconConfidenceThreshold').value / 10"
            }
          });

          Bindings.defineBindings(component, {
            "listItemView.__data__": {
              "<->": "data"
            },
            "data.igt.headword": {
              "<->": "headwordView.value"
            },
            "data.igt.discussion": {
              "<->": "discussionView.value"
            }
          });

          listItem.appendChild(headword);
          listItem.appendChild(contexts);
          listItem.appendChild(discussion);
          listItem.appendChild(fieldList);
          listElement.appendChild(listItem);

        });

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
        try {
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

        } catch (e) {
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
