#! /bin/bash

LANGUAGE="inuktitut"
 
#create a dense corpus from a few roots/prefixes, medials/roots and suffixes
rm $LANGUAGE-densecorpus

for i in isuma kati tusaa mali malik tiki tikit nuna
do
	for m in sima laur lauq nngit vallia
	do
		for f in juq tugut mik
		do
			#grep $i.*$m. $1 >> densecorpus-$1
			grep $i.*$m.*$f $1 | sed "s/$i/\+\t\+$i\+\t\+/" | sed "s/$m/\+\t\+$m\+\t\+/" | sed "s/$f/\+\t\+$f\+\t\+/" >> $LANGUAGE-densecorpus
		done
	done
done
cat $LANGUAGE-densecorpus 
cat $LANGUAGE-densecorpus >> $LANGUAGE-densecorpus-history
