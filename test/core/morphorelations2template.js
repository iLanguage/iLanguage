#-*- coding: utf-8 -*-

# try to write a unicode letter finder in python

#! /usr/bin/env python

import codecs

import sys #for call arguments

import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting

import re #for regular expressions

from subprocess import call

filename= sys.argv[1]
intext = codecs.open(filename, encoding='utf-8')

filenameout="inuktitut-precedencerelations_template"
outtext = codecs.open(filenameout, encoding='utf-8', mode='w')

morphtemplate= []

#getfirst line and use it for mostfrequent word

line=intext.readline()

mostfrequentsequence = 0
goodmorphemefactor=0.05

line = line.strip()
#line = line.lower()

lineArray=line.split()

print repr(lineArray[1])

#mostfrequentsequence will be on top if the array is sorted
mostfrequentsequence=int(lineArray[1])

print("Mostfrequent morpheme sequence in the current dense corpus appeared "+repr(mostfrequentsequence)+" times.\nSequences will be considered potential valid sequences if they appear more than "+repr(mostfrequentsequence*goodmorphemefactor)+" times")

morphtemplate.append(lineArray[0])



for line in intext:

    line = line.strip()
    #line = line.lower()
    lineArray=line.split()
    print repr(lineArray)

    if ((mostfrequentsequence*goodmorphemefactor) <  int(lineArray[1])):

        morphtemplate.append(lineArray[0])

        print ("adding to the sequence ",morphtemplate)
  

#stopwords =stopwords+" "
#stopwords=stopwords.replace('[ 0123456789\#"?!&;:.,-_]'," ",stopwords)
#stopwords = re.compile(stopwords)
#regular expression code size limit exceeded



collocations = {}
#wordcount = {}

prevword= ""

print("Upper and lower case will not be differentiated")



for line in intext:

    line = line.strip()

    line = line.lower()

    #line = unicode(line)

    #p = re.compile('[ 0123456789\#\\(\\)\'\{\}"?!&;:.,-_]')#either remove punctuation here using this or

    p = re.compile('[ 0123456789\\(\\)\#"?!&;:.,-_]')

    #p = re.compile('[ #"?!&;:.,-]')

    lineCleaned=p.sub(" ",line)

    #print repr(line)

    #doesnt work: lineCleaned=line.replace('[ 0123456789#"?!&;:.,-]',' ')

    linearray = lineCleaned.split()#use simple split, could later use "coreness" to discover punctuation, if the puctuation would stop annoying the owl xml code. when hard coded the following punt list it creates problem for french a in gateau ("['““’ --–\"’'·.,;:_!=@/(){}&~%$^*+?\[\]\\\\]",line)# punctuation characters hand built from inuktitut assembly texts, largely determines later results in the letter lists

	

    for word in linearray:

                collocation=prevword+" "+word

                if ( word in stopwords) or (prevword in stopwords):

                    #print ("This collocation has a stopword so it wont be used"+collocation)

                    prevword =word

                    continue

                #print repr(word)

                if collocation in collocations:

        		collocations[collocation] +=1

                else:

        		collocations[collocation] = 1

                prevword=word

            



#Sort the characters by most frequent and put into a list of tuples

sorted_list = sorted(collocations.iteritems(),key=operator.itemgetter(1), reverse=True)



#Output the count of characters    

#pickle.dump(charcount,outtext)



#print sorted_list



totalcharcount=0

for x,y in sorted_list:

    x = unicode(x)

    totalcharcount = totalcharcount+y

    y= unicode(y)

    stringtoprint=x+"\t"+y+"\n"

    outtext.write(stringtoprint)



print ('    Stopwords that were not used:\n'+repr(stopwords))

print ('    Total usefull collocations in file: ',totalcharcount)



intext.close()

outtext.close()

