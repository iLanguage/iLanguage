//============================================================================
// Name        : GeometricShapes Application
// Author      : gina
// Version     : 1
// Copyright   : June 2010
// Description : Sample driver for a client which uses the GeometricShapes application
// Contents    : ShapeDisplayManager 	- Console User interface and test engine
//				 Shape					- Classes which implements mathematical functions and draws shapes
//					Rectangle
//						Square
//					Triangle
//						RightTriangle
//						IsocolesTriangle
//					Rhombus
//				ShapeView				- Graphical manager which allows the user to
//											easily change the foreground and background of the shape display, and
//											reuse the settings for multiple shapes
//============================================================================

#include <iostream>
#include "ShapeDisplayManager.h"
#include "ShapeView.h"
#include "Shape.h"

#include "ShapeTest.h"
//#include <boost>
//#include "cute"

using namespace std;

int main() {

	//how to call the cute test suit?
	//cute::suite s;
	//s.push_back(CUTE(ShapeTest::ginasTest));
	//ShapeTest::runSuite();

	ShapeDisplayManager sdm;
	sdm.run();
	return 0;
}
