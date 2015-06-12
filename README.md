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

* [Gina Cook](http://gina.ilanguage.ca/) (U Delaware, Concordia)
* [Theresa Deering](http://trisapeace.angelfire.com/) (McGill, Visit Scotland)
* [Josh Horner](http://jdhorner.com/) (Amilia)
* [Mathieu Legault](https://plus.google.com/116488045482047329710/about) (HEC, UQAM, Pivot88)
* [Hisako Noguchi](http://linguistics.concordia.ca/gazette.html) (Concordia)
* [Tobin Skinner](http://tobinskinner.com) (McGill, Acquisio)

# Post Docs

* [M.E. Cathcart](http://udel.edu/~mdotedot/) (U Delaware)
* [Alexandra Marquis](http://www.uqam.ca/entrevues/entrevue.php?id=968?hebdo) (UQAM, U de Montréal)

# Interns

* [Siddartha Kattoju](https://plus.google.com/109959990932959598572/posts) Summer 2011 (Concordia, Electrical Engineering)
* [Curtis Mesher](http://dragonsandgulls.wordpress.com/) Fall 2011, Spring 2012 (Concordia, Theoretical Linguistics)
* [Diana Olepeka](http://dragonsandgulls.wordpress.com/) Fall 2011 (Concordia, Theoretical Linguistics)
* [Bahar Sateli](https://twitter.com/BaharSateli) Spring 2012 (Concordia, Software Engineering)
* [Yuliya Manyakina](http://egg.auf.net/12/people/manyakinayuliya/) Summer 2012 (Stony Brook, Field Linguistics)
* [Elise McClay](http://migmaq.org/wp-content/uploads/2013/02/mcclayundergradthesis.pdf) Fall 2012, Spring 2013 (McGill, Field Linguistics)
* [Jesse Pollak](http://jessepollak.me/) Spring 2013 (Pomona College, Field Linguistics)
* [Xianli Sun](http://myaamiacenter.org/) Spring 2013 (Miami University, Software Engineering)
* [Louisa Bielig](https://github.com/louisa-bielig) Summer 2013, Fall 2013 (McGill, Theoretical Linguistics)
* [Yuliya Kondratenko](http://aboutkondratenko.wordpress.com/) Summer 2013 (Concordia, Theoretical Linguistics)
* [Dominique Bédard](http://www.eoa.umontreal.ca/) Fall 2013, Spring 2014 (U de Montréal, Speech Language Pathology)
* [Alexandre Herbay](https://twitter.com/Hafsloo) Spring 2014 (U de Montréal, Psycho-linguistics & Toulouse III, Computer Science)


## Release History

* v1.0 April 16 2009 - Initial implementation in bash and perl
* v2.0 Jul 3 2010 - Implementation in C++
* v3.0 April 30 2011 - Implementation in Groovy 
* v4.0 July 20 2012 - Implementation in JavaScript Map Reduce
* v4.1 Nov 29 2013 - Added more high level functions for gloss lookup
* v5.0 Jan 9 2014 - Implementation in CommonJS


# License 

This project is released under the [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) license, which is an very non-restrictive open source license which basically says you can adapt the code to any use you see fit. 

# How to Contribute Code

* [Signup for a GitHub account](https://github.com/signup/free) (GitHub is free for OpenSource)
* Click on the "Fork" button to create your own copy.
* Leave us a note in our [issue tracker](https://github.com/iLanguage/iLanguage/issues) to tell us a bit about the bug/feature you want to work on.
* You can [follow the 4 GitHub Help Tutorials](http://help.github.com/) to install and use Git on your computer.
* Feel free to ask us questions in our [issue tracker](https://github.com/iLanguage/iLanguage/issues), we're friendly and welcome Open Source newbies.
* Edit the code on your computer, commit it referencing the issue #xx you created ($ git commit -m "fixes #xx i changed blah blah...") and push to your origin ($ git push origin master).
* Click on the "Pull Request" button, and leave us a note about what you changed. We will look at your changes and help you bring them into the project!
* Feel the glow of contributing to OpenSource :)


[npm-url]: https://npmjs.org/package/ilanguage
[npm-image]: https://badge.fury.io/js/ilanguage.svg
[travis-url]: https://travis-ci.org/user/ilanguage
[travis-image]: https://travis-ci.org/user/ilanguage.svg?branch=master
[daviddm-url]: https://david-dm.org/user/ilanguage.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/user/ilanguage
