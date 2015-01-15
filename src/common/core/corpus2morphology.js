#! /usr/bin/env node
console.log(process.argv);
var userArgs = process.argv.slice(2);

LANGUAGE="inuktitut"

echo "Removing all files and memories..."
#./morphology2clean
./morphology2clean $1 #if you want to remove the word lists too

echo "Creating a wordlist..."
./corpus2wordlist $1

echo "Creating  rankedpossiblemorpheme lists..."
./wordlist2rankedpossiblemorphs $1-suffixOrder

echo "Creating initial precedence relations..."
./seedlist2precedencerelations $LANGUAGE-seedlist

echo "Creating an initial dense corpus..."
echo "      (contains a hard coded seed list, change this to follow from above step in later versions)"
./seedlist2initialdensecorpus $1-suffixOrder

echo "Creating precedence relations between morphemes..."
./initialdensecorpus2morphrelations.pl $LANGUAGE-densecorpus

echo "Creating a list of permissible morpheme boundaries ie, z > a, in xyz > abc ..."
./morphrelations2phonotactics.pl $LANGUAGE-morphrelations-frequency

sort -r inuktitut-morphrelations-frequency  > inuktitut-morphrelations-frequency-sorted

for i in 1
do
   echo "Welcome $i times"


echo "Creating a (new) template by generalizing individual morphs to their class..."
./morphrelations2template.py $LANGUAGE-morphorelations-frequency-sorted

echo "Creating a new dense corpus..."
./precedencerelations2densecorpus $1-suffixOrder

done
