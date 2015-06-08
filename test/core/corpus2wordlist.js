#!/bin/bash
if [ -z "$1" ]; then 
   echo usage: $0 directory "Provide a corpus. This script will generate a word list for the corpus: sorted by suffix order, sorted by frequency order and sorted by alphabetical order. "
   exit
fi


FREQ="frequencyOrder"
SUFFIXES="suffixOrder"
ALPHA="alphabeticalOrder"
SYLABLES="lengthInSylables"

# From Unix for Poets

#zcat $1 > corpus #if its a gzip corpus
tr -sc '[A-Z][+/][a-z]' '[\012*]' < $1 | sort | uniq -c | rev | sort  |rev | sed 's/^ *//' > $1-$SUFFIXES
#cat $1-$SUFFIXES | grep '^2 ' > $1-$SUFFIXES-2

#tr -sc '[A-Z][+/][a-z]' '[\012*]' < $1 | sort | uniq -c | sort -nr | sed 's/^ *//' > $1-$FREQ
#cat $1-$FREQ | grep '^2 ' > $1-$FREQ-2

#tr -sc '[A-Z][+/][a-z]' '[\012*]' < $1 | sort | uniq -c | sed 's/^ *//' > $1-$ALPHA

#tr -sc '[A-Z][a-z]' '[\012*]' < $1 | sort -u > words
#tr -sc '[aeiou\012]' ' ' < words | awk '{print NF}' > syl
#paste syl words |sort -nr | sed 's/\t/ /' > $1-$SYLABLES
#rm words
#rm syl 

#rm corpus # if its a gzip corpus

#eventually keep all files in the memory folder instead
#mv $1-* memory
