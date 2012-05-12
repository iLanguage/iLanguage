#-*- coding: utf-8 -*-
# try to write a unicode letter finder in python
#! /usr/bin/env python
import codecs
import sys #for call arguments
import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting
import re #for regular expressions
#tokenize on letters (if the same letter, then consider 1 token)


filename= sys.argv[1]
intext = codecs.open(filename, encoding='utf-8')
filenameout=filename+"-words.txt"
outtext = codecs.open(filenameout, encoding='utf-8', mode='w')


words = {}
#wordcount = {}
for line in intext:
	line = line.rstrip()
	#line = unicode(line)
	linearray = re.split("[ .,-]",line)#use simple split, use "coreness" to discover punctuation. when hard coded the following punt list it creates problem for french a in gateau ("['““’ --–\"’'·.,;:_!=@/(){}&~%$^*+?\[\]\\\\]",line)# punctuation characters hand built from inuktitut assembly texts, largely determines later results in the letter lists
	for word in linearray:
        	if word in words:
        		words[word] +=1
        	else:
        		words[word] = 1
            

#Sort the characters by most frequent and put into a list of tuples
sorted_list = sorted(words.iteritems(),key=operator.itemgetter(1), reverse=True)

#Output the count of characters    
#pickle.dump(charcount,outtext)

#print sorted_list

totalcharcount=0
for x,y in sorted_list:
    #x = unicode(x)
    totalcharcount = totalcharcount+y
    y= unicode(y)
    stringtoprint=x+"\t"+y+"\n"
    outtext.write(stringtoprint)

print ('    Total words in file: ',totalcharcount)
intext.close()
outtext.close()
