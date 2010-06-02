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

LargeInt::LargeInt(char* characterInput){

	cerr<<"Creating a largeint"<<endl;
	Sequence value(characterInput);
}
LargeInt::LargeInt() {
	// TODO Auto-generated constructor stub

}

LargeInt::~LargeInt() {
	// TODO Auto-generated destructor stub
}
