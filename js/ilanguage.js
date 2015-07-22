(function(exports) {
  /* globals globals */
  "use strict";

  exports.Corpus = exports.Corpus || require('./corpus/Corpus').Corpus;
  exports.Lexicon = exports.Lexicon || require('./lexicon/Lexicon').Lexicon;

  var BASEOBJECT = Object;
  try {
    if (FieldDB && FieldDB.FieldDBObject) {
      BASEOBJECT = FieldDB.FieldDBObject;
    }
  } catch (exception) {
    console.warn("Using Object as base object");
  }

  /**
   * @class A model of an I-Language (the data of one homogenous individual) 
   * as opposed to a model of an E-Language (a colection of data samples spoken by individuals 
   * who identify as speaking the same language).
   *
   * I-Language Examples:
   *  - Your dialect of English when you are spending time with friends
   *  - Your dialect of English when you are doing public speaking
   *
   * E-Language Examples:
   *  - English
   *  - Inuktitut
   *  - Arabic
   *  - Malay
   *  - Spanish
   *  - Hindi/Urdu 
   *
   * E-Languages are a collection of I-Languages. I-Languages are usually more internally
   * consistant and as such are more welcoming to statistical modeling since we don't 
   * have to average over diverse behavior we can use a smaller sample size.
   *
   * There is a textbook about I-language if you would like more info:
   *  http://linguistics.concordia.ca/I-language/isac_reiss_chapter1.pdf
   *  
   *    "An I-language is a computational system that is encoded in, or 
   *     a property of, an individual brain."
   * 
   *    "The I-language approach to linguistics thus [models] individual mental grammars, 
   *    entities that are internal to each person. In addition to these two words 
   *    beginning with the letter I, there is a third relevant term implicit in 
   *    the notion of a grammar as a system of rules or patterns. In mathematics a 
   *    set can be defined extensionally, by listing its members, or intensionally, 
   *    by providing a formula or description that characterizes all and only the 
   *    members of the set."
   *
   * @param {Object} options Optional json initialization object
   * @property {String} dbname This is the identifier of the corpus, it is set when
   *           a corpus is created. It must be a file safe name which means it is
   *           [a-z] with no uppercase letters or symbols, by convention it cannot 
   *           contain -, but _ is acceptable.
   
   * @extends Object
   * @tutorial test/ilanguage-spec.js
   */
  var ILanguage = function ILanguage(json) {
    if (json && (json instanceof this.constructor || json.constructor.toString() === this.constructor.toString())) {
      json.warn("This was already the right type, not converting it.");
      return json;
    }
    if (json && typeof json === "string") {
      json = {
        orthography: json
      };
    }
    if (!this._fieldDBtype) {
      this._fieldDBtype = "ILanguage";
    }

    if (this.INTERNAL_MODELS) {
      this.debug("parsing with ", this.INTERNAL_MODELS);
    }
    var simpleModels = [];
    for (var member in json) {
      if (!json.hasOwnProperty(member)) {
        continue;
      }
      this.debug("JSON: " + member);
      if (json[member] &&
        this.INTERNAL_MODELS &&
        this.INTERNAL_MODELS[member] &&
        typeof this.INTERNAL_MODELS[member] === "function" &&
        !(json[member] instanceof this.INTERNAL_MODELS[member]) &&
        !(this.INTERNAL_MODELS[member].compatibleWithSimpleStrings && typeof json[member] === "string")) {

        json[member] = new this.INTERNAL_MODELS[member](json[member]);

      } else {
        simpleModels.push(member);
      }
      try {
        this[member] = json[member];
      } catch (e) {
        console.log(e.stack);
      }
    }
    if (simpleModels.length > 0) {
      this.debug("simpleModels", simpleModels.join(", "));
    }

    BASEOBJECT.apply(this, arguments);
    if (!this.id && !this._dateCreated) {
      this.dateCreated = Date.now();
    }
  };

  /** @lends ILanguage.prototype */
  ILanguage.prototype = Object.create(BASEOBJECT.prototype, {
    constructor: {
      value: ILanguage
    },

    debug: {
      value: function() {
        if (this.debugMode) {
          if (BASEOBJECT && BASEOBJECT.debug) {
            BASEOBJECT.debug.apply(this, arguments);
          } else {
            console.log(arguments.join("\n"));
          }
        }
      }
    },

    lexicon: {
      get: function() {
        if (!this._lexicon && this.orthography) {
          var resultLexicon = ILanguage.Lexicon.LexiconFactory(this);
          this._lexicon = resultLexicon;
          this.debug("this._lexicon", this._lexicon.length);
        }
        return this._lexicon;
      },
      set: function(value) {
        this._lexicon = value;
      }
    }

  });

  ILanguage.Corpus = exports.Corpus;
  ILanguage.Lexicon = exports.Lexicon;

  try {
    globals.ILanguage = ILanguage;
  } catch (e) {
    console.log("cannot set ILanguage on globals in this context");
    // console.log(e.stack);
  }
  exports.ILanguage = exports.ILanguage || ILanguage;
  // console.log("Loaded ILanguage into exports", exports);
})(typeof exports === 'undefined' ? this : exports);
