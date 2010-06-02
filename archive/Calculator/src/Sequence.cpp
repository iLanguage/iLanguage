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

Sequence::Sequence(char* characterInput){
	init(characterInput);
}

void Sequence::init(char* characterInput){
	negative = false;
	originalString = characterInput;

	//For grading purposes turn trace on to follow the procedure of turning an character string into the internal data structure
	bool trace=true;


	size = strlen(characterInput);//TBD: make a function to find the end of a char*
	int originalSize =size;
	if (trace)cout<<"Creating a Sequence using input:  "<< characterInput<<" of size "<<size<<endl;


	int leadingTrashCount = 0;
	/*
	 * read negative character
	 */
	if (characterInput[0] == '-')
	{
		negative=true;
		leadingTrashCount++;
		size--;
		if (trace)cout<<"its a negative number, size is now "<<size<<endl;
	}else{
		negative=false;
	}

	/*
	 * Remove leading zeros
	 */
	while(characterInput[leadingTrashCount] == '0')
	{

		leadingTrashCount++;//look at the next one
		size--;
		if (trace) cout<<"this leading zero is being ignored, size is now "<<size<<endl;
	}
	store = new int[size];
	if (trace)cout <<"Memory was allocated here is the reference: "<< &store <<endl;

	/*
	 * Put remaining integers into the store
	 */
	int temp=0;
	for(int i=leadingTrashCount; i<originalSize; i++){
		char tempChar = characterInput[i];
		int charAsInt = tempChar - '0';
		if (trace) cout<< charAsInt<<" these values should match " <<tempChar<<endl;
		store[temp]=charAsInt;
		temp++;
		//cout<<top;
	}

}

Sequence::Sequence() {
	// TODO Auto-generated constructor stub

}

Sequence::~Sequence() {
	// TODO Auto-generated destructor stub
}
