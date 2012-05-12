# -*- coding: utf-8 -*-
# try to write a unicode letter finder in python
#! /usr/bin/env python
import codecs
import sys #for call arguments
import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting

#tokenize on letters (if the same letter, then consider 1 token)

#filename="InukMagazine102-104rough-inuktitut.txt"
#filename="inuktitut-unicode.txt"
language="Default"      #English, Inuktitut, Finnish, Korean
segmentType="Default" #Phonetic, Phonological, Orthographic
rareCutoff=2

filename= sys.argv[1]
#language= sys.argv[2] #get the language from the 2rd position on each line in the letters file
intext = codecs.open(filename, encoding='utf-8')

filenameout=filename+"-abox.txt"
outtext = codecs.open(filenameout, encoding='utf-8', mode='w')

for line in intext:
	letter=line.split()
	try:
                language=letter[2]
                segmentType=letter[3]
                individual=language+"_"+letter[0]+"_Letter"
                concept=segmentType+"_"+letter[0]+"_Letter"
                rarityConcept=language+"_"+segmentType+"_Rare"
                stringtoprint='<!-- http://openlanguage.ca/ontologies/phonont.v1#'+individual+' -->\n\t<owl:Thing rdf:about="#'+individual+'">\n\t\t<rdf:type rdf:resource="#'+concept+'"/>\n\t</owl:Thing>\n<!-- http://openlanguage.ca/ontologies/phonont.v1#'+concept+' -->\n\t<owl:Class rdf:about="#'+concept+'">\n\t\t<rdfs:subClassOf rdf:resource="#'+letter[4]+'"/>\n\t</owl:Class>\n\n'
                outtext.write(stringtoprint)
        except IndexError, e:
                print ("Warning: ")
                print (e)
#y="hi"
#y= unicode(y)
#stringtoprint=x+"\t"+y+"\n"
#outtext.write(stringtoprint)

#print totalcharcount
intext.close()
outtext.close()
