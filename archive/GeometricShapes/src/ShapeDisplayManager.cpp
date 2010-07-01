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
	//runObjectPoolTests();
	//runTests();
	//listShapes();
	runInteractively();
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
void ShapeDisplayManager::runObjectPoolTests(){
	cout<<endl<<"Performing tests on the shapelist object pool."<<endl;
	shapeList.push_back(new Rectangle(6,2));
	listShapes();
}
void ShapeDisplayManager::runTests(){
	cout<<endl<<"Performing tests on the Shape class"<<endl;
	Shape::setTrace(true);
	//Shape myShape();

	//Shape* trickyShapePointer = new Rectangle(6,2);//
	//cout<<trickyShapePointer.toStringInfo()<<endl;

	Rectangle anotherRectangle(6,8);
	cout<<anotherRectangle.toStringInfo()<<endl;

	RightTriangle myRightTriangle(3);
	cout<<myRightTriangle.toStringInfo()<<endl;

	cout<<"Copying a rectangle to a new rectangle"<<endl;
	Rectangle copiedRectangle(anotherRectangle);
	cout<<copiedRectangle.toStringInfo()<<endl;

	cout<<"Copying a rectangle to an existing rectangle"<<endl;
	anotherRectangle = copiedRectangle;
	cout<<anotherRectangle.toStringInfo()<<endl;


	cout<<"Putting some shapes into the vector."<<endl;
	shapeList.push_back(new Rectangle(10,6));
	shapeList.push_back(new RightTriangle(6));
	shapeList.push_back(new Rectangle(7,8));
	shapeList.push_back(new RightTriangle(19));

	cout << "ShapeList is now size: "<<shapeList.size()<<endl;
	if (Shape::trace) listShapes();


	cout << "Finding shape with id 4"<<endl;
	int foundIDposition = findShape(4);
	cout <<"\tFound id at position: "<<foundIDposition <<endl;

	cout<<"Displaying shape with id 4"<<endl;
	displayShape(4);

	cout<<"Displaying a hollow version of shape 4, using the default fill characters."<<endl;
	cout<<shapeList[foundIDposition]->toStringHollow();
	cout<<"Displaying a hollow version of shape 4, using the o as the forground and . as the background."<<endl;
	cout<<shapeList[foundIDposition]->toStringHollow('o','.');

	ShapeView sv(&anotherRectangle);
	cout << "Displaying a rectangle with borders drawn around it."<<endl;
	cout << sv.drawBorders();

	ShapeView svUsingVector(shapeList[foundIDposition]);
	cout << "Displaying id 4 with borders drawn around it."<<endl;
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
	shapeList.push_back(new Rectangle(8,3));
	foundIDposition = Shape::getLastIdUsed()-1;
	listShapes();
	cout<<"Last shape has id: " <<foundIDposition<<endl;
	svUsingVector=shapeList[findShape(foundIDposition)];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;


	shapeList.push_back(new Rectangle(30,35));
	foundIDposition = Shape::getLastIdUsed()-1;
	cout<<"Last shape has id: " <<foundIDposition<<endl;
	svUsingVector=shapeList[findShape(foundIDposition)];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;
	svUsingVector.setBackground('.');
	svUsingVector.setForground('o');
	cout<<svUsingVector<<endl;

	cout<<"Testing the square class."<<endl;
	shapeList.push_back(new Square(10));
	foundIDposition = Shape::getLastIdUsed()-1;
	svUsingVector=shapeList[findShape(foundIDposition)];
	cout<<svUsingVector<<endl;

	cout<<"Testing the right triangle class."<<endl;
	shapeList.push_back(new RightTriangle(10));
	svUsingVector=shapeList[findShape(Shape::getLastIdUsed()-1)];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;

	cout<<"Testing the isosceles triangle class."<<endl;
	shapeList.push_back(new IsoscelesTriangle(12));
	svUsingVector=shapeList[findShape(Shape::getLastIdUsed()-1)];
	svUsingVector.setFillType(ShapeView::FILLED);
	cout<<svUsingVector<<endl;
	svUsingVector.setFillType(ShapeView::HALLOW);
	cout<<svUsingVector<<endl;

	cout<<"Testing the rhombus class."<<endl;
	shapeList.push_back(new Rhombus(11));
	svUsingVector=shapeList[findShape(Shape::getLastIdUsed()-1)];
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
				removeShape(getInt("Please enter the ID of the shape which you would like to remove."));
				break;
			case 'd':
				displayShape(getInt("Please enter the ID of the shape which you would like to display."));
				break;
			case 't':
				cout<<"The total number of shapes is: "<<shapeList.size()<<endl;
				break;
			case 'l':
				listShapeIds();
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
	int userWidth=10;
	int userHeight=5;

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
				cout<<"Creating an Isosceles Triangle"<<endl;
				userHeight=getInt("Please enter the height of the triangle: ");
				shapeList.push_back(new IsoscelesTriangle(userHeight));
				keepRunning=false;
				break;
			case '2':
				cout<<"Creating a Right Triangle"<<endl;
				userHeight=getInt("Please enter the height of the triangle: ");
				shapeList.push_back(new RightTriangle(userHeight));
				keepRunning=false;
				break;
			case '3':
				cout<<"Creating a Rhombus"<<endl;
				userHeight=getInt("Please enter the length of the diagonal: ");
				shapeList.push_back(new Rhombus(userHeight));
				keepRunning=false;
				break;
			case '4':
				cout<<"Creating a Rectangle"<<endl;
				userHeight=getInt("Please enter the height of the rectangle: ");
				userWidth=getInt("Please enter the width of the rectangle: ");
				shapeList.push_back(new Rectangle(userHeight,userWidth));
				keepRunning=false;
				break;
			case '5':
				cout<<"Creating a Square"<<endl;
				userHeight=getInt("Please enter the side length of the square: ");
				shapeList.push_back(new Square(userHeight));
				keepRunning=false;
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
	if (Shape::trace) cout<< "\n\nDisplaying all Shapes:\n"<<endl;
	for (int i=0; i<shapeList.size(); i++)
		cout << endl<<"Shape at "<<i<<" :"<<endl << shapeList.at(i)->toStringInfo();
	if (Shape::trace) cout<< "\nAll Shapes were displayed.\n\n"<<endl;
}
void ShapeDisplayManager::listShapeIds(){
	cout <<"The following shapes are available for display: ";
	for (int i=0; i<shapeList.size(); i++)
			cout << shapeList.at(i)->getID()<<", ";
	cout<<endl;
}
/*
 * displayShape displays information about a shape with a particular shapeID
 *
 */
