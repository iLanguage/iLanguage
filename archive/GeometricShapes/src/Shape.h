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


	int getID() const;
	std::string getName() const;

	int getHeight() const;
	int getWidth() const;

	double geoArea() const;
	int scrArea() const;
	double geoPerimeter() const;
	int scrPerimeter() const;

	std::string toStringInfo() const;
	std::string toStringFilled(char forground = '*', char background = ' ') const;
	std::string toStringHollow(char forground = '*', char background = ' ') const;

	Shape();
	virtual ~Shape();
private:
	int id;
	int autoIncrement;
	std::string name;
	int height;
	int width;

};

#endif /* SHAPE_H_ */
