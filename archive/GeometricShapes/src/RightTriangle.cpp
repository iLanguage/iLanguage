/*
 * RightTriangle.cpp
 *
 *  Created on: Jun 14, 2010
 *      Author: gina
 */

#include "RightTriangle.h"
#include <iostream>
#include <sstream>
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

string RightTriangle::toStringFilled(char forground, char background) const{
	stringstream filled;
	filled<<" filled";
	return filled.str();
}
string RightTriangle::toStringHollow(char forground, char background) const{
	stringstream hallow;
	hallow<<" hallow";
	return hallow.str();
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