void ShapeDisplayManager::displayShape(int shapeID){
	if(findShape(shapeID)>-1){
		shapeViewObject=shapeList[findShape(shapeID)];
		shapeViewObject.setFillType(ShapeView::INFO);
		cout<<shapeViewObject;
		shapeViewObject.setFillType(ShapeView::FILLED);
		cout<<shapeViewObject;
		shapeViewObject.setFillType(ShapeView::HALLOW);
		cout<<shapeViewObject;
	}else{
		cout<<"A shape with that ID number was not found. Please try again."<<endl;
	}
}
void ShapeDisplayManager::removeShape(int shapeID){
	// erase the 6th element
	int positionToErase = findShape(shapeID);
	if (positionToErase > -1)
		shapeList.erase(shapeList.begin()+positionToErase);
	else
		cout<<"Shape "<<shapeID<<" wasn't found so it was not deleted."<<endl;
}


/*
 * Constructors
 */
ShapeDisplayManager::ShapeDisplayManager() {
	Rectangle tempRectangle(5,10);
	shapeViewObject=&tempRectangle;
	//shapeViewObject.setBackground('.');
	//shapeViewObject.setForground('o');
	/*shapeViewObject.setFillType(ShapeView::INFO);
	cout<<shapeViewObject;
	shapeViewObject.setFillType(ShapeView::FILLED);
	cout<<shapeViewObject;
	shapeViewObject.setFillType(ShapeView::HALLOW);
	cout<<shapeViewObject;*/
}
ShapeDisplayManager::~ShapeDisplayManager() {
}
