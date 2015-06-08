#! /bin/bash
$LANGUAGE="inuktitut"

### Step 1  Use Morfessor to find frequently occuring strings which could indicate morphemes
echo "    Not using morfessor to generate rankedpossible suffixes or seedlist. The seedlist is hard coded";

#choice 1: use morfesor with all frequencies of words set to 1
#zcat $1 > wordlist
 sed 's/^[0-9]*/1/' < $1 | sort -u | rev | sort | rev > traindata
./morfessor1.0.pl -trace 3 -data traindata > $1-morfessorseg-nofrequencies
rm traindata

#choice 2: use morfessor normally
#./morfessor1.0.pl -trace 3 -data $1 > $1-morfessorseg-usedfrequencies

#choice 3: use morfessor with a gamma distribution on morpheme lenght,and median length of 5 (gamma distribution is like the normal bell curve but with a long tail or more deviation on the positive side)
#./morfessor1.0.pl -trace 3 -gammalendistr 5 -data $1 > $1-morfessorseg-gamma

#compress the output if you want to
#gzip $1-morfessorseg

###Step 2 Filter Mofressor ouput into a ranked list of suffixes(final morphs), adverbial/roots (medial morphs) and roots/prefixes (initial morphs)

#get lines with wors on them, and change + to be attached to morphs from xyz + abc to prefix xyz+ +abc  suffix
grep '+' <$1-morfessorseg-nofrequencies | sed 's/ + /+ +/' >$1-morfessorseg-nofrequencies

#get a frequency count of each morpheme in each position
./corpus2wordlist $1-morfessorseg-nofrequencies-positionsensitive

#print out the first 15 frequent morphs as a seedlist, replaceing xyz+  as xyz=root xyz, +xyz+ as xyz=medial, +xyz as xyz=suffix
sed 15q < $1-morfessorseg-nofrequencies-positionsensitive | sed 's/\^\([^+]\)*\+$/\1=root/' | sed 's/\^\+\([^+]\)*\+$/\1=medial/' | sed 's/\^\+\([^+]\)*$/\1=suffix/' > $LANGUAGE-seedlist



### INvestivation:###
# using the output from morfessor
# then looked at frequency lists from above 
# http://ling.udel.edu/gina/classes/COMP6781StatisticalNLP/inuktitut_morphology/openfieldworker0.1/bin/InukMagazine102-104rough-inuktitut-lc.txt-suffixOrder-morfessorseg-nofrequencies-seedlistbuilder-positionsensitive-frequencyOrder
# and saw that the many of my seed choices were also found by morfessor, but not the most frequent so more than frequency must be used to pick a seed 
# can later run stats on this file for see what kinds of guesses morfessor is doing. 

# Ran morphessor fully on the InukMag102-104 corpus and got a list of suf pref stem 
# then ran corpus2wordlist on it to find the most frequent of each category
# opened it in excel and sorted by type then by frequency.
# then created ranked list of initials medials and finals. 
#after looking at the data decided to ignore morfessors category lables and return to my + system

#if i took medials 4letters or longer (chosen based on alphabet size to morpheme length ration of informativeness, if you ahve a small alphabet like inuktitut, you cant be very confident about short morphemes since letters tem self appear frequently.

#see http://ling.udel.edu/gina/classes/COMP6781StatisticalNLP/inuktitut_morphology/openfieldworker0.1/bin/memory/InukMagazine102-104rough-inuktitut-lc.txt-suffixOrder.gz-segmentation.final-seedlistbuilder-positionsensitive-initialsrankedlist

#774	+	r	+
#653	+	u	+
#547	+	ni	+
#374	+	qa	+
#353	+	ti	+
#347	+	si	+
#336	+	a	+
#270	+	tau	+
#268	+	i	+
#264	+	ksa	+
#259	+	sima	+  'to be in a state acquired through a completed action (the word can be active, or passive)' (sometimes deletes the preceding t)
#254	+	nginni	+ nothing
#239	+	li	+
#232	+	q	+
#228	+	uti	+
#204	+	vi	+
#187	+	ngi	+
#183	+	tu	+
#183	+	lir	+
#170	+	laur	+ nothing
#169	+	mi	+
#166	+	titsi	+ nothing
#163	+	ta	+
#161	+	ju	+
#160	+	liri	+ 'to work with, on'
#156	+	qaq	+
#154	+	nga	+
#153	+	ja	+
#133	+	ji	+
#132	+	mmari	+ mmarik 'certainly' (starts with double conson so it deletes preceding conson)
#122	+	titau	+
#121	+	liur	+ liuq 'to be building s.t.' (combination of li+uq) (deletes preceding k or q)
#118	+	vallia	+ 'probably'
#116	+	ngit	+ nngit 'negation'  (starts with a double conson so it deletes precedign conson)
#


#here is the investigation for medials...
# since the medials are the most useful i looked at the stems list first. but this is a huge list o f hodgepodge. most of the frequent froms are not accurately segmented

#115	ngit	STM
#110	tillu	STM
#104	ikajur	STM
#102	qatigii	STM  - okay combination of qati and gii
#100	qanu	STM
#94	suru	STM
#93	sivu	STM
#87	liri	STM - 'to work with, on'
#81	saqqi	STM 
#81	uqalima	STM
#80	jju	STM - jjut [jjut,jjuti] 'reason or cause' (starts with a long consonant so it deletes a preciding conson), (after q becomes q+jj=r)
#80	nuna	STM
#79	katima	STM
#77	kiinauja	STM
#76	ullu	STM
#73	tusa	STM
#71	ilinniar	STM
#71	titi	STM
#70	iqqa	STM
#69	uti	STM



