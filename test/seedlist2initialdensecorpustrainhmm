#! /bin/bash

LANGUAGE="inuktitut"
 
#create a dense corpus from a few roots/prefixes, medials/roots and suffixes
rm $LANGUAGE-densecorpus.train

for i in isuma kati tusaa mali malik tiki tikit nuna
do
	for m in sima laur lauq nngit vallia
	do
		for f in juq tugut mik
		do
			#grep $i.*$m. $1 >> densecorpus-$1
			grep $i.*$m.*$f $1 | sed "s/$i/ $i /" | sed "s/$m/ $m /" | sed "s/$f/ $f /" >> $LANGUAGE-densecorpus.train
		done
	done
done



#cat $LANGUAGE-densecorpustrainhmm >> $LANGUAGE-densecorpustrainhmm-history
