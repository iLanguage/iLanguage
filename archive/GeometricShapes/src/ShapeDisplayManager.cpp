/*
 * ShapeDisplayManager.cpp
 *	Console User Interface, contains the meat of the application's logic.
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeDisplayManager.h"
#include "Shape.h"
#include "ShapeView.h"
#include "Rectangle.h"
#include "RightTriangle.h"
#include "IsoscelesTriangle.h"
#include "Rhombus.h"
#include "Square.h"
#include "Framer.h"
#include <iostream>
#include <string>
#include <vector>
using namespace std;

void ShapeDisplayManager::run(){
	cout<< "Shape Interactive Management System"<<endl;
	printMenu();
	runTests();
	//runInteractively();
}
void ShapeDisplayManager::printMenu(){
	string menu= "Choose one of the following operations:\n"
			"c: create a shape \n"
			"r: remove a shape \n"
			"d: display a shape \n"
			"t: total number of shapes \n"
			"l: list all shape id numbers \n\n"

			"Debugging Menu:\n"
			"s: trace the behavior of the application\n"
			"o: turn off tracing\n\n"
			"y: run all the tests\n\n"

			"q: quit \n";
	Framer framedMenu(menu,"Main Menu","    ");
	cout<<framedMenu.toString();

}
/*
 * Overloaded << so as to easily print a ShapeView object
 */
//overload << to get this usage:
//cout << sv << endl;	// display the ShapeView object
//solved by moving it into the source where it is called: error: no match for 'operator<<' in 'std::cout << svUsingVector'
//solved by putting const on the end of the drawBorders function: error: passing 'const ShapeView' as 'this' argument of 'const std::string ShapeView::drawBorders()' discards qualifiers
ostream &operator<<(ostream& sout, const ShapeView& num)//can declare it anywhere in your source (anywhere in the file that you use it)
{
	sout<< num.drawBorders();
	return sout;//it comes in as a reference, it goes out as a reference
}
/*
 * runTests() serves to regression test the application to ensure that functionality is lost after changes to the application.
 * 		- runTests can be turned on via the "t" option in the user menu.
 * 		- runTests can also be used as examples of creating and displaying shapes.
 */
