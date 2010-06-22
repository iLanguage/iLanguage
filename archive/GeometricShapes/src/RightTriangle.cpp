/*
 * RightTriangle.cpp
 *
 *  Created on: Jun 14, 2010
 *      Author: gina
 */
#include "RightTriangle.h"
#include <iostream>
#include <sstream>
#include <cmath>
using namespace std;

double RightTriangle::geoArea() const {
	return (height * height)/2;
}
int RightTriangle::scrArea() const{
	return height *(height+1)/2;
}
double RightTriangle::geoPerimeter() const {
	return 2+ sqrt(2)*height;
}
int RightTriangle::scrPerimeter() const {
	return 3*(height -1);
}

string RightTriangle::toStringFilled(char forground, char background) const{
	stringstream filled;
		for(int i=1;i<=height;i++){
			for(int k=1;k<=i;k++){
				filled<<forground;
			}
			filled<<endl;
		}
		return filled.str();
}
string RightTriangle::toStringHollow(char forground, char background) const{
	stringstream hallow;
	//print first line
	hallow<<forground<<endl;
	//print middle lines
	for (int i=1;i<height-1;i++){
		hallow<<forground;
		for(int j=1;j<i;j++){
			hallow<<background;
		}
		hallow<<forground<<endl;
	}
	//print last line
	for (int k=0;k<width;k++){
		hallow<<forground;
	}
	hallow<<endl;
	return hallow.str();
}

RightTriangle::RightTriangle(int inHeight):Shape() {
	height=inHeight;
	width=inHeight;
	name="Right Triangle";
	if (Shape::trace) cout<<"A right triangle was created"<<endl;
}
RightTriangle::~RightTriangle() {
}
