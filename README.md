# FieldDBGlosser

A semi-automatic IGT morpheme segmenter and glosser

## Getting Started
### On the server
Install the module with: `npm install fielddb-glosser --save`

```javascript
var Glosser = require('FieldDBGlosser').Glosser;
var glosser = new Glosser("yourdbidentifier"); 
```

### In the browser

Install the module with: `bower install fielddb-glosser --save`

Or, download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/OpenSourceFieldlinguistics/FieldDBGlosser/master/fielddb-glosser.min.js
[max]: https://raw.github.com/OpenSourceFieldlinguistics/FieldDBGlosser/master/fielddb-glosser.js

In your web page:

```html
<script src="bower_components/fielddb-glosser/fielddb-glosser.min.js"></script>
<script>
	var glosser = new Glosser("yourdbidentifier"); 
</script>
```


## Examples

In the examples below, all fields are optional but the more information provided, the more context the glosser can take into account when returning guesses.


To guess an utterance (citation line) from morphemes:

```javascript
glosser.guessUtteranceFromMorphemes({
	utterance: "",
	morphemes: "Kicha-nay-wa-n punqo-ta",
	allomorphs: "",
	gloss: "open-DES-1OM-3SG door-ACC", 
	translation: "I feel like opening the door."
});
```


To guess a morpheme segmention from an utterance/orthography line:

```javascript
glosser.guessMorphemesFromUtterance({
	utterance: "Kichanaywan punqota",
	morphemes: "",
	allomorphs: "",
	gloss: "", 
	translation: "I feel like opening the door."
});
```	


To guess glosses from a morphemes/allomorphs line:

```javascript
glosser.guessGlossFromMorphemes({
	utterance: "Kichanaywan punqota",
	morphemes: "Kicha-nay-wa-n punqo-ta",
	allomorphs: "",
	gloss: "", 
	translation: "I feel like opening the door."
});
```

To show a D3.js force directed graph of morphemes in the corpus:

CSS:

```css
#corpus-precedence-rules-visualization {
	background-color: #333;
	text-align: center;
}

```

Javascript:

```javascript
var doubleClickMorpheme = function(dataPoint){
	console.log("Someone double clicked me ", dataPoint);
};

try {
	glosser.visualizeMorphemesAsForceDirectedGraph(null, document.getElementById("corpus-precedence-rules-visualization"), "https://example.com/yourdbidentifier", doubleClickMorpheme);
} catch(e) {
	console.warn("There was a problem loading your corpus visualization.");
}
```


### Sample glosser visualization client code

For source code see [samples/vanilla](https://github.com/OpenSourceFieldlinguistics/FieldDBGlosser/tree/master/samples/vanilla)


![lexicon_browser_dashboard](https://f.cloud.github.com/assets/196199/2366164/8555cb70-a6f3-11e3-93ec-140fcaad2294.png)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History

* v1.82 Added more functions to the glosser so the client side apps dont have to invent the user experience. Previously the prototype app never overwrote a gloss or morpheme segemetnation if the user had already modified it. But the spread sheet app deleted the users chagnes which was very frustrating. By putting the functionailty in the glosser itself and moving it into a bower component there is a higher chance that this wont happen...
* v1.16 Basic glosser which uses a map reduce of precedence rules to build a morphemes template, and D3.js visualization of morphemes

## License
Copyright (c) 2013 FieldDB Contributors
Licensed under the Apache 2.0 license.
