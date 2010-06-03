/*
 * LargeInt.cpp
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#include "LargeInt.h"
#include <string>
#include <iostream>
#include "Sequence.h"
using namespace std;

LargeInt::LargeInt(char* characterInput):value(characterInput){

	if (trace)cout<<"Creating a largeint"<<endl;
	//if declared here rather than above in intialization list, the result is a local variable which is pretty useless.
	//Sequence value2(characterInput);
}

void LargeInt::Add( LargeInt &input){
	int temp = input.getSize();
	if (trace) cout<<endl<<"Checking the size of the accumulator..."<<getSize()<<
			"\nChecking the size of the input...\t\t"<<input.getSize()<<endl;
	if (trace) cout<<endl<<"Checking the originalstring of the accumulator..."<<getOriginalString()<<
				"\nChecking the originalstring of the input...\t\t"<<input.getOriginalString()<<endl;


}

LargeInt::LargeInt() {
	// TODO Auto-generated constructor stub

}

LargeInt::~LargeInt() {


	// TODO Auto-generated destructor stub
}

int LargeInt::getSize(){
	return value.getSize();

}

char* LargeInt::getOriginalString(){
	return value.getOriginalString();
}
