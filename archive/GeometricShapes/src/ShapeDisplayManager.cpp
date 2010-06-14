/*
 * ShapeDisplayManager.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeDisplayManager.h"
#include "Shape.h"
#include "ShapeView.h"
#include "Rectangle.h"
#include "RightTriangle.h"
#include <iostream>
#include <string>
#include <vector>
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
	runTests();
	//runInteractively();
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
void ShapeDisplayManager::runTests(){
	cout<<endl<<"Performing tests on the Shape class"<<endl;
	Shape myShape();

	Rectangle myRectangle(4,5);
	cout<<myRectangle.toStringInfo()<<endl;
	Rectangle anotherRectangle(6,8);
	cout<<anotherRectangle.toStringInfo()<<endl;

	RightTriangle myRightTriangle(3);
	cout<<myRightTriangle.toStringInfo()<<endl;
}


void ShapeDisplayManager::runInteractively(){
	bool keepRunning=true;
	string userInputString;

	while(keepRunning){
		cout<<"\nEnter input: ";
		getline(cin,userInputString);
		//cerr<<"\t\tUserInput: "<<userInputString<<endl;

		char operation = userInputString[0];
		userInputString[0]='0';
		//cerr<<"\t\tOperation: "<<operation<<endl;

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
				createShape();
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
		//cerr<<"\t\tUserInput: "<<userInputString<<endl;

		char operation = userInputString[0];
		operation = operation;
		userInputString[0]='0';
		//cerr<<"\tOperation: "<<operation<<endl;

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
				cout<<"Creating a rectangle"<<endl;
				//Shape rectangle2(4); // error:   crosses initialization of 'Shape rectangle2'
				//shapeList.push_back(rectangle1); //error: no matching function for call to 'std::vector<Shape*, std::allocator<Shape*> >::push_back(Shape (&)())'
				keepRunning=false;
				break;
			case '5':
				break;
			default:
				cout<<"Please try again."<<endl;
				break;
		}
	}//end while
	return;
}
int ShapeDisplayManager::getInt(string prompt) // definition of getInt(string) from FAQ
{
	cout << prompt;
	int x;
	cin >> x;
	while ( ! cin )
	{
		cin.clear();
		string badinput;
		getline(cin, badinput);
		cerr << "Expected an integer but found " << badinput << endl << prompt;
		cin >> x;
	}
	// Optionally clear the remaining characters in the input stream;
	// for example, for a user input '123xyz', 123 is extracted to x and,
	// here we choose to discard 'xyz' which is still in the input stream
	string leftover;
	getline(cin, leftover);
	return x; // ignore leftover
}
