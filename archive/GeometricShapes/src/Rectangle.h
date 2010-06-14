/*
 * Rectangle.h
 *
 *  Created on: Jun 12, 2010
 *      Author: gina
 */

#ifndef RECTANGLE_H_
#define RECTANGLE_H_

#include "Shape.h"

class Rectangle: public Shape {
public:
	double geoArea() const;
	int scrArea() const;
	double geoPerimeter() const;
	int scrPerimeter() const;

	Rectangle(int inHeight,int inWidth);
	virtual ~Rectangle();
};

#endif /* RECTANGLE_H_ */
