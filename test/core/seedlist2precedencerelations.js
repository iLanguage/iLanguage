#!/bin/bash
# start the precedence relations for a template/grammar

LANGUAGE="inuktitut"

echo "   Initially assuming an optional prefix and obligatory root+suffix..."
echo "       Underlying representation @prefix+root+suffix@ or @root+suffix@"
echo "                (this corresponds to argument+head assumptions about language)"
echo "
@ > prefix
prefix > root

@ > root
root > suffix
suffix > @
"> $LANGUAGE-precedencerelations_initial

echo "   Creating precedence rules for seed morphemes..."
echo "
root > medial
medial > suffix

isuma = root
kati = root
tusaa = root
mali = root
tiki = root
nuna = root

sima = medial
laur = medial
lauq = medial
nngit = medial
vallia = medial

juk = suffix
tugut = suffix
mik = suffix

" > $LANGUAGE-precedencerelations_seedlist


#echo "   Intially assuming a template of prefix root medial suffix..."
#echo "            (this should be generalied later to come from the seedlist precedence rules)"
#echo "prefix root medial suffix" > $LANGUAGE-template



cat $LANGUAGE-precedencerelations_initial > $LANGUAGE-precedencerelations-history
cat $LANGUAGE-precedencerelations_initial 
cat $LANGUAGE-precedencerelations_seedlist >> $LANGUAGE-precedencerelations-history
cat $LANGUAGE-precedencerelations_seedlist

echo "
A history of the precedence rules are kept in $LANGUAGE-precedencerelations-history. 
   This file is kept to gather probabilty information. It serves as a longterm memory, 
   is not used as input to later steps."
echo "
The generalized frequency information for the precedence rules are in 
   $LANGUAGE-precedencerelations-frequency. This is the file which is used 
   as input in later steps."
sort < $LANGUAGE-precedencerelations-history  |uniq -c > $LANGUAGE-precedencerelations-frequency
cat $LANGUAGE-precedencerelations-frequency


