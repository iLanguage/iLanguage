/*
 * RightTriangle.cpp
 *
 *  Created on: Jun 14, 2010
 *      Author: gina
 */

#include "RightTriangle.h"
#include <iostream>
using namespace std;



double RightTriangle::geoArea() const {
	return height * width;
}
int RightTriangle::scrArea() const{
	return height * width;
}
double RightTriangle::geoPerimeter() const {
	return 2* (height * width);
}
int RightTriangle::scrPerimeter() const {
	return (2 * (height * width) ) - 4;
}

RightTriangle::RightTriangle(int inHeight):Shape() {
	height=inHeight;
	width=inHeight;
	name="Right Triangle";
	if (Shape::trace) cout<<"A right triangle was created"<<endl;
}

RightTriangle::~RightTriangle() {
	// TODO Auto-generated destructor stub
}
