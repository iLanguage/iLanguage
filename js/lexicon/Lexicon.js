(function(exports) {
  /* globals FieldDB, alert */
  var NonContentWords = exports.NonContentWords || require('./NonContentWords').NonContentWords;
  var LexemeFrequency = exports.LexemeFrequency || require('./LexemeFrequency').LexemeFrequency;
  var MorphemeSegmenter = exports.MorphemeSegmenter || require('./MorphemeSegmenter').MorphemeSegmenter;
  var Q = Q || exports.FieldDB ? exports.FieldDB.Q : require("q");
  var FieldDB = FieldDB || exports.FieldDB || require('FieldDB');
  var BASEOBJECT = Object;
  try {
    BASEOBJECT = FieldDB.FieldDB ? FieldDB.FieldDB.FieldDBObject : FieldDB.FieldDBObject;
  } catch (exception) {
    console.warn("Using Object as base object");
  }
  // Accept injected Lexicon functionality
  var BASE_LEXICON = BASEOBJECT;
  var BASE_LEXICON_NODE = BASE_LEXICON.LexiconNode || BASEOBJECT;
  var BASE_LEXICON_FACTORY = BASE_LEXICON.LexiconFactory || function(options) {
    BASEOBJECT.warn("No lexicon factory was injected. This lexicon will not accept precedence rules or word frequencies.");
    var lex = new Lexicon(options);
    if (lex.orthography && (!lex.wordFrequencies || lex.wordFrequencies.length === 0) && typeof Lexicon.bootstrapLexicon === "function") {
      Lexicon.bootstrapLexicon(lex);

      lex.wordFrequencies = lex.wordFrequencies || [];

      for (var wordIndex in lex.wordFrequencies) {
        if (!lex.wordFrequencies.hasOwnProperty(wordIndex)) {
          continue;
        }
        var word = lex.wordFrequencies[wordIndex];
        if (typeof word === "string") {
          word = {
            orthography: word
          };
        }
        /* accept Datum as words */
        if (!word.fields && word.fields) {
          word.fields = word.fields;
        }
        if (!word.fields) {
          word.fields = {};
        }
        if (word.orthography && !word.fields.orthography) {
          word.fields.orthography = word.orthography;
          delete word.orthography;
        }
        word.count = word.count || 0;
        word.categories = word.categories || [];
        word.datumids = word.datumids || word.docids || [];
        if (lex._id) {
          word.datumids.push(lex._id);
        }
        if (lex.url) {
          word.url = lex.url;
        }
        if (lex.length > Lexicon.maxLexiconSize) {
          console.warn("Ignoring lexical entry (lexicon has reached max size " + Lexicon.maxLexiconSize + ") ", word);
          continue;
        }
        lex.add(new LexiconNode(word));
      }
    }

    return lex;
  };

  try {
    // // BASE_LEXICON = require('fielddb-glosser/lib/Lexicon').Lexicon;
    // BASE_LEXICON_NODE = BASE_LEXICON.LexiconNode;
    // BASE_LEXICON_FACTORY = BASE_LEXICON.LexiconFactory;
  } catch (exception) {
    console.warn("Can't use fielddb-glosser, its probably not availible");
  }

  var LexiconNode = function(options) {
    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        this[property] = options[property];
      }
    }
    BASE_LEXICON_NODE.call(this);
  };
  LexiconNode.prototype = Object.create(BASE_LEXICON_NODE.prototype, {
    constructor: {
      value: LexiconNode
    }
  });

  var Lexicon = function(options) {
    this.collection = options.collection || [];
    for (var property in options) {
      if (options.hasOwnProperty(property)) {
        this[property] = options[property];
      }
    }
    console.log('BASE_LEXICON', BASE_LEXICON.prototype);
    BASE_LEXICON.call(this);
  };
  Lexicon.prototype = Object.create(BASE_LEXICON.prototype, {
    constructor: {
      value: Lexicon
    },

    length: {
      get: function() {
        return this.collection.length;
      },
      set: function() {}
    },

    add: {
      value: function(item) {
        this.collection.unshift(item);
      }
    },

    getLexicalEntries: {
      value: function(lexicalEntryToMatch) {
        if (BASE_LEXICON.prototype.getLexicalEntries) {
          this.debug("Calling super getLexicalEntries");
          return BASE_LEXICON.prototype.getLexicalEntries(this, arguments);
        }

        var deffered = Q.defer(),
          matches = [],
          self = this;

        this.debug("Getting matching entrys for ", lexicalEntryToMatch, " from ", this.collection);

        if (!lexicalEntryToMatch) {
          deffered.resolve(matches);
        } else {
          this.collection.map(function(entry) {
            if (!entry || !entry.fields) {
              return;
            }
            var orthographyToMatch = lexicalEntryToMatch;
            if (orthographyToMatch.fields && orthographyToMatch.fields.orthography) {
              orthographyToMatch = orthographyToMatch.fields.orthography;
            } else if (orthographyToMatch.orthography) {
              orthographyToMatch = orthographyToMatch.orthography;
            }

            if (entry.fields.orthography === orthographyToMatch) {
              matches.unshift(entry);
            } else {
              self.debug("This entry ", entry, "doesnt match", lexicalEntryToMatch);
            }
          });
        }
        deffered.resolve(matches);

        return deffered.promise;
      }
    }
  });


  var LexiconFactory = function(options) {
    var lex = BASE_LEXICON_FACTORY.apply(this, [options]);

    console.log(lex.length);
    return lex;
  };

  Lexicon.NonContentWords = NonContentWords;
  Lexicon.LexemeFrequency = LexemeFrequency;
  Lexicon.LexiconNode = LexiconNode;
  Lexicon.LexiconFactory = LexiconFactory;
  Lexicon.MorphemeSegmenter = MorphemeSegmenter;
  Lexicon.maxLexiconSize = BASE_LEXICON.maxLexiconSize || 10000;
  Lexicon.bootstrapLexicon = BASE_LEXICON.bootstrapLexicon = Lexicon.LexemeFrequency.calculateNonContentWords;

  exports.Lexicon = Lexicon;
  try {
    global.Lexicon = Lexicon;
  } catch (e) {
    console.log(e);
  }

  // }(typeof exports === 'object' && exports || this));
})(typeof exports === 'undefined' ? this : exports);
