/*
 * Shape.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "Shape.h"
#include <string>
#include <iostream>
#include <sstream>
using namespace std;

int Shape::autoIncrement = 0;
bool Shape::trace = true;
void Shape::setTrace(bool newTrace){
	trace = newTrace;
}

Shape::Shape() {
	id = autoIncrement;
	autoIncrement++;
	if(trace) cout<<"A shape was created."<<endl;
}

Shape::~Shape() {
	// TODO Auto-generated destructor stub
}

int Shape::getHeight() const {
	return height;
}
int Shape::getWidth() const{
	return width;
}
string Shape::getName() const{
	return name;
}
int Shape::getID() const{
	return id;
}
string Shape::toStringInfo() const{
	stringstream info;
	info << "Shape Information"
			"\nid: "<<id<<
			"\nname: "<<name<<
			"\nwidth: "<<width<<
			"\nheight: "<<height<<
			//"\nscreen area: "<<scrArea()<<
			//"\ngeographic area: "<<geoArea()<<
			//"\nscreen perimeter: "<<scrPerimeter()<<
			//"\ngeographic perimeter: "<<geoPerimeter()<<
			endl;
	return info.str();
}
