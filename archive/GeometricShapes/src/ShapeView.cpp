/*
 * ShapeView.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeView.h"
#include "Shape.h"
#include <string>
#include <sstream>
#include <iostream>

std::string ShapeView::drawBorders(){
	const char VBAR = static_cast<char>(179);// vertical bar
	const char HBAR = static_cast<char>(196);// horizontal bar
	const char BR = static_cast<char>(217);// bottom right
	const char TL = static_cast<char>(218);// top left
	const char TR = static_cast<char>(191);// top right
	const char BL = static_cast<char>(192);// bottom left

	stringstream framedItem;

	framedItem<<"-----------------------\n";
	framedItem<< shapeRecieved->toStringInfo();
	framedItem<<"-----------------------\n";
	return framedItem.str();
}


//overload << to get this usage: (?)
//cout << sv << endl;	// display the ShapeView object

void ShapeView::setFillType(){
	cout<<"The fill type was set."<<endl;
}

ShapeView::ShapeView(const Shape* shapeToDraw) {
	if(Shape::trace) cout<<"Creating a shape view object."<<endl;

	shapeRecieved = shapeToDraw;

}

ShapeView::~ShapeView() {
	// TODO Auto-generated destructor stub
}
