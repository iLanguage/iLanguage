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
	cout << "Choose one of the following operations:\n\n"
			"c: create a shape \n"
			"r: remove a shape \n"
			"d: display a shape \n"
			"t: total number of shapes \n"
			"l: list all shape id numbers \n"
			"q: quit \n";

}
void ShapeDisplayManager::runInteractively(){
	bool keepRunning=true;
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
			case 'm':
				printMenu();
				break;
			case 'c':
				cout<<"Choose one of the following Shapes: \n\n"
						"1: Isosceles Triangle \n"
						"2: Right Triangle \n"
						"3: Rhombus \n"
						"4: Rectangle\n"
						"5: Square\n\n"
						"Enter your choice:";
				break;
			case 'r':
				cout<<"The shape list is empty, try adding a shape."<<endl;
				break;
			case 'd':
				cout<<"The shape list is empty, try adding a shape."<<endl;
				break;
			case 't':
				cout<<"The shape list is empty, try adding a shape."<<endl;
				break;
			case 'l':
				cout<<"The shape list is empty, try adding a shape."<<endl;
				break;

			case 's':
				//Sequence::setTrace = true;
				cout<<"Tracing is on."<<endl;
				break;
			case 'o':
				//Sequence::setTrace(false);
				//LargeInt::setTrace(false);
				cout<<"Tracing is off."<<endl;
				break;
			default:
				cout<<"Please try again (something is wrong with your input)."<<endl;
		}
	}//end while
	return;
}
void ShapeDisplayManager::createShape(){
	cout<<"Choose one of the following Shapes: \n\n"
			"1: Isosceles Triangle \n"
			"2: Right Triangle \n"
			"3: Rhombus \n"
			"4: Rectangle\n"
			"5: Square\n\n"
			"Enter your choice:";

	bool keepRunning=true;
	string userInputString;

	while(keepRunning){
		cout<<"\nEnter input: ";
		getline(cin,userInputString);
		cerr<<"\t\tUserInput: "<<userInputString<<endl;

		char operation = userInputString[0];
		operation = operation+'0';
		userInputString[0]='0';
		cerr<<"\tOperation: "<<operation<<endl;

		switch (operation){
			case 'q' :
				keepRunning=false;
				break;
			case '1':
				break;
			case '2':
				break;
			case '3':
				break;
			case '4':
				break;
			case '5':
				break;
			default:
				cout<<"Please try again (something is wrong with your input)."<<endl;
		}
	}//end while
	return;
}
