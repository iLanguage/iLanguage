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
/*
 * copy constructor

RightTriangle::RightTriangle(const RightTriangle& source){
		height = source.height;
		width = source.width;
		name=source.name;
		if (Shape::trace) cout << "A RightTriangle was copied to a new RightTriangle."<<endl;
}
/*
 * assignment operator

RightTriangle& RightTriangle::operator=(const RightTriangle& source){
	if (this != &source){
		height = source.height;
		width = source.width;
		id = source.id;
		name=source.name;
		if (Shape::trace) cout << "A RightTriangle was copied to an existing RightTriangle."<<endl;
	}
	return *this;
}
*/
RightTriangle::~RightTriangle() {
	// TODO Auto-generated destructor stub
}
