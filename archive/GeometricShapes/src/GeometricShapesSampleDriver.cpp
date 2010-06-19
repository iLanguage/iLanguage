//============================================================================
// Name        : GeometricShapesSampleDriver.cpp
// Author      : gina
// Version     :
// Copyright   : 
// Description :
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
