iLanguage
============

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

A semi-unsupervised language independent morphological analyzer useful for stemming unknown language text, or getting a rough estimate of possible parses for morphemes in a word. Uses compression, maximum entropy and fieldlinguistics.



## Install

```bash
$ npm install --save ilanguage
```


## Usage

```javascript
var iLanguage = require('ilanguage');
var lang = new iLanguage(); 
```


# Lab Members

* [Gina Chiodo](http://gina.ilanguage.ca/) (U Delaware, Concordia)
* [Theresa Deering](http://trisapeace.angelfire.com/) (McGill, Aquafadas)
* [Josh Horner](http://jdhorner.com/) (Amilia)
* [Mathieu Legault](https://plus.google.com/116488045482047329710/about) (HEC, UQAM, Pivot88)
* [Hisako Noguchi](http://linguistics.concordia.ca/gazette.html) (Concordia)
* [Tobin Skinner](http://tobinskinner.com) (McGill, Amilia)

# Post Docs

* [M.E. Cathcart](http://udel.edu/~mdotedot/) 2012 (U Delaware)
* [Alexandra Marquis](http://www.uqam.ca/entrevues/entrevue.php?id=968?hebdo) 2013-2014 (UQAM, U de Montréal)
* [Joel Dunham](http://www.jrwdunham.com) 2014-2015 (UBC)

# Interns

* [Siddartha Kattoju](https://plus.google.com/109959990932959598572/posts) Summer 2011 (Concordia, Electrical Engineering)
* [Curtis Mesher](http://dragonsandgulls.wordpress.com/) Fall 2011, Spring 2012 (Concordia, Theoretical Linguistics)
* [Diana Olepeka](http://dragonsandgulls.wordpress.com/) Fall 2011 (Concordia, Theoretical Linguistics)
* [Elise McClay](http://migmaq.org/wp-content/uploads/2013/02/mcclayundergradthesis.pdf) Fall 2012, Spring 2013 (McGill, Field Linguistics)
* [Bahar Sateli](https://twitter.com/BaharSateli) Spring 2012 (Concordia, Software Engineering)
* [Yuliya Manyakina](http://ymanyakina.github.io) Summer 2012 (McGill, Field Linguistics)
* [Xianli Sun](http://myaamiacenter.org/) Spring 2013 (Miami University, Software Engineering)
* [Louisa Bielig](https://github.com/louisa-bielig) Summer 2013, Fall 2013, Summer 2015 (McGill, Theoretical Linguistics)
* [Dominique Bédard](http://www.eoa.umontreal.ca/) Fall 2013, Spring 2014 (U de Montréal, Speech Language Pathology)
* [Alexandre Herbay](https://twitter.com/Hafsloo) Spring 2014 (U de Montréal, Psycho-linguistics & Toulouse III, Computer Science)
* [Veronica Cook-Vilbrin](http://github.com/vronvali) Summer 2015 (Norwich University, Psychology)


## Release History

* v1.0 April 16 2009 - Initial implementation in bash and perl
* v2.0 Jul 3 2010 - Implementation in C++
* v3.0 April 30 2011 - Implementation in Groovy 
* v4.0 July 20 2012 - Implementation in JavaScript Map Reduce
* v4.1 Nov 29 2013 - Added more high level functions for gloss lookup
* v5.0 Jan 9 2014 - Implementation in CommonJS


# License 

This project is released under the [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) license, which is an very non-restrictive open source license which basically says you can adapt the code to any use you see fit. 

# How to edit the code

### Code style
[Sublime](http://www.sublimetext.com/3) will manage this for you if you format (CMD+SHIFT+P, format) your code when you save. You can refer to `.editorconfig` and `.jshintrc` for specific options.

### Breakpointing while you work
You can open the `test/SpecRunner.html` in an _actual_ browser to run the unit test file(s) or breakpoint the code.

## Modifying the code
In general, you should always ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed. On Mac you can do this by 
```
brew update
brew upgrade node
```

Test that Gulp is installed by running `gulp --version`. If the command isn't found, run `npm install -g gulp`.  For more information about installing the tools, see the [getting started with Gulp guide](http://gulpjs.com).

1. Fork the repo.
1. Clone the repo to your computer.
1. Run `npm install` to install all build dependencies.
1. Run `gulp` to build this project.

Assuming that it looks something like this, you're ready to go.
![screen shot 2015-06-21 at 5 58 21 pm](https://cloud.githubusercontent.com/assets/196199/8273513/343dc03a-183f-11e5-8b2c-89586f6d48a3.png)


## Contributing changes

Easy way

1. [Signup for a GitHub account](https://github.com/signup/free) (GitHub is free for OpenSource)
1. Click on the "Fork" button to create your own copy.
1. Leave us a note in our [issue tracker](https://github.com/iLanguage/iLanguage/issues) to tell us a bit about the bug/feature you want to work on.
1. You can [follow the 4 GitHub Help Tutorials](http://help.github.com/) to install and use Git on your computer.
1. Feel free to ask us questions in our [issue tracker](https://github.com/iLanguage/iLanguage/issues), we're friendly and welcome Open Source newbies.
1. Edit the code on your computer, commit it referencing the issue #xx you created ($ git commit -m "fixes #xx i changed blah blah...") and push to your origin ($ git push origin master).
1. Click on the "Pull Request" button, and leave us a note about what you changed. We will look at your changes and help you bring them into the project!

Advanced way

1. Create a new branch for new fixes or features, this is easier to build a fix/feature specific pull request than if you work in your `master` branch directly.
1. Run `gulp watch` which will run the tests as you make changes.
1. Add failing tests for the change you want to make. Run `gulp test` to see the tests fail.
1. Fix stuff.
1. Look at the terminal output (assuming you ran `gulp watch`) to see if the tests pass. Repeat steps 2-4 until done.
1. Open `test/SpecRunner.html` unit test file(s) in actual browser(s) (Chrome Canary, Firefox, Safari) to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.


[npm-url]: https://npmjs.org/package/ilanguage
[npm-image]: https://badge.fury.io/js/ilanguage.svg
[travis-url]: https://travis-ci.org/iLanguage/iLanguage
[travis-image]: https://travis-ci.org/iLanguage/iLanguage.svg?branch=master
[daviddm-url]: https://david-dm.org/iLanguage/iLanguage.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/iLanguage/iLanguage
