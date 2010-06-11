/*
 * ShapeDisplayManager.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeDisplayManager.h"
#include <iostream>
using namespace std;

ShapeDisplayManager::ShapeDisplayManager() {
	// TODO Auto-generated constructor stub

}

ShapeDisplayManager::~ShapeDisplayManager() {
	// TODO Auto-generated destructor stub
}

void ShapeDisplayManager::run(){
	cout<< "Shape Interactive Management System"<<endl;
	printMenu();
	runInteractively();
}

void ShapeDisplayManager::printMenu(){
	cout << "Choose one of the following operations:\n"
			"c: create a shape \n"
			"r: remove a shape \n"
			"d: display a shape \n"
			"t: total number of shapes \n"
			"l: list all shape id numbers \n"
			"q: quit \n";

}
void ShapeDisplayManager::runInteractively(){
	bool keepRunning=true;
	int resultTest = 0;
	string userInputString;

	while(keepRunning){
		cout<<"\nEnter input: ";
		getline(cin,userInputString);
		cerr<<"\t\tUserInput: "<<userInputString<<endl;

		char operation = userInputString[0];
		userInputString[0]='0';
		cerr<<"\tOperation: "<<operation<<endl;

		switch (operation){
			case 'q' :
				keepRunning=false;
				break;
			case 'h':
				printMenu();
				break;
			case 's':
				//Sequence::setTrace = true;
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			case 'l':
				//LargeInt::setTrace(true);
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			case 'o':
				//Sequence::setTrace(false);
				//LargeInt::setTrace(false);
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			default:
				cout<<"Please try again (something is wrong with your input)."<<endl;
		}
	}//end while
	return;
}
