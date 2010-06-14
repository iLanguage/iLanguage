/*
 * Shape.h
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#ifndef SHAPE_H_
#define SHAPE_H_
#include <string>

using namespace std;

class Shape {
public:

	int getID() const;
	string getName() const;

	int getHeight() const;
	int getWidth() const;

	double geoArea() const;
	int scrArea() const;
	double geoPerimeter() const;
	int scrPerimeter() const;

	string toStringInfo() const;
	string toStringFilled(char forground = '*', char background = ' ') const;
	string toStringHollow(char forground = '*', char background = ' ') const;

	Shape(int x);
	virtual ~Shape();
private:
	int id;
	int autoIncrement;
	string name;
	int height;
	int width;

};

#endif /* SHAPE_H_ */
