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

//int NaturalLanguageMenuItem::autoIncrement = 0;
bool NaturalLanguageMenuItem::trace = false;
void NaturalLanguageMenuItem::setTrace(bool newTrace){
	trace = newTrace;
}
int NaturalLanguageMenuItem::getLastIdUsed(){
	return autoIncrement;
}
NaturalLanguageMenuItem::NaturalLanguageMenuItem(string actionIn, string argumentsIn, string callerIn) {
	action="print";
	arguments="menu";
	caller="UserInterface";
}

NaturalLanguageMenuItem::NaturalLanguageMenuItem() {
	if(trace) cout<<"Created a default Natural Language Menu Item."<<endl;
	action="print";
	arguments="menu";
	caller="UserInterface";
}

NaturalLanguageMenuItem::~NaturalLanguageMenuItem() {
	// TODO Auto-generated destructor stub
}
