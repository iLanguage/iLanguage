#! /usr/bin/env node
console.log(process.argv);
var userArgs = process.argv.slice(2);


echo "
    To implement: Take a list of morphemes for each category in the template, and create nested for loops or a flat structure to find words which contain at least 1 element of every category.

    Although enlarging the list by many morphemes per category could increase the size of the dense corpus, the size is restricted to ever increasingly long words (which contain all elements in the category. Once there are no more longer words for the dense corpus the template is complete.

    The next step is to use a portion of trustable existing morphemes (thos that appear in their template spot frequently with many differnet neighbors) to work on words in the corpus which do not fill the template.

    Care must be taken at all steps to notice if allophone garbage between morphemes is being created. This is why it's important to consider reliable morphemes for cutting, morphemes which do not include part of their neighbors as their neighbors have changed to phonotacitcally comply *this is why a compression strategy which works on predictability of letters will ecode the junction of two allomorphs as a morpheme, rather than morphemes themsleves!!
"
