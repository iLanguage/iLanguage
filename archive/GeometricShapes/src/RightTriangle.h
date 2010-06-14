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
	double geoArea() const;
	int scrArea() const;
	double geoPerimeter() const;
	int scrPerimeter() const;

	RightTriangle(int inHeight);
	virtual ~RightTriangle();
};

#endif /* RIGHTTRIANGLE_H_ */
