/*
 * Triangle.h
 *
 *  Created on: Jun 21, 2010
 *      Author: gina
 */

#ifndef TRIANGLE_H_
#define TRIANGLE_H_

#include "Shape.h"

class IsoscelesTriangle: public Shape {
public:
	virtual double geoArea() const;
	virtual int scrArea() const;
	virtual double geoPerimeter() const;
	virtual int scrPerimeter() const;

	virtual string toStringFilled(char forground = '*', char background = ' ') const;
	virtual string toStringHollow(char forground = '*', char background = ' ') const;
	IsoscelesTriangle(int inHeight);
	virtual ~IsoscelesTriangle();
};

#endif /* TRIANGLE_H_ */
