/*
 * Shape.h
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#ifndef SHAPE_H_
#define SHAPE_H_

#include <string>

class Shape {
public:

	virtual int getID() const;
	virtual std::string getName() const;

	virtual int getHeight() const;
	virtual int getWidth() const;

	virtual double geoArea() const;
	virtual int scrArea() const;
	virtual double geoPerimeter() const;
	virtual int scrPerimeter() const;

	virtual std::string toStringInfo() const;
	virtual std::string toStringFilled(char forground = '*', char background = ' ') const;
	virtual std::string toStringHollow(char forground = '*', char background = ' ') const;

	Shape(int x);
	virtual ~Shape();
private:
	int id;
	int autoIncrement;
	std::string name;
	int height;
	int width;

};

#endif /* SHAPE_H_ */
