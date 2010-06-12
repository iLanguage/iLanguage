/*
 * Shape.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "Shape.h"
#include <string>
#include <iostream>
using namespace std;

int Shape::getHeight()const {
	int temp= 1;
	cout<<"Height: ";
	//cin<<(getline,temp);
	return temp;
}

Shape::Shape(int x) {
	id = autoIncrement;
	autoIncrement++;
	name = "Shape";
	height = x;
	width = x;
	cout<<"A shape was created."<<endl;
}

Shape::~Shape() {
	// TODO Auto-generated destructor stub
}
