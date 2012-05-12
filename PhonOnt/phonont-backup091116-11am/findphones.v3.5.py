#-*- coding: utf-8 -*-
# try to write a unicode letter finder in python
#! /usr/bin/env python
import codecs
import sys #for call arguments
import operator # for sorting by value http://wiki.python.org/moin/HowTo/Sorting
import re # for regular expressions
import unicodedata # for identifying punctuation in unicode http://www.amk.ca/python/howto/unicode

#tokenize on letters (if the same letter, then consider 1 token)

#filename="InukMagazine102-104rough-inuktitut.txt"
#filename="inuktitut-unicode.txt"
language="Inuktitut"
segmentType="Orthographic"      #by default, later add code to allow more options in the call arguments

filename= sys.argv[1]
language= sys.argv[2]
segmentType=sys.argv[3]

intext = codecs.open(filename, encoding='utf-8')

filenameout=filename+"-lettersByWordCount.txt"
outtext = codecs.open(filenameout, encoding='utf-8', mode='w')

wordsnotused=filename+"-lettersByWordCount.txt-wordsnotused.txt"
outtextnotused = codecs.open(wordsnotused, encoding='utf-8', mode='w')
#punctuation was mostly eliminated by the word count script, but punctuation can be discovered if it has a suprizingly limited sourrounding letters (ie always folowed by a space) this can be discovered in the biphones script
#punctuation = ".,;:_!?=@+/(){}[]&~-*%~$^"



#goes through the word list or corpus, counting the number of words which each letter appears in. Foreign letters should appear in few words, native letters shoudl appear in many words 
dictionary = {}
uselessword =re.compile("^\d\d+$")    #if its one digit its possible its a word, but if its two digits its unlikely
for line in intext:
    stuff= line.split()
    word=stuff[0]

    #if int(word) == int(1):
    #    print("its an integer")
    #else:
    #    print("its a word",word)
        
    m = uselessword.match(word)
    if m:
        #print ("This is a uselessword: "+word)
        outtextnotused.write(line)
        continue
    #print("This is the line: "+word)
    
    charcount = {}
    uniqueLetters=""
    for x in word:
        
        if x in charcount:
            charcount[x] +=1
        else:
           charcount[x] = 1
           uniqueLetters=uniqueLetters+x
    #print("These are the unique letters in the line: "+uniqueLetters)



    for letter in uniqueLetters:
        #adds a key or increments its count in the dictionary, if not whitespace
        letter = unicode(letter)
        #print ("This letter ("+letter+")is a unicode: "+unicodedata.category(letter))
        unicodeCategory = re.compile(unicodedata.category(letter))
        #unicodeNonalphanumeric = re.compile(\W) #When the LOCALE and UNICODE flags are not specified, matches any non-alphanumeric character; this is equivalent to the set [^a-zA-Z0-9_]. With LOCALE, it will match any character not in the set [0-9_], and not defined as alphanumeric for the current locale. If UNICODE is set, this will match anything other than [0-9_] and characters marked as alphanumeric in the Unicode character properties database.
        if not (letter.isspace() or unicodeCategory.match("Po")  ): #Removed to handle passimaquoddy transcriptions and arabic transcriptions: or letter.isdigit() 
		dictionary[letter] = dictionary.get(letter,0) + 1
        #elif (unicodeCategory.match("Po")):
            #print("This letter ("+letter+") isn't considered a letter in the language, excluding it from the count.")
        
            

#Sort the characters by most frequent and put into a list of tuples
sorted_list = sorted(dictionary.iteritems(),key=operator.itemgetter(1), reverse=True)

#Output the count of characters    
#pickle.dump(charcount,outtext)

#print sorted_list

totalcharcount=0
mostFrequentLetter=0
coreLetterCertainty="Core"      #used to create "fuzzy sets" based on letter frequencies of core and non core letters that represent the language declared in the file input

for x,y in sorted_list:
    if y > mostFrequentLetter:
        mostFrequentLetter = y
        #print(mostFrequentLetter)
        print ("    Most Frequent letter ,",mostFrequentLetter)
    #debug print(x,y)
    #try:
    #    print ("This letter ("+x+")is a unicode: "+unicodedata.category(x))
    #except IndexError, e:
    #            print ("Warning: ")
    #            print (e)
    x = unicode(x)
    #totalcharcount = totalcharcount+y
    
    letterCertainty =language+"-"+segmentType+"-Core"
    onePercent=mostFrequentLetter*0.01              #creates a cut off for non-core letters at 1% which roughly approximates 1-2% under the curve
    topPercent=mostFrequentLetter*0.5				#creates a cut off for the most prototypical letters, motivated intuitively based on looking at the variety of corpus
    if (y > topPercent ):
        letterCertainty = language+"-"+segmentType+"-VeryCore"
    if (y < onePercent ):
        letterCertainty = language+"-"+segmentType+"-NotCore"
    y= unicode(y)
    stringtoprint=x+"\t"+y+"\t"+language+"\t"+segmentType+"\t"+letterCertainty+"\n"
    outtext.write(stringtoprint)



#print totalcharcount
intext.close()
outtext.close()
