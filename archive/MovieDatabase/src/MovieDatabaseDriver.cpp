//============================================================================
// Name        : MovieDatabase.cpp
// Author      : gina
// Version     :
// Copyright   : 
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <iostream>
#include "DBManager.h"
using namespace std;

int main() {
	DBManager dbm;
	dbm.run();
	cout << "It runs." << endl; // prints It runs.
	return 0;
}
