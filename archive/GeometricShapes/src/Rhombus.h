/*
 * Rhombus.h
 *
 *  Created on: Jun 22, 2010
 *      Author: gina
 */

#ifndef RHOMBUS_H_
#define RHOMBUS_H_

#include "Shape.h"

class Rhombus: public Shape {
public:
	virtual double geoArea() const;
	virtual int scrArea() const;
	virtual double geoPerimeter() const;
	virtual int scrPerimeter() const;

	virtual string toStringFilled(char forground = '*', char background = ' ') const;
	virtual string toStringHollow(char forground = '*', char background = ' ') const;

	Rhombus(int diagonalIn);
	virtual ~Rhombus();
};

#endif /* RHOMBUS_H_ */
