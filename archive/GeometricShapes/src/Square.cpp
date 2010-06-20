/*
 * Square.cpp
 *
 *  Created on: Jun 20, 2010
 *      Author: gina
 */

#include "Square.h"
#include <iostream>

Square::Square(int side) : Rectangle(side,side) {
	//height = side;
	//width = side;
	name="Square";
	if (Shape::trace) cout<<"A square was created."<<endl;
}

Square::~Square() {
}
