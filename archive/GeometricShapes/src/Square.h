/*
 * Square.h
 *  Created on: Jun 20, 2010
 *      Author: gina
 */

#ifndef SQUARE_H_
#define SQUARE_H_

#include "Rectangle.h"

class Square: public Rectangle {
public:
	Square(int size);
	virtual ~Square();
};

#endif /* SQUARE_H_ */
