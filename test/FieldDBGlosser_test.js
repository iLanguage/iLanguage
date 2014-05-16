'use strict';

var Glosser = require('../lib/FieldDBGlosser.js').Glosser;
var lexiconFactory = require('../lib/Lexicon.js').LexiconFactory;

var XMLHttpRequestNode = require("xmlhttprequest").XMLHttpRequest;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['init'] = {
  setUp: function(done) {
    // setup here
    done();
  },


  'guessUtteranceFromMorphemes': function(test) {
    test.expect(1);
    // tests here
    try {
      var glosser = new Glosser({
        XMLHttpRequestLocal: XMLHttpRequestNode
      });
      var igt = glosser.guessUtteranceFromMorphemes({
        utterance: "",
        morphemes: "Kicha-nay-wa-n punqo-ta",
        allomorphs: "",
        gloss: "open-DES-1OM-3SG door-ACC",
        translation: "I feel like opening the door."
      });
      // console.log(igt);
      test.equal(igt.utterance, 'Kichanaywan punqota', 'should be Kichanaywan punqota.');
      test.done();

    } catch (e) {
      console.log(e);
      test.equal(e, 'Kichanaywan punqota', 'should be Kichanaywan punqota.');
      test.done();
    }
  },

  'guessGlossFromDatumIfLexiconUndefined': function(test) {
    test.expect(1);
    var pouchname = "sample-testingnumbersinglosser";

    var glosser = new Glosser({
      XMLHttpRequestLocal: XMLHttpRequestNode,
      pouchname: pouchname
    });

    var igt = glosser.guessGlossFromMorphemes({
      "utterance": "maqutmg'p",
      "utterancefield": "field1",
      "morphemes": "maqu-tm-g-'p",
      "morphemesfield": "field2",
      "gloss": "",
      "glossfield": "field3",
      "pouchname": pouchname
    });
    console.log(igt);
    test.equal(igt.gloss, '?-?-?-?', 'should be just question marks.');
    test.done();
  },

  'guessGlossFromDatum': function(test) {
    test.expect(2);
    var pouchname = "sample-testingnumbersinglosser",
      url = "https://corpus.lingsync.org/" + pouchname,
      showWordBoundaries = true;

    var optionalUrl = url + "/_design/lexicon/_view/morphemesPrecedenceContext?group=true";
    var glosser = new Glosser({
      XMLHttpRequestLocal: XMLHttpRequestNode,
      pouchname: pouchname
    });
    glosser.lexicon = lexiconFactory({
      precedenceRelations: [{
        "key": {
          "previous": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "follows",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "precedes",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "@",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 4,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "maqu",
            "gloss": "eat",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "'p",
            "utterance": "maqutmg'p",
            "confidence": 0.5
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 0.9000000000000000222
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-vti--past",
            "id": "116ab35300200903a1c6fad4c1f2f660"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "'p",
            "gloss": "past",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 2,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "@",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 3,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "follows",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }, {
        "key": {
          "previous": {
            "morphemes": "tm",
            "gloss": "vti",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "subsequent": {
            "morphemes": "g",
            "gloss": "3",
            "utterance": "maqutmg'p",
            "confidence": 1
          },
          "relation": "precedes",
          "distance": 1,
          "context": {
            "utterance": "maqutmg'p",
            "morphemes": "maqu-tm-g-'p",
            "gloss": "eat-VTI-3-PAST",
            "id": "116ab35300200903a1c6fad4c1f2484b"
          }
        },
        "value": 1
      }],
      dbname: pouchname,
      element: null,
      dontConnectWordBoundaries: !showWordBoundaries,
      url: optionalUrl.replace(url, "")
    });
    console.log("lexicon");
    console.log(glosser.lexicon);

    var igt = glosser.guessGlossFromMorphemes({
      "utterance": "maqutmg'p",
      "utterancefield": "field1",
      "morphemes": "maqu-tm-g-'p",
      "morphemesfield": "field2",
      "gloss": "",
      "glossfield": "field3",
      "pouchname": pouchname
    });
    test.equal(igt.gloss, 'eat-vti-3-past', 'should be eat-VTI-3-PAST.');
    test.notStrictEqual(igt.glossAlternates, ['eat-vti-3-past'], 'should offer alternate glosses');
    test.done();
  },


  'downloadPrecedenceRules': function(test) {
    test.expect(1);
    // tests here
    try {
      var glosser = new Glosser({
        XMLHttpRequestLocal: XMLHttpRequestNode
      });
      glosser.downloadPrecedenceRules("public-firstcorpus", "https://corpusdev.lingsync.org/public-firstcorpus/_design/pages/_view/precedence_rules?group=true", function() {
        console.log('Completed');
        test.equal('Completed', 'Completed', 'should be Completed.');
        test.done();
      });

    } catch (e) {
      console.log(e);
      test.equal(e, 'Kichanaywan punqota', 'should be Kichanaywan punqota.');
      test.done();
    }
    test.equal('Async', 'Async', 'should be Async.');
    test.done();
  }
};
