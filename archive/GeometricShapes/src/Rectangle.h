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
	virtual double geoArea() const;
	virtual int scrArea() const;
	virtual double geoPerimeter() const;
	virtual int scrPerimeter() const;


	Rectangle(const Rectangle& rectangleIn);
	Rectangle& operator=(const Rectangle & source);
	Rectangle(int inHeight,int inWidth);
	virtual ~Rectangle();
};

#endif /* RECTANGLE_H_ */
