# -*- coding: utf-8 -*-
# try to write a unicode letter finder in python
#! /usr/bin/env python
import codecs
import sys #for call arguments
import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting


#aboxes = sys.argv[] #get the language from the 2rd position on each line in the letters file
#args = "pythonsrc\\data\\phonont-header.txt pythonsrc\\data\\phonont-footer.txt"
#aboxes = args.split()
#aboxes = sys.arv[]

filenameout="pythonsrc\\phonont-abox.owl"
outtext = codecs.open(filenameout, encoding='utf-8', mode='w')
assertionsCount=0

#for i in aboxes:
for i in sys.argv[1:]:
        #i=sys.argv[1]
        intext = codecs.open(i, encoding='utf-8')
        for line in intext:
                assertionsCount=assertionsCount+1
                #print(line)
                line = unicode(line)
                outtext.write(line)
        intext.close()

assertionsTotal=(assertionsCount-22)/4.5
#assertionsTotal=assertionsCount
print ("    The number of assertions written to file: ",assertionsTotal)

outtext.close()
