/* globals localStorage */
(function(exports) {

  var defaults = {
    algorithm: "default",
    maxIterations: 2
  };
  var resulthash = {};
  var emit = function(key, value) {
    if (typeof key === "object") {
      key = JSON.stringify(key);
    }
    resulthash[key] = resulthash[key] || [];
    resulthash[key].push(value);
  };
  var reduce = function(keys, values, rereduce) {
    return values.length;
  };

  var MorphemeSegmenter = exports.MorphemeSegmenter || {
    debugMode: false,
    seeds2precedenceRelations: function(word) {
      if (word === "") {
        return;
      }
      word = word.replace(/^-/, "").replace(/-$/, "");
      var morphemes = word.trim().split("-");
      var previousmorph = "@";
      if (morphemes.length === 0) {
        return;
      }
      morphemes.push("@");
      for (var morph in morphemes) {
        var rule = {};
        rule.x = previousmorph;
        rule.relation = "preceeds";
        rule.y = morphemes[morph];
        rule.context = word;
        emit(rule, 1);
        previousmorph = morphemes[morph];
      }
    },
    generateCompactPrecedenceRelationsFromSeeds: function(morphemesLine) {
      resulthash = {};
      // If the morphemesLine is ungrammatical, don't count the words
      // in it
      if (morphemesLine.indexOf('*') === 0) {
        return;
      }
      // Tokenize the morphemesLine
      var words = morphemesLine.toLowerCase().split(/[#?!.,/ ]+/);
      // For each token
      for (var word in words) {
        // If the token it not null or the empty string
        if (words[word]) {
          // Replace (*_) with ''
          var feederWord = words[word].replace(/\(\*[^)]*\)/g, '');
          // Replace *(_) with _
          feederWord = feederWord.replace(/\*\(([^)]*)\)/, '$1');
          // Remove all parentheses and *
          var fullWord = feederWord.replace(/[(*)]/g, '');
          // Remove parentheses and all characters between the
          // parentheses
          var option1 = feederWord.replace(/\([^)]*\)/g, '');
          // If those two removals ended up with difference strings
          if (fullWord !== option1) {
            // Emit the version without the characters between the
            // parentheses
            this.seeds2precedenceRelations(option1);
          }
          // Emit the version without parentheses
          this.seeds2precedenceRelations(fullWord);
        }
      }
      var mapReduceRows = [];
      for (var key in resulthash) {
        if (resulthash.hasOwnProperty(key)) {
          var parsedKey = key;
          try {
            parsedKey = JSON.parse(key);
          } catch (e) {
            // console.log(e);
          }
          mapReduceRows.push({
            key: parsedKey,
            value: reduce(key, resulthash[key])
          });
        }
      }
      // console.log("mapReduceRows", mapReduceRows);

      // Reduce the rules such that rules which are found in multiple source
      // words are only used/included once.
      var compactPrecedenceRelations = [];
      mapReduceRows.map(function(rule) {
        if (rule.key.distance && rule.key.distance > 1) {
          return;
        }
        // upgrade to fancier context sensitive rules
        if (rule.key.previous && rule.key.previous.morphemes) {
          rule.key.x = rule.key.previous.morphemes;
        }
        if (rule.key.subsequent && rule.key.subsequent.morphemes) {
          rule.key.y = rule.key.subsequent.morphemes;
        }
        var compactVersion = rule.key.x + "-" + rule.key.y;
        if (compactPrecedenceRelations.indexOf(compactVersion) === -1) {
          compactPrecedenceRelations.push(compactVersion);
        }
      });
      // sort by length, longer have higher matching priority...
      compactPrecedenceRelations.sort(function(a, b) {
        return a.length > b.length;
      });
      // console.log("compactPrecedenceRelations", compactPrecedenceRelations);

      return compactPrecedenceRelations;
    },
    /**
     * Takes in an utterance line and, based on our current set of precendence
     * rules, guesses what the morpheme line would be. The algorithm is
     * very conservative.
     *
     * @param {String} unparsedUtterance The raw utterance line.
     *
     * @return {String} The guessed morphemes line.
     */
    generatePotentialSegmentations: function(doc, compactPrecedenceRelations, justCopyDontGuessIGT) {
      var unparsedUtterance = doc.utterance || doc.orthography;
      if (!unparsedUtterance) {
        return doc;
      }

      if (justCopyDontGuessIGT) {
        doc.morphemes = unparsedUtterance;
        return unparsedUtterance;
      }

      // Rules must be injected
      var rules = compactPrecedenceRelations;
      if (!rules) {
        console.warn("There were no rules which could be used, please supply a second argument to function generatePotentialSegmentations ", doc);
        doc.morphemes = unparsedUtterance;
        return doc;
      }

      var potentialParse = '',
        parsedWords = [],
        firstMorpheme,
        secondMorpheme;

      // Divide the utterance line into words
      var unparsedWords = unparsedUtterance.trim().split(/ +/);

      for (var word in unparsedWords) {
        // Add the start/end-of-word character to the word
        unparsedWords[word] = "@" + unparsedWords[word] + "@";

        // Find the rules which match in local precedence
        var matchedRules = [];
        for (var r in rules) {
          if (unparsedWords[word].indexOf(rules[r].replace(/-/, "")) >= 0) {
            matchedRules.push(rules[r]);
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
            if (prefixtemplate.length > 2 && prefixtemplate[prefixtemplate.length - 1] === "@") {
              continue; //we found the end already
            }
            firstMorpheme = matchedRules[j].split("-")[0];
            secondMorpheme = matchedRules[j].split("-")[1];
            if (prefixtemplate[i] === firstMorpheme) {
              if (prefixtemplate[i + 1]) { // ambiguity (two potential following // morphemes)
                prefixtemplate.pop();
                break;
              } else {
                prefixtemplate[i + 1] = secondMorpheme;
              }
            }
          }
        }
        // If prefix template matches the whole word (ie we have seen it before, return the prefix template exactly)
        if (prefixtemplate.length > 2 && prefixtemplate[0] === "@" && prefixtemplate[prefixtemplate.length - 1] === "@") {
          prefixtemplate.pop(); //remove final @
          prefixtemplate.shift(); //remove intitial @
          parsedWords.push(prefixtemplate.join("-"));
        } else {
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
                firstMorpheme = matchedRules[jj].split("-")[0];
                secondMorpheme = matchedRules[jj].split("-")[1];
                if (suffixtemplate[ii] === secondMorpheme) {
                  if (suffixtemplate[ii + 1]) { // ambiguity (two potential
                    // following morphemes)
                    suffixtemplate.pop();
                    break;
                  } else {
                    suffixtemplate[ii + 1] = firstMorpheme;
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
          if (this.debugMode) {
            console.log("Potential parse of " + unparsedWords[word].replace(/@/g, "") + " is " + potentialParse);
          }

          parsedWords.push(potentialParse);
        }
      }
      doc.alternativeMorphemeSegentations = doc.alternativeMorphemeSegentations || [];
      doc.alternativeMorphemeSegentations.push(unparsedUtterance);
      doc.morphemes = parsedWords.join(" ");
      return doc;
    },

    runSegmenter: function(doc) {
      if (!doc.morphemeSegmentationOptions) {
        if (this.debugMode) {
          console.log("No segmentation options were specified, not returning any segmentations");
        }
        doc.morphemes = doc.morphemes || doc.utterance || doc.orthography;
        if (doc.morphemesRegExp) {
          doc.morphemes = doc.morphemes.replace(doc.morphemesRegExp, '-$1-');
        }
        return doc;
      }

      if (!doc.utterance && !doc.orthography) {
        console.warn("I don't need to guess the segmentation of an empty string, it's just empty. ", doc.utterance);
        return doc;
      }
      var originalMorphemes = doc.morphemes;
      // console.log("Running segmenter", doc);
      var precedenceRelations = doc.morphemeSegmentationOptions.precedenceRelations;
      if (doc.morphemeSegmentationOptions.seeds) {
        precedenceRelations = this.generateCompactPrecedenceRelationsFromSeeds(doc.morphemeSegmentationOptions.seeds);
      } else {
        if (!precedenceRelations) {
          if (!doc.ilanguage) {
            console.warn("I need a rule set to use. please specify an ilanguage (this might be a database or a corpus of similar data/dialect or language of an individual)");
            return doc;
          }
          try {
            precedenceRelations = localStorage.getItem(doc.ilanguage + "reducedRules");
            // Parse the rules from JSON into an object
            precedenceRelations = JSON.parse(precedenceRelations);
          } catch (e) {
            console.warn("localStorage doesnt work and no seeds were specified so segmentation cannot run." + e);
          }
        }
      }
      doc = this.generatePotentialSegmentations(doc, precedenceRelations);
      if (doc.originalMorphemes && doc.alternativeMorphemeSegentations.indexOf(originalMorphemes) === -1) {
        doc.alternativeMorphemeSegentations.unshift(doc.morphemes);
        doc.morphemes = originalMorphemes;
      } else {
        if (doc.originalMorphemes) {
          console.warn("Overrwiting morphemes " + doc.originalMorphemes + " to " + doc.morphemes);
        }
      }
      // console.log("guessed ", doc);

      return doc;
    }
  };

  exports.MorphemeSegmenter = exports.MorphemeSegmenter || MorphemeSegmenter;

})(typeof exports === "undefined" ? this : exports);
