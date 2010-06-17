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
}
/*
 * copy constructor

Rectangle::Rectangle(const Rectangle& source){
		height = source.height;
		width = source.width;
		name=source.name;
		if (Shape::trace) cout << "A rectangle was copied to a new rectangle."<<endl;
}
/*
 * assignment operator

Rectangle& Rectangle::operator=(const Rectangle& source){
	if (this != &source){
		height = source.height;
		width = source.width;
		id = source.id;
		name=source.name;
		if (Shape::trace) cout << "A rectangle was copied to an existing rectangle."<<endl;
	}
	return *this;
}
*/


Rectangle::~Rectangle() {
}
