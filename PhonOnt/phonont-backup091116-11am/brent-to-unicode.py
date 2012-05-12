# -*- coding: utf-8 -*-
# try to write a unicode letter finder in python
#! /usr/bin/env python
import codecs
import sys #for call arguments
import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting

#tokenize on letters (if the same letter, then consider 1 token)


filename= sys.argv[1]
intext = codecs.open(filename, encoding='utf-8')
filenameout=filename+"-unicode.txt"
#outtext = codecs.open(filenameout, encoding='utf-8', mode='w')
outtext = codecs.open(filenameout, mode='w')


encoding = {"t":"t","I":"ɪ","n":"n","s":"s","D":"ð","k":"k","&":"æ","d":"d","6":"ə","i":"i","u":"u","l":"l","z":"z","A":"a","y":"j","h":"h","m":"m","9":"aj","o":"o","b":"b","W":"w","g":"g","e":"e","p":"p","w":"w","a":"a","E":"ɛ","U":"ʊ","r":"r","f":"f","N":"ŋ","*":"ɚ","Q":"aw","O":"ɑ","R":"ɹ","v":"v","T":"θ","%":"oɹ","#":"aɹ","~":"n","S":"ʃ","(":"iɹ",")":"oɹ","c":"ʧ","G":"ʤ","3":"ɹ","L":"l","7":"oj","M":"m","Z":"ʒ"," ":" "}

for line in intext:
    for letter in line:
	if letter in encoding :
		stringtoprint=encoding[letter]
		#stringtoprint= unicode(stringtoprint)
		#print (stringtoprint)
		#outtext.write(stringtoprint)
	else :
		stringtoprint=letter
		#print letter
	#stringtoprint= unicode(stringtoprint)
	outtext.write(stringtoprint)

intext.close()
outtext.close()
