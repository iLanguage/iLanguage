(function(exports) {
  // var ObservableDOM = require("frb/dom"); // add support for content editable
  // var Bindings = require("frb/bindings");
  var SortedSet = exports.SortedSet || require("collections/sorted-set");
  var UniqueSet = exports.Set || require("collections/set");
  var CORS = exports.FieldDB ? exports.FieldDB.CORS : require("fielddb/api/CORS").CORS;
  var Q = exports.FieldDB ? exports.FieldDB.Q : require("q");
  var NonContentWords = exports.NonContentWords || require('./NonContentWords').NonContentWords;
  var LexemeFrequency = exports.LexemeFrequency || require('./LexemeFrequency').LexemeFrequency;
  var MorphemeSegmenter = exports.MorphemeSegmenter || require('./MorphemeSegmenter').MorphemeSegmenter;

  var maxLexiconSize = 1000;

  var LexiconNode = function(options) {
    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        this[property] = options[property];
      }
    }
    this.igtBeforeCleaning = JSON.parse(JSON.stringify(options.igt));
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

        if (!a.igt || !b.igt) {
          equal = false;
          return equal;
        }

        for (fieldIndex in this.expandedIGTFields) {
          field = this.expandedIGTFields[fieldIndex];
          if (a.igt.hasOwnProperty(field)) {
            // console.log(a);
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
    },
    clean: {
      value: function() {
        console.log("Preparing datum with this lexical entry to be cleaned...");
        var deffered = Q.defer();
        this.cleanedData = [];
        var promises = [];
        var self = this;
        this.proposedChanges = [];

        var successFunction = function(doc) {
          console.log(doc);
          doc.datumFields.map(function(datumField) {
            if (self.igtBeforeCleaning[datumField.label] !== self.igt[datumField.label] && (new RegExp(self.igtBeforeCleaning[datumField.label], "i")).test(datumField.mask)) {
              var change = {
                before: datumField.mask + ""
              };
              // TODO this makes things lower case... because part of the map reduce seems to be doing that...
              datumField.mask = datumField.mask.replace(new RegExp(self.igtBeforeCleaning[datumField.label], "ig"), self.igt[datumField.label]);
              datumField.value = datumField.mask;
              change.after = datumField.mask;
              self.proposedChanges.push(change);
              return datumField;
            }
          });
          self.cleanedData.push(doc);
        };
        var failFunction = function(reason) {
          console.log(reason);
        };

        for (var idIndex = 0; idIndex < this.datumids.length; idIndex++) {
          console.log(this.datumids.length[idIndex]);
          promises[idIndex] = CORS.makeCORSRequest({
            method: 'GET',
            dataType: 'json',
            url: this.url + "/" + this.datumids[idIndex]
          });
          promises[idIndex].then(successFunction).fail(failFunction);
        }
        Q.allSettled(promises).then(function(results) {
          deffered.resolve(self.proposedChanges);
        });
        return deffered.promise;
      }
    },
    save: {
      value: function() {
        var deffered = Q.defer(),
          promises = [];

        console.log("Saving cleaned datum...");
        while (this.cleanedData.length > 0) {
          var cleanedDatum = this.cleanedData.pop();
          promises.push(CORS.makeCORSRequest({
            method: 'PUT',
            dataType: 'json',
            data: cleanedDatum,
            url: this.url + "/" + cleanedDatum._id
          }));
        }
        Q.allSettled(promises).then(function(results) {
          console.log("Saving results: ", results);
          deffered.resolve(results);
        });
        return deffered.promise;
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

    toJSON: {
      value: function() {
        return JSON.stringify(this.toObject(), null, 2);
      }
    },
    getLexicalEntries: {
      value: function(lexicalEntryToMatch) {
        var deffered = Q.defer(),
          matches = [],
          self = this;

        if (!lexicalEntryToMatch) {
          deffered.resolve(matches);
        } else {
          this.filter(function(value, key, object, depth) {
            console.log(key + " of " + self.length);
            if (typeof lexicalEntryToMatch.equals === "function") {
              if (lexicalEntryToMatch.equals(value)) {
                matches.push(value);
                console.log(value);
              }
            } else {
              var howWellDoesThisMatch = 0;
              lexicalEntryToMatch = lexicalEntryToMatch.trim();
              for (var attr in value.igt) {
                if (value.igt.hasOwnProperty(attr) && value.igt[attr] === lexicalEntryToMatch) {
                  howWellDoesThisMatch = howWellDoesThisMatch + 1;
                }
              }
              if (howWellDoesThisMatch > 0) {
                matches.push(value);
                console.log(value);
              }
            }
            if (key === self.length - 1) {
              deffered.resolve(matches);
            }
          }, this);
        }
        return deffered.promise;
      }
    },

    guessContextSensitiveGlosses: {
      value: function(datum) {

        if (!datum.morphemes) {
          console.warn("There was no morphemes line to guess the gloss from...");
          return datum;
        }
        var glossGroups = [];
        var matchingNodes = [];
        var morphemeToFind = "";
        var morphemeGroup = datum.morphemes.split(/ +/);
        var matchingfunction = function(node) {
          if (node.igt.morphemes === morphemeToFind) {
            console.log(node);
            matchingNodes.push(node);
          }
        };
        for (var group in morphemeGroup) {
          var morphemes = morphemeGroup[group].split("-");
          var glosses = [];
          for (var m in morphemes) {
            if (!morphemes.hasOwnProperty(m)) {
              continue;
            }
            matchingNodes = [];
            morphemeToFind = morphemes[m];
            this.filter(matchingfunction);

            var gloss = "?"; // If there's no matching gloss, use question marks
            if (matchingNodes && matchingNodes.length > 0) {
              // Take the first gloss for this morpheme
              console.log("Glosses which match: " + morphemes[m], matchingNodes);
              try {
                gloss = matchingNodes[0].igt.gloss;
              } catch (e) {
                console.log(matchingNodes);
              }
            }
            glosses.push(gloss);
          }

          glossGroups.push(glosses.join("-"));
        }
        datum.glossAlternates = datum.glossAlternates ? datum.glossAlternates.concat(glossGroups) : glossGroups;
        datum.gloss = glossGroups.join(" ");
        // Replace the gloss line with the guessed glosses
        return datum;
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
    if (options.precedenceRelations && options.precedenceRelations.length > 0) {
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
            utteranceContext: [options.precedenceRelations[i].key.context.utterance],
            url: options.url
          }));

          // lex.add(options.precedenceRelations[i].key.context.utterance, new LexiconNode({
          //   igt: options.precedenceRelations[i].key.previous
          // }));
          lex.add(new LexiconNode({
            igt: options.precedenceRelations[i].key.subsequent,
            datumids: [options.precedenceRelations[i].key.context.id],
            utteranceContext: [options.precedenceRelations[i].key.context.utterance],
            url: options.url
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

    if (options.orthography) {
      if (options.nonContentWordsArray) {
        options.userSpecifiedNonContentWords = true;
        if (Object.prototype.toString.call(options.nonContentWordsArray) === '[object Array]' && options.nonContentWordsArray.length === 0) {
          options.userSpecifiedNonContentWords = false;
          console.log("User sent an empty array of non content words, attempting to automatically detect them");
        }
        // else if (options.nonContentWordsArray.trim && !options.nonContentWordsArray.trim()) {
        //   options.userSpecifiedNonContentWords = false;
        // }
      }
      NonContentWords.processNonContentWords(options);

      for (var wordIndex in options.wordFrequencies) {
        if (!options.wordFrequencies.hasOwnProperty(wordIndex)) {
          continue;
        }
        var word = options.wordFrequencies[wordIndex].orthography;
        var count = options.wordFrequencies[wordIndex].count;
        var categories = options.wordFrequencies[wordIndex].categories;
        if (lex.length > maxLexiconSize) {
          continue;
        }
        lex.add(new LexiconNode({
          igt: {
            orthography: word,
            utterance: word,
            morphemes: word,
            gloss: word,
          },
          categories: categories,
          datumids: [options._id],
          count: count,
          utteranceContext: [word],
          url: options.url
        }));

      }
    }

    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        lex[property] = options[property];
      }
    }
    return lex;
  };
  Lexicon.NonContentWords = NonContentWords;
  Lexicon.LexemeFrequency = LexemeFrequency;
  Lexicon.LexiconNode = LexiconNode;
  Lexicon.LexiconFactory = LexiconFactory;
  Lexicon.MorphemeSegmenter = MorphemeSegmenter;

  exports.Lexicon = Lexicon;
  try {
    global.Lexicon = Lexicon;
    global.LexiconFactory = LexiconFactory;
  } catch (e) {
    console.log(e);
  }

  exports.LexiconFactory = LexiconFactory;

  // }(typeof exports === 'object' && exports || this));
})(typeof exports === 'undefined' ? this : exports);