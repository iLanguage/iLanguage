/*
 * Rectangle.cpp
 *
 *  Created on: Jun 12, 2010
 *      Author: gina
 */

#include "Rectangle.h"
#include <iostream>
#include <sstream>
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

string Rectangle::toStringFilled(char forground, char background) const{
	stringstream filled;
	for(int i=0;i<height;i++){
		for(int k=0;k<width;k++){
			filled<<forground;
		}
		filled<<endl;
	}
	return filled.str();
}
string Rectangle::toStringHollow(char forground, char background) const{
	stringstream hallow;
	for (int k=0;k<width;k++){
		hallow<<forground;
	}
	hallow<<endl;
	//print middle lines
	for (int i=0;i<height-2;i++){
		hallow<<forground;
		for(int j=0;j<width-2;j++){
			hallow<<background;
		}
		hallow<<forground<<endl;
	}
	for (int k=0;k<width;k++){
		hallow<<forground;
	}
	hallow<<endl;
	return hallow.str();
}
Rectangle::Rectangle(int inHeight,int inWidth) { //page 235: solved error: no matching function for call to 'Shape::Shape()'
	height = inHeight;
	width = inWidth;
	name="Rectangle";
	cout<<"A rectangle was created."<<endl;
}

Rectangle::~Rectangle() {
}
