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

	static void setTrace(bool newValue);
	static bool trace;
	Shape();
	virtual ~Shape();
protected:
	int id;

	string name;
	int height;
	int width;
private:
	static int autoIncrement;

};

#endif /* SHAPE_H_ */