void ShapeDisplayManager::runTests(){
	cout<<endl<<"Performing tests on the Shape class"<<endl;
	//Shape myShape();

	//Shape* trickyShapePointer = new Rectangle(6,2);//
	//cout<<trickyShapePointer.toStringInfo()<<endl;

	Rectangle myRectangle(4,5);
	cout<<myRectangle.toStringInfo()<<endl;
	Rectangle anotherRectangle(6,8);
	cout<<anotherRectangle.toStringInfo()<<endl;

	RightTriangle myRightTriangle(3);
	cout<<myRightTriangle.toStringInfo()<<endl;

	cout<<"Copying a rectangle to a new rectangle"<<endl;
	Rectangle copiedRectangle(anotherRectangle);
	cout<<copiedRectangle.toStringInfo()<<endl;

	cout<<"Copying a rectangle to an existing rectangle"<<endl;
	copiedRectangle = myRectangle;
	cout<<copiedRectangle.toStringInfo()<<endl;


	cout<<"Putting some shapes into the vector."<<endl;
	shapeList.push_back(&myRectangle);
	//shapeList.push_back(&myRightTriangle);
	//shapeList.push_back(&anotherRectangle);

	RightTriangle anotherRightTriangle(19);
	shapeList.push_back(&anotherRightTriangle);

	cout << "ShapeList is now size: "<<shapeList.size()<<endl;
	//if (Shape::trace) listShapes();

	cout << "Finding shape with id 4"<<endl;
	int foundIDposition = findShape(4);
	cout <<"\tFound id at position: "<<foundIDposition <<endl;

	cout<<"Displaying shape with id 4"<<endl;
	displayShape(4);

	cout<<"Displaying a hollow version of shape 4, using the default fill characters."<<endl;
	cout<<shapeList[foundIDposition]->toStringHollow('o','.');
	cout<<"Displaying a hollow version of shape 4, using the o as the forground and . as the background."<<endl;
	cout<<shapeList[foundIDposition]->toStringHollow('o','.');

	ShapeView sv(&myRectangle);
	cout << "Displaying a string with borders drawn around it."<<endl;
	cout << sv.drawBorders();

	ShapeView svUsingVector(shapeList[foundIDposition]);
	cout << "Displaying a string with borders drawn around it."<<endl;
	cout << svUsingVector.drawBorders();

	cout<<"Displaying a ShapeView by just printing it, \n\tprinting it first as\n\tfilled, \n\tthen hallow, \n\tthen info"<<endl;
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::INFO);
	cout<<svUsingVector<<endl;

	sv.setFillType(ShapeView::INFO);
	cout<<sv<<endl;

	cout<<"Testing the assignment operator in the shapeview class"<<endl;
	Rectangle tallRectangle(8,3);
	shapeList.push_back(&tallRectangle);
	foundIDposition = findShape(tallRectangle.getID());
	svUsingVector=shapeList[foundIDposition];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;

	Rectangle bigRectangle(30,35);
	shapeList.push_back(&bigRectangle);
	foundIDposition = findShape(bigRectangle.getID());
	svUsingVector=shapeList[foundIDposition];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;
	svUsingVector.setBackground('.');
	svUsingVector.setForground('o');
	cout<<svUsingVector<<endl;

	cout<<"Testing the square class."<<endl;
	Square mediumSquare(10);
	shapeList.push_back(&mediumSquare);
	foundIDposition =findShape(mediumSquare.getID());
	svUsingVector = shapeList[foundIDposition];
	cout<<svUsingVector<<endl;

	cout<<"Testing the right triangle class."<<endl;
	RightTriangle mediumRightTriangle(10);
	shapeList.push_back(&mediumRightTriangle);
	foundIDposition = findShape(mediumRightTriangle.getID());
	svUsingVector = shapeList[foundIDposition];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;

	cout<<"Testing the isosceles triangle class."<<endl;
	IsoscelesTriangle mediumIsoTriangle(12);
	shapeList.push_back(&mediumIsoTriangle);
	foundIDposition = findShape(mediumIsoTriangle.getID());
	svUsingVector = shapeList[foundIDposition];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;

	cout<<"Testing the rhombus class."<<endl;
	Rhombus mediumRhombus(11);
	shapeList.push_back(&mediumRhombus);
	foundIDposition = findShape(mediumRhombus.getID());
	svUsingVector = shapeList[foundIDposition];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;
}
/*
 * runInteractively waits for user input to perform the operation that the user requests
 */
void ShapeDisplayManager::runInteractively(){
	bool keepRunning=true;
	string userInputString;

	Rectangle startingShape(1,1);
	ShapeView shapeViewer(&startingShape);

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
				listShapes();
				break;
			case 's':
				Shape::setTrace(true);
				cout<<"Tracing is on."<<endl;
				break;
			case 'o':
				Shape::setTrace(false);
				cout<<"Tracing is off."<<endl;
				break;
			case 'y' :
				runTests();
				break;
			default:
				cout<<"Please try again (something is wrong with your input)."<<endl;
		}
	}//end while
	return;

}

/*
 * createShape displays a menu for creating shapes, creates the shape and inserts into the shapeList container.
 */
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
/*
 * getInt is helper function which serves to get integers from user input, it is used by the interactive functions runInteractively and createShape
 */
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
/*
 * findShape cycles through the shapeList to find a shape with a certian shapeID,
 * returns: the position in the shapeList container
 */
int ShapeDisplayManager::findShape(int shapeID){
	  for (int i=0; i<shapeList.size(); i++)
	  {
		  if (shapeID == shapeList.at(i)->getID())
			  return i;
	  }
	  return -1;
}
/*
 * listShapes cycles through the shape list and displays the shape information of each shape.
 */
void ShapeDisplayManager::listShapes(){
	for (int i=0; i<shapeList.size(); i++)
		cout << "Shape at "<<i<<" :" << shapeList.at(i)->toStringInfo();
}
/*
 * displayShape displays information about a shape with a particular shapeID
 *
 */
void ShapeDisplayManager::displayShape(int shapeID){
	int positionFound = findShape(shapeID);
	cout<<shapeList[positionFound]->toStringInfo();

}
/*
 * Constructors
 */
ShapeDisplayManager::ShapeDisplayManager() {
}
ShapeDisplayManager::~ShapeDisplayManager() {
}
