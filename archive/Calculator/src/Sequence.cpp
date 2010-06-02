/*
 * Sequence.cpp
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#include "Sequence.h"
#include <string>
#include <iostream>
using namespace std;

void Sequence::init(char* characterInput){
	negative = false;

	cerr<<"Creating a Sequence using input:  "<< characterInput<<endl;

	size = strlen(characterInput);//TBD: make a function to find the end of a char*

	int leadingTrashCount = 0;
	/*
	 * read negative character
	 */
	if (characterInput[0] == '-')
	{
		cerr<<"its a negative number"<<endl;
		negative=true;
		leadingTrashCount++;
		size--;
	}else{
		negative=false;
	}

	/*
	 * Remove leading zeros
	 */
	while(characterInput[leadingTrashCount] == '0')
	{
		cerr<<"this leading zero is being ignored"<<endl;
		leadingTrashCount++;//look at the next one
		size--;
	}
	store = new int[size];
	cerr <<"Memory was allocated here is the reference: "<< &store <<endl;

	/*
	 * Put remaining integers into the store
	 */
	int top=0;
	for(int i =size-1; i>=leadingTrashCount; i--){
		char tempChar = characterInput[i];
		int charAsInt = tempChar - '0';
		cerr<< charAsInt<<" these values should match " <<tempChar<<endl;
		store[top]=charAsInt;
		top++;
		//cout<<top;
	}

}

Sequence::Sequence() {
	// TODO Auto-generated constructor stub

}

Sequence::~Sequence() {
	// TODO Auto-generated destructor stub
}
