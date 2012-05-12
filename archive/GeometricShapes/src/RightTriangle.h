/*
 * RightTriangle.h
 *
 *  Created on: Jun 14, 2010
 *      Author: gina
 */

#ifndef RIGHTTRIANGLE_H_
#define RIGHTTRIANGLE_H_

#include "Shape.h"

class RightTriangle: public Shape {
public:
	virtual double geoArea() const;
	virtual int scrArea() const;
	virtual double geoPerimeter() const;
	virtual int scrPerimeter() const;

	virtual string toStringFilled(char forground = '*', char background = ' ') const;
	virtual string toStringHollow(char forground = '*', char background = ' ') const;

	RightTriangle(int inHeight);
	virtual ~RightTriangle();
};

#endif /* RIGHTTRIANGLE_H_ */
