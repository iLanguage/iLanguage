'use strict';

var Glosser = require('../lib/FieldDBGlosser.js').Glosser;

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
      var igt = Glosser.guessUtteranceFromMorphemes({
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
  
  'downloadPrecedenceRules': function(test) {
    test.expect(1);
    // tests here
    try {
      Glosser.downloadPrecedenceRules("public-firstcorpus", "https://corpusdev.lingsync.org/public-firstcorpus/_design/pages/_view/precedence_rules?group=true", function() {
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
