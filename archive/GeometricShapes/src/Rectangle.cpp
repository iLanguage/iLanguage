/*
 * Rectangle.cpp
 *
 *  Created on: Jun 12, 2010
 *      Author: gina
 */

#include "Rectangle.h"
#include <iostream>
#include "Shape.h"
using namespace std;


double Rectangle::geoArea() const {
	return height * width;
}
int Rectangle::scrArea() const{
	return height * width;
}
double Rectangle::geoPerimeter() const {
	return 2* (height * width);
}
int Rectangle::scrPerimeter() const {
	return (2 * (height * width) ) - 4;
}



Rectangle::Rectangle(int inHeight,int inWidth) { //page 235: solved error: no matching function for call to 'Shape::Shape()'
	height = inHeight;
	width = inWidth;
	name="Rectangle";

	cout<<"A rectangle was created."<<endl;
	// TODO Auto-generated constructor stub

}




Rectangle::~Rectangle() {
	// TODO Auto-generated destructor stub
}
