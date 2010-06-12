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




Rectangle::Rectangle(int x) : Shape(x){ //page 235: solved error: no matching function for call to 'Shape::Shape()'
	cout<<"A rectangle was created."<<endl;
	// TODO Auto-generated constructor stub

}




Rectangle::~Rectangle() {
	// TODO Auto-generated destructor stub
}
