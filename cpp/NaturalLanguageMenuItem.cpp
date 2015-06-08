/*
 * NaturalLanguageMenuItem.cpp
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#include "NaturalLanguageMenuItem.h"
#include <string>
#include <iostream>
using namespace std;

int NaturalLanguageMenuItem::autoincrement = 0;
void NaturalLanguageMenuItem::setAutoincrement(int newAutoincrement){
	autoincrement = newAutoincrement;
}
bool NaturalLanguageMenuItem::trace = false;
void NaturalLanguageMenuItem::setTrace(bool newTrace){
	trace = newTrace;
}
int NaturalLanguageMenuItem::getLastIdUsed(){
	return autoincrement;
}
string NaturalLanguageMenuItem::toString(){
	string temp=action+" "+arguments;
	return temp;
}
NaturalLanguageMenuItem::NaturalLanguageMenuItem(string actionIn, string argumentsIn, string callerIn) {
	action=actionIn;
	arguments=argumentsIn;
	caller=callerIn;
	useFrequency=0;
}

NaturalLanguageMenuItem::NaturalLanguageMenuItem(string actionIn, string callerIn) {
	if(trace) cout<<"Created a Natural Language Menu Item."<<endl;
	action=actionIn;
	arguments="";
	caller=callerIn;
	useFrequency=0;
}

NaturalLanguageMenuItem::NaturalLanguageMenuItem() {
	if(trace) cout<<"Created a default Natural Language Menu Item."<<endl;
	action="print";
	arguments="menu";
	caller="UserInterface";
	useFrequency=0;
}

NaturalLanguageMenuItem::~NaturalLanguageMenuItem() {
	// TODO Auto-generated destructor stub
}
